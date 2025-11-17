<template>
  <div class="settings-page">
    <h1>⚙️ Настройки</h1>
    <div class="settings-grid">
      <div class="setting-section">
        <h3>🎨 Брендинг</h3>
        <div class="setting-item">
          <label>Логотип:</label>
          <AppButton @click="openLogoModal" variant="secondary">
            <AppIcon name="Palette" size="sm" />
            Настроить логотип
          </AppButton>
        </div>

        <div class="current-logo-preview">
          <p>Текущий логотип:</p>
          <div class="preview">
            <AppLogo size="lg" :collapsed="false" />
          </div>
        </div>
      </div>

      <div class="setting-section">
        <h3>Внешний вид</h3>

        <div class="setting-item">
          <label>Основной цвет:</label>
          <input
            type="color"
            :value="themeStore.currentTheme.primaryColor"
            @input="themeStore.updateTheme({ primaryColor: ($event.target as HTMLInputElement).value })"
          />
        </div>

        <div class="setting-item">
          <label>Акцентный цвет:</label>
          <input
            type="color"
            :value="themeStore.currentTheme.accentColor"
            @input="themeStore.updateTheme({ accentColor: ($event.target as HTMLInputElement).value })"
          />
        </div>

        <div class="setting-item">
          <label>Тёмная тема:</label>
          <button @click="themeStore.toggleDarkMode" class="toggle-btn">
            {{ themeStore.isDarkMode ? "Выключить" : "Включить" }}
          </button>
        </div>
      </div>

      <div class="setting-section">
        <h3>Навигация</h3>
        <p>Выберите страницу для перехода:</p>
        <div class="nav-buttons">
          <AppButton @click="$router.push('/')" variant="secondary"
            >Главная</AppButton
          >
          <AppButton @click="$router.push('/students')" variant="secondary"
            >Студенты</AppButton
          >
          <AppButton @click="$router.push('/courses')" variant="secondary"
            >Курсы</AppButton
          >
        </div>
      </div>
      <LogoModal :is-open="isLogoModalOpen" @close="closeLogoModal" />
    </div>

    <AppButton
      @click="$router.back()"
      variant="secondary"
      style="margin-top: 20px"
    >
      ← Назад
    </AppButton>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "@/stores/theme";
import AppButton from "@/components/UI/AppButton.vue";
import AppIcon from "@/components/UI/AppIcon.vue";
import AppLogo from "@/components/UI/AppLogo.vue";
import LogoModal from "@/components/modals/LogoModal.vue";

const themeStore = useThemeStore();
const isLogoModalOpen = ref(false);

const openLogoModal = () => {
  isLogoModalOpen.value = true;
};

const closeLogoModal = () => {
  isLogoModalOpen.value = false;
};
</script>
  
  <style lang="scss" scoped>
.settings-page {
  padding: $spacing-lg;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-xl;
  margin: $spacing-xl 0;
}

.setting-section {
  background: var(--surface-color);
  padding: $spacing-lg;
  border-radius: var(--border-radius);

  h3 {
    color: var(--primary-color);
    margin-bottom: $spacing-lg;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: $spacing-sm;
  }
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;

  label {
    font-weight: 500;
    color: var(--text-color);
  }
}

.current-logo-preview {
  margin-top: $spacing-lg;
  padding-top: $spacing-lg;
  border-top: 1px solid var(--border-color);

  p {
    margin-bottom: $spacing-md;
    color: var(--text-muted);
  }

  .preview {
    display: flex;
    justify-content: center;
    padding: $spacing-lg;
    background: var(--background-color);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
  }
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>