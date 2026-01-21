import appConfig from '@/configs/app.config'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import es from './lang/es.json'

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
}

i18n.use(initReactI18next).init({
    resources,
    // Spanish is the primary UI language; English is available as a secondary fallback.
    fallbackLng: ['es', 'en'],
    lng: appConfig.locale,
    interpolation: {
        escapeValue: false,
    },
})

export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    en: () => import('dayjs/locale/en'),
    es: () => import('dayjs/locale/es'),
}

export default i18n
