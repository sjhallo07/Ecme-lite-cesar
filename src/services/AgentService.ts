import AxiosBase from '@/services/axios/AxiosBase'
import appConfig from '@/configs/app.config'
import { openSSE, type SSECallbacks } from './stream'

type AgentRequest = {
    url: string
    method: 'GET' | 'POST'
    headers?: Record<string, string>
    body?: unknown
}

export async function postAgent(request: AgentRequest)
{
    const payload = { mode: 'json', request }
    const res = await AxiosBase.post('/agent', payload, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
    return res.data
}

export function streamAgent(request: AgentRequest, cbs: SSECallbacks)
{
    const payload = JSON.stringify({ mode: 'stream', request })
    const url = `${appConfig.apiPrefix}/agent`
    return openSSE(url, { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' } }, cbs)
}

export default { postAgent, streamAgent }