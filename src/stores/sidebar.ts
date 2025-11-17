// src/stores/sidebar.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
    // Инициализируем с значением false
    const isCollapsed = ref(false)

    console.log('🔄 Sidebar store initialized, isCollapsed:', isCollapsed.value)

    const toggleSidebar = () => {
        console.log('🔄 Toggling sidebar from:', isCollapsed.value, 'to:', !isCollapsed.value)
        isCollapsed.value = !isCollapsed.value
    }

    const setSidebarState = (collapsed: boolean) => {
        isCollapsed.value = collapsed
    }

    return {
        isCollapsed,
        toggleSidebar,
        setSidebarState
    }
})