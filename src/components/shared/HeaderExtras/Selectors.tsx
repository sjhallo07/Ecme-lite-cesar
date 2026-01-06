import { useLocaleStore } from '@/store/localeStore'
import { useCurrencyStore } from '@/store/currencyStore'
import Dropdown from '@/components/ui/Dropdown'
import { PiGlobeDuotone, PiCurrencyDollarDuotone } from 'react-icons/pi'

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
]

const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
]

export const LanguageSelector = () => {
    const { currentLang, setLang } = useLocaleStore()
    const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0]

    return (
        <Dropdown
            renderTitle={
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <PiGlobeDuotone className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                    </span>
                </button>
            }
        >
            {languages.map((lang) => (
                <Dropdown.Item
                    key={lang.code}
                    eventKey={lang.code}
                    active={currentLang === lang.code}
                    onSelect={() => setLang(lang.code)}
                >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export const CurrencySelector = () => {
    const { currentCurrency, setCurrency } = useCurrencyStore()
    const currentCurrencyData = currencies.find((c) => c.code === currentCurrency) || currencies[0]

    return (
        <Dropdown
            renderTitle={
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <PiCurrencyDollarDuotone className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentCurrencyData.code}
                    </span>
                </button>
            }
        >
            {currencies.map((currency) => (
                <Dropdown.Item
                    key={currency.code}
                    eventKey={currency.code}
                    active={currentCurrency === currency.code}
                    onSelect={() => setCurrency(currency.code as 'USD' | 'EUR')}
                >
                    <span className="mr-2">{currency.symbol}</span>
                    {currency.name}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}
