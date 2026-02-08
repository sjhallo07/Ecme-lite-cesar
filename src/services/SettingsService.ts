import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import type { AdminContactEntry } from '@/constants/contact.constant'

type ApiResponse<T> = {
    success: boolean
    data: T
    message?: string
    error?: string
}

const getUserRole = () => {
    const auth = localStorage.getItem('auth')
    if (auth) {
        try {
            const authData = JSON.parse(auth)
            return authData.role || 'client'
        } catch {
            return 'client'
        }
    }
    return 'client'
}

const SettingsService = {
    async getAdminContacts() {
        const response = await ApiService.fetchDataWithAxios<ApiResponse<AdminContactEntry[]>>({
            url: endpointConfig.settingsContact,
            method: 'get',
        })
        if (!response?.success) {
            throw new Error(response?.error || 'Failed to load admin contacts')
        }
        return response.data || []
    },
    async updateAdminContacts(contacts: AdminContactEntry[]) {
        const response = await ApiService.fetchDataWithAxios<ApiResponse<AdminContactEntry[]>>({
            url: endpointConfig.settingsContact,
            method: 'put',
            params: {
                role: getUserRole(),
            },
            data: { contacts },
        })
        if (!response?.success) {
            throw new Error(response?.error || 'Failed to update admin contacts')
        }
        return response.data || []
    },
}

export default SettingsService
