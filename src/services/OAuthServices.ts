import type { SignInResponse } from '@/@types/auth'
import endpointConfig from '@/configs/endpoint.config'
import ApiService from './ApiService'

export async function apiGoogleOauthSignIn() {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.oauthGoogle,
        method: 'post',
    })
}

export async function apiGithubOauthSignIn() {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.oauthGithub,
        method: 'post',
    })
}
