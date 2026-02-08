import { useEffect, useMemo } from 'react'
import SettingsService from '@/services/SettingsService'
import {
    defaultAdminContacts,
    getDefaultAdminContactNumbers,
    toAdminContactNumber,
} from '@/constants/contact.constant'
import { useContactStore } from '@/store/contactStore'

const useAdminContacts = () => {
    const {
        contacts,
        loaded,
        loading,
        error,
        setContacts,
        setLoaded,
        setLoading,
        setError,
    } = useContactStore()

    useEffect(() => {
        if (loaded || loading) return

        const load = async () => {
            setLoading(true)
            try {
                const data = await SettingsService.getAdminContacts()
                if (data.length) {
                    setContacts(data)
                } else {
                    setContacts(defaultAdminContacts)
                }
                setError(null)
            } catch (err) {
                setContacts(defaultAdminContacts)
                setError((err as Error)?.message || 'Failed to load contacts')
            } finally {
                setLoaded(true)
                setLoading(false)
            }
        }

        void load()
    }, [loaded, loading, setContacts, setError, setLoaded, setLoading])

    const contactNumbers = useMemo(() => {
        if (!contacts.length) return getDefaultAdminContactNumbers()
        return contacts.map(toAdminContactNumber)
    }, [contacts])

    return {
        contacts,
        contactNumbers,
        loading,
        error,
    }
}

export default useAdminContacts
