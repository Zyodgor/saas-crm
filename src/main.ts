import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import i18n from './i18n'

import './styles/main.scss'

import { useSidebarStore } from '@/stores/sidebar'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)

// Тестируем store
const sidebarStore = useSidebarStore()
console.log('🚀 App started, sidebarStore:', sidebarStore)
console.log('🚀 isCollapsed initial value:', sidebarStore.isCollapsed)

app.mount('#app')
