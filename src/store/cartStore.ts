import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Service } from '@/@types/services'

interface CartState {
    items: CartItem[]
    addItem: (service: Service, quantity?: number, notes?: string) => void
    removeItem: (serviceId: string) => void
    updateQuantity: (serviceId: string, quantity: number) => void
    updateNotes: (serviceId: string, notes: string) => void
    clearCart: () => void
    getTotalPrice: () => number
    getItemCount: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (service: Service, quantity = 1, notes?: string) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.service.id === service.id
                    )

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.service.id === service.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        }
                    }

                    return {
                        items: [...state.items, { service, quantity, notes }],
                    }
                })
            },

            removeItem: (serviceId: string) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.service.id !== serviceId
                    ),
                }))
            },

            updateQuantity: (serviceId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(serviceId)
                    return
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.service.id === serviceId
                            ? { ...item, quantity }
                            : item
                    ),
                }))
            },

            updateNotes: (serviceId: string, notes: string) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.service.id === serviceId
                            ? { ...item, notes }
                            : item
                    ),
                }))
            },

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.service.basePrice * item.quantity,
                    0
                )
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            },
        }),
        { name: 'cart-storage' }
    )
)
