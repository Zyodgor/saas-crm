import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (message: string | null) => {
    error.value = message
  }

  const clearError = () => {
    error.value = null
  }

  return {
    isLoading,
    error,
    setLoading,
    setError,
    clearError
  }
})