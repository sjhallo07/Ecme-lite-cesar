import dotenv from 'dotenv'

dotenv.config()

const DEFAULT_ALLOWLIST = [
    'localhost',
    '127.0.0.1',
    'api.openai.com',
    '*.openai.azure.com',
]

export const TIMEOUT_MS = Number(process.env.AGENT_TIMEOUT_MS || 60000)
export const MAX_REQ_BYTES = Number(process.env.AGENT_MAX_REQ_BODY || 262144)
export const MAX_NONSTREAM_RESP_BYTES = Number(process.env.AGENT_MAX_NONSTREAM_RESP || 2097152)
export const HEARTBEAT_MS = Number(process.env.AGENT_SSE_HEARTBEAT_MS || 15000)

export function resolveAllowlist() {
    const csv = process.env.AGENT_HOST_ALLOWLIST
    if (!csv) return DEFAULT_ALLOWLIST.slice()
    return csv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
}

export function hostnameMatchesAllowlist(hostname, allowlist) {
    const host = (hostname || '').toLowerCase()
    for (const entry of allowlist) {
        const rule = entry.toLowerCase()
        if (rule.startsWith('*.')) {
            const suffix = rule.slice(1) // remove leading '*'
            if (host.endsWith(suffix)) return true
        } else {
            if (host === rule) return true
        }
    }
    return false
}

export function redactHeadersForLog(headersObj) {
    const redacted = {}
    for (const [k, v] of Object.entries(headersObj || {})) {
        if (k.toLowerCase() === 'authorization') {
            redacted[k] = 'REDACTED'
        } else {
            redacted[k] = v
        }
    }
    return redacted
}