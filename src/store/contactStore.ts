import { create } from 'zustand'
import type { AdminContactEntry } from '@/constants/contact.constant'

type ContactState = {
    contacts: AdminContactEntry[]
    loaded: boolean
    loading: boolean
    error: string | null
}

type ContactActions = {
    setContacts: (contacts: AdminContactEntry[]) => void
    setLoaded: (loaded: boolean) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
}

export const useContactStore = create<ContactState & ContactActions>((set) => ({
    contacts: [],
    loaded: false,
    loading: false,
    error: null,
    setContacts: (contacts) => set(() => ({ contacts })),
    setLoaded: (loaded) => set(() => ({ loaded })),
    setLoading: (loading) => set(() => ({ loading })),
    setError: (error) => set(() => ({ error })),
}))
