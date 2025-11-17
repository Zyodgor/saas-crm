// src/stores/logo.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface LogoConfig {
    type: 'icon' | 'image' | 'text'
    iconName?: string
    imageUrl?: string
    imageData?: string // Добавляем base64 данные
    text?: string
    customText?: string
}

export const useLogoStore = defineStore('logo', () => {
    const currentLogo = ref<LogoConfig>({
        type: 'icon',
        iconName: 'GraduationCap',
        text: 'EduCRM'
    })

    watch(currentLogo, (newLogo) => {
        localStorage.setItem('tenant-logo', JSON.stringify(newLogo))
    }, { deep: true })

    const loadLogoFromStorage = () => {
        const saved = localStorage.getItem('tenant-logo')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // При загрузке очищаем старый дефолтный текст
                if (parsed.text === 'EduCRM') {
                    parsed.text = ''
                }
                currentLogo.value = parsed
            } catch (e) {
                console.error('Error loading logo from storage:', e)
            }
        }
    }

    const updateLogo = (newConfig: Partial<LogoConfig>) => {
        currentLogo.value = { ...currentLogo.value, ...newConfig }
    }

    const resetLogo = () => {
        currentLogo.value = {
            type: 'icon',
            iconName: 'GraduationCap',
            text: '',
            customText: undefined,
            imageUrl: undefined,
            imageData: undefined
        }
    }

    return {
        currentLogo,
        loadLogoFromStorage,
        updateLogo,
        resetLogo
    }
})