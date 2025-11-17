<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme";
import AppLayout from "@/components/layout/AppLayout.vue";

const { locale } = useI18n();
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyThemeToCSS();

  // Инициализируем язык
  const savedLang = localStorage.getItem("preferred-language");
  if (savedLang && ["ru", "uz"].includes(savedLang)) {
    locale.value = savedLang;
  }
});
</script>

<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

/* Глобальные стили для корректной работы sidebar */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Предотвращаем горизонтальный скролл */
}

.page-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: $spacing-xl;
  font-weight: 700;
}

.content-card {
  background: var(--surface-color);
  border-radius: var(--border-radius);
  padding: $spacing-xl;
  border: 1px solid var(--border-color);
  margin-bottom: $spacing-lg;
}
</style>