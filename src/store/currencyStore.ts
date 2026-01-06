import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_CURRENCY } from '@/constants/app.constant'

type Currency = 'USD' | 'EUR'

interface CurrencyState {
    currentCurrency: Currency
    setCurrency: (currency: Currency) => void
    formatPrice: (amount: number) => string
    convertPrice: (amount: number) => number
}

const exchangeRates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
}

const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currentCurrency: DEFAULT_CURRENCY as Currency,

            setCurrency: (currency: Currency) => {
                set({ currentCurrency: currency })
            },

            convertPrice: (amount: number) => {
                const rate = exchangeRates[get().currentCurrency]
                return amount * rate
            },

            formatPrice: (amount: number) => {
                const currency = get().currentCurrency
                const convertedAmount = get().convertPrice(amount)
                const symbol = currencySymbols[currency]
                return `${symbol}${convertedAmount.toFixed(2)}`
            },
        }),
        { name: 'currency-storage' }
    )
)
