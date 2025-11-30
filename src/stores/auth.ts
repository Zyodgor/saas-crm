import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isLoading = ref(false)

    const signIn = async (_email?: string, _password?: string) => {
        // временная заглушка
        return Promise.resolve()
    }

    const signUp = async (_email?: string, _password?: string, _userData?: any) => {
        // временная заглушка  
        return Promise.resolve()
    }

    const signOut = async () => {
        // временная заглушка
        return Promise.resolve()
    }

    return {
        user,
        isLoading,
        signIn,
        signUp,
        signOut
    }
})