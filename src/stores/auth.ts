import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { supabase } from '@/supabase/client' // Закомментируйте пока
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isLoading = ref(false)

    const signIn = async (email: string, password: string) => {
        console.log('Sign in:', email) // Временно
    }

    const signUp = async (email: string, password: string, userData: any) => {
        console.log('Sign up:', email) // Временно
    }

    const signOut = async () => {
        // Временно
    }

    return {
        user,
        isLoading,
        signIn,
        signUp,
        signOut
    }
})