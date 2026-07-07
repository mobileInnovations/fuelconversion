import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import th from '@/locales/th.json'

// Get the saved language from localStorage or default to 'en'
const savedLocale = localStorage.getItem('LANG') || 'en'

// Save the default language to localStorage if it doesn't exist
if (!localStorage.getItem('LANG')) {
  localStorage.setItem('LANG', savedLocale)
}

const i18n = createI18n({
  legacy: false, // ✅ Use Composition API mode
  globalInjection: true, // Optional, allows using $t in templates
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    th
  }
})

export default i18n
