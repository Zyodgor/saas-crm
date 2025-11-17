import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import StudentsPage from '@/views/StudentsPage.vue'
import SettingsPage from '@/views/SettingsPage.vue'
import CoursesPage from '@/views/CoursesPage.vue'
import SchedulePage from '@/views/SchedulePage.vue'
import FinancePage from '@/views/FinancePage.vue'
import ReportsPage from '@/views/ReportsPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            title: 'Главная - CRM'
        }
    },
    {
        path: '/students',
        name: 'Students',
        component: StudentsPage,
        meta: {
            title: 'Студенты - CRM'
        }
    },
    {
        path: '/courses',
        name: 'Courses',
        component: CoursesPage,
        meta: {
            title: 'Курсы - CRM'
        }
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: SchedulePage,
        meta: {
            title: 'Расписание - CRM'
        }
    },
    {
        path: '/finance',
        name: 'Finance',
        component: FinancePage,
        meta: {
            title: 'Финансы - CRM'
        }
    },
    {
        path: '/reports',
        name: 'Reports',
        component: ReportsPage,
        meta: {
            title: 'Отчёты - CRM'
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsPage,
        meta: {
            title: 'Настройки - CRM'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
        meta: {
            title: 'Страница не найдена'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Глобальный хук для изменения title страницы
router.beforeEach((to) => {
    const title = to.meta.title as string || 'CRM System'
    document.title = title
})

export default router