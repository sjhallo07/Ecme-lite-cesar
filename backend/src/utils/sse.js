export function initSSE(res) {
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
}

export function writeEvent(res, { event, data }) {
    // event name is optional; default unnamed event is fine
    if (event) res.write(`event: ${event}\n`)
    const payload = typeof data === 'string' ? data : JSON.stringify(data)
    // Split by newlines to follow SSE spec for multi-line data
    for (const line of payload.split(/\r?\n/)) {
        res.write(`data: ${line}\n`)
    }
    res.write('\n')
}

export function startHeartbeat(res, intervalMs) {
    const iv = setInterval(() => {
        res.write(`:keep-alive\n\n`)
    }, Math.max(1000, intervalMs || 15000))
    return () => clearInterval(iv)
}