import { resolveAllowlist, hostnameMatchesAllowlist } from './agentPolicy.js'

const HOP_BY_HOP = new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
])

export function filterRequestHeaders(input, allowedNames) {
    const out = {}
    for (const [k, v] of Object.entries(input || {})) {
        const key = k.toLowerCase()
        if (allowedNames.includes(key)) out[key] = v
    }
    return out
}

export function stripHopByHop(headers) {
    const out = {}
    for (const [k, v] of Object.entries(headers || {})) {
        if (!HOP_BY_HOP.has(k.toLowerCase())) out[k.toLowerCase()] = v
    }
    return out
}

export function parseAndCheckUrl(urlStr) {
    let url
    try {
        url = new URL(urlStr)
    } catch {
        throw new Error('invalid_url')
    }
    const allowlist = resolveAllowlist()
    if (!hostnameMatchesAllowlist(url.hostname, allowlist)) {
        const err = new Error('forbidden_host')
        err.code = 'forbidden_host'
        throw err
    }
    return url
}

export async function safeFetch({
    url,
    method = 'GET',
    headers = {},
    body,
    timeoutMs = 60000,
    responseLimitBytes = 2 * 1024 * 1024,
    stream = false,
}) {
    const controller = new AbortController()
    const to = setTimeout(() => controller.abort(new Error('upstream_timeout')), Math.max(1000, timeoutMs))
    try {
        const res = await fetch(url, {
            method,
            headers,
            body,
            signal: controller.signal,
        })

        const resHeaders = {}
        res.headers.forEach((v, k) => {
            resHeaders[k.toLowerCase()] = v
        })

        if (!stream) {
            const reader = res.body?.getReader()
            let received = 0
            const chunks = []
            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    received += value.byteLength
                    if (received > responseLimitBytes) {
                        const e = new Error('response_too_large')
                        e.code = 'response_too_large'
                        controller.abort(e)
                        throw e
                    }
                    chunks.push(value)
                }
            }
            const buf = chunks.length ? Buffer.concat(chunks.map((u) => Buffer.from(u))) : Buffer.from('')
            const ctype = (resHeaders['content-type'] || '').toLowerCase()
            let data
            if (ctype.includes('application/json')) {
                try {
                    data = JSON.parse(buf.toString('utf-8'))
                } catch {
                    data = buf.toString('utf-8')
                }
            } else {
                data = buf.toString('utf-8')
            }
            return { status: res.status, headers: stripHopByHop(resHeaders), data }
        }

        // streaming mode: return a reader async iterator
        const reader = res.body?.getReader()
        return {
            status: res.status,
            headers: stripHopByHop(resHeaders),
            async *chunks() {
                if (!reader) return
                let received = 0
                const decoder = new TextDecoder('utf-8', { fatal: false })
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    received += value.byteLength
                    if (received > responseLimitBytes) {
                        const e = new Error('response_too_large')
                        e.code = 'response_too_large'
                        controller.abort(e)
                        throw e
                    }
                    yield decoder.decode(value, { stream: true })
                }
            },
            cancel() {
                controller.abort(new Error('client_aborted'))
            },
        }
    } finally {
        clearTimeout(to)
    }
}