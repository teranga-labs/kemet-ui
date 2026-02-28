import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationEN from '../locales/en/translation.json'
import translationFR from '../locales/fr/translation.json'
import translationWO from '../locales/wo/translation.json'

export const resources = {
	en: {
		translation: translationEN
	},
	fr: {
		translation: translationFR
	},
	wo: {
		translation: translationWO
	}
} as const

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false
		},
		detection: {
			order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage', 'cookie']
		}
	})
	.then()

export default i18n
