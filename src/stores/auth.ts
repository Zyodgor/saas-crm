import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase/client'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isLoading = ref(false)

    const signIn = async (email: string, password: string) => {
        // Реализация входа
    }

    const signUp = async (email: string, password: string, userData: any) => {
        // Реализация регистрации
    }

    const signOut = async () => {
        // Реализация выхода
    }

    return {
        user,
        isLoading,
        signIn,
        signUp,
        signOut
    }
})