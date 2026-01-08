import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import http from 'node:http'
import supertest from 'supertest'
import app from '../src/index.js'

const request = supertest(app)
let stubServer
const STUB_PORT = 4009

describe('POST /api/agent (policy)', () => {
    it('rejects disallowed host with 403', async () => {
        const res = await request
            .post('/api/agent')
            .set('Content-Type', 'application/json')
            .send({ request: { url: 'http://example.com', method: 'GET' } })
        assert.strictEqual(res.status, 403)
    })

    it('rejects oversized payload with 413', async () => {
        const big = 'x'.repeat(300000)
        const res = await request
            .post('/api/agent')
            .set('Content-Type', 'application/json')
            .send({ request: { url: 'http://localhost', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: big } })
        assert.strictEqual(res.status, 413)
    })

    it('rejects wrong method with 405', async () => {
        const res = await request
            .post('/api/agent')
            .set('Content-Type', 'application/json')
            .send({ request: { url: 'http://localhost', method: 'PUT' } })
        assert.strictEqual(res.status, 405)
    })
})

describe('POST /api/agent (SSE contract)', () => {
    before((_, done) => {
        stubServer = http.createServer((req, res) => {
            if (req.url === '/echo') {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end('ok')
            } else {
                res.writeHead(404)
                res.end()
            }
        })
        stubServer.listen(STUB_PORT, done)
    })

    after((_, done) => {
        if (stubServer) stubServer.close(done)
    })

    it('returns text/event-stream headers when streaming requested', async () => {
        const res = await request
            .post('/api/agent')
            .set('Content-Type', 'application/json')
            .set('Accept', 'text/event-stream')
            .send({ mode: 'stream', request: { url: `http://localhost:${STUB_PORT}/echo`, method: 'GET' } })
        assert.strictEqual(res.status, 200)
        assert.ok((res.headers['content-type'] || '').includes('text/event-stream'))
    })
})