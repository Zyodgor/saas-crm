import { defineStore } from 'pinia'
import { ref } from 'vue'

type Language = 'ru' | 'uz'

export const useLanguageStore = defineStore('language', () => {
    const currentLanguage = ref<Language>('ru')

    const availableLanguages = [
        { code: 'ru', name: 'Русский', nativeName: 'Русский' },
        { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha' }
    ]

    const setLanguage = (lang: Language) => {
        currentLanguage.value = lang
        localStorage.setItem('preferred-language', lang)
    }

    const initializeLanguage = () => {
        const saved = localStorage.getItem('preferred-language') as Language
        if (saved && ['ru', 'uz'].includes(saved)) {
            currentLanguage.value = saved
        } else {
            // Автоопределение языка браузера
            const browserLang = navigator.language.split('-')[0]
            if (browserLang === 'uz') {
                currentLanguage.value = 'uz'
            } else {
                currentLanguage.value = 'ru'
            }
        }
    }

    const toggleLanguage = () => {
        currentLanguage.value = currentLanguage.value === 'ru' ? 'uz' : 'ru'
        localStorage.setItem('preferred-language', currentLanguage.value)
    }

    return {
        currentLanguage,
        availableLanguages,
        setLanguage,
        initializeLanguage,
        toggleLanguage
    }
})