export type SSECallbacks = {
    onMessage?: (data: string) => void
    onEvent?: (event: string, data: string) => void
    onHeartbeat?: () => void
    onError?: (err: unknown) => void
    onDone?: () => void
}

export function openSSE(url: string, init: RequestInit & { signal?: AbortSignal } = {}, cbs: SSECallbacks = {})
{
    const controller = new AbortController()
    const signal = init.signal || controller.signal
    const headers = new Headers(init.headers || {})
    headers.set('Accept', 'text/event-stream')
    const reqInit: RequestInit = { ...init, headers, signal, method: init.method || 'POST' }

    let cancelled = false

        ; (async () =>
        {
            try {
                const res = await fetch(url, reqInit)
                if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)
                const reader = res.body.getReader()
                const decoder = new TextDecoder('utf-8')
                let buffer = ''
                while (true) {
                    const { value, done } = await reader.read()
                    if (done) break
                    buffer += decoder.decode(value, { stream: true })
                    let idx
                    while ((idx = buffer.indexOf('\n\n')) >= 0) {
                        const frame = buffer.slice(0, idx)
                        buffer = buffer.slice(idx + 2)
                        if (frame.startsWith(':')) {
                            cbs.onHeartbeat?.()
                            continue
                        }
                        let eventName: string | undefined
                        let data = ''
                        for (const line of frame.split('\n')) {
                            if (line.startsWith('event:')) eventName = line.slice(6).trim()
                            if (line.startsWith('data:')) data += (data ? '\n' : '') + line.slice(5).trim()
                        }
                        if (eventName === 'done') {
                            cbs.onDone?.()
                        } else if (eventName) {
                            cbs.onEvent?.(eventName, data)
                            cbs.onMessage?.(data)
                        } else {
                            cbs.onMessage?.(data)
                        }
                    }
                }
            } catch (e) {
                if (!cancelled) cbs.onError?.(e)
            }
        })()

    return {
        cancel()
        {
            cancelled = true
            controller.abort()
        },
    }
}