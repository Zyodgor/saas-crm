import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { supabase } from '@/supabase/client' // Пока закомментируйте
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isLoading = ref(false)

    const signIn = async (email: string, password: string) => {
        console.log('Sign in attempt:', email)
        // Временно заглушка
    }

    const signUp = async (email: string, password: string, userData: any) => {
        console.log('Sign up attempt:', email)
        // Временно заглушка
    }

    const signOut = async () => {
        console.log('Sign out')
        // Временно заглушка
    }

    return {
        user,
        isLoading,
        signIn,
        signUp,
        signOut
    }
})