import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Theme {
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<Theme>({
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#f59e0b'
  })

  const isDarkMode = ref(false)

  const updateTheme = (newTheme: Partial<Theme>) => {
    currentTheme.value = { ...currentTheme.value, ...newTheme }
    applyThemeToCSS()
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    applyThemeToCSS()
  }

  const applyThemeToCSS = () => {
    const root = document.documentElement
    
    root.style.setProperty('--primary-color', currentTheme.value.primaryColor)
    root.style.setProperty('--secondary-color', currentTheme.value.secondaryColor)
    root.style.setProperty('--accent-color', currentTheme.value.accentColor)
    
    if (isDarkMode.value) {
      root.classList.add('dark-mode')
    } else {
      root.classList.remove('dark-mode')
    }
  }

  return {
    currentTheme,
    isDarkMode,
    updateTheme,
    toggleDarkMode,
    applyThemeToCSS
  }
})