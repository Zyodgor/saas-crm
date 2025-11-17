import { createI18n } from 'vue-i18n'

// Импортируем JSON файлы
import ru from '@/locales/ru.json'
import uz from '@/locales/uz.json'

// Создаем сообщения
const messages = {
  ru,
  uz
}

// Создаем экземпляр i18n
const i18n = createI18n({
  legacy: false,
  locale: 'ru', // Язык по умолчанию
  fallbackLocale: 'ru', // Резервный язык
  globalInjection: true,
  messages
})

export default i18n