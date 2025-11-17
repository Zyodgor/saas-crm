<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"; // Добавляем ref
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme";
import { useLogoStore } from "@/stores/logo";
import AppIcon from "@/components/UI/AppIcon.vue";
import AppLogo from "@/components/UI/AppLogo.vue";

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const logoStore = useLogoStore();

onMounted(() => {
  logoStore.loadLogoFromStorage()
})

const logoKey = computed(() => {
  const logo = logoStore.currentLogo
  return `${logo.type}-${logo.iconName || ''}-${logo.customText || ''}-${logo.imageUrl || ''}`
})

watch(
  () => logoStore.currentLogo,
  (newLogo) => {
    console.log("🔄 Logo changed in sidebar:", newLogo);
  },
  { deep: true }
);

// Используем локальное состояние для sidebar
const isCollapsed = ref(false);

// Функция для переключения sidebar
const handleToggleSidebar = () => {
  console.log(
    "🔄 Toggling sidebar from:",
    isCollapsed.value,
    "to:",
    !isCollapsed.value
  );
  isCollapsed.value = !isCollapsed.value;
};

onMounted(() => {
  console.log("🔧 Sidebar mounted, isCollapsed:", isCollapsed.value);
});

// Обновляем меню с iOS-иконками
const menuItems = [
  { to: "/", icon: "Home", name: "home", translationKey: "sidebar.dashboard" },
  {
    to: "/students",
    icon: "Users",
    name: "users",
    translationKey: "sidebar.students",
  },
  {
    to: "/courses",
    icon: "BookOpen",
    name: "book-open",
    translationKey: "sidebar.courses",
  },
  {
    to: "/schedule",
    icon: "Calendar",
    name: "calendar",
    translationKey: "sidebar.schedule",
  },
  {
    to: "/finance",
    icon: "CreditCard",
    name: "credit-card",
    translationKey: "sidebar.finance",
  },
  {
    to: "/reports",
    icon: "BarChart3",
    name: "bar-chart-3",
    translationKey: "sidebar.reports",
  },
];

const currentLanguage = computed(() => locale.value);
const currentLanguageName = computed(() => {
  return currentLanguage.value === "ru" ? "Oʻzbekcha" : "Русский";
});

const toggleLanguage = () => {
  locale.value = locale.value === "ru" ? "uz" : "ru";
  localStorage.setItem("preferred-language", locale.value);
};
</script>

<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': isCollapsed }">
    <!-- Логотип и переключение -->
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <AppLogo
          :key="logoKey"
          :size="isCollapsed ? 'md' : 'md'"
          :collapsed="isCollapsed"
        />
      </div>
      <button
        @click="handleToggleSidebar"
        class="sidebar-toggle"
        :title="isCollapsed ? $t('sidebar.expand') : $t('sidebar.collapse')"
      >
        <AppIcon
          :name="isCollapsed ? 'ChevronRight' : 'ChevronLeft'"
          size="sm"
        />
      </button>
    </div>

    <!-- Навигация -->
    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        :title="$t(item.translationKey)"
        active-class="router-link-active"
      >
        <AppIcon :name="item.icon" size="md" class="nav-icon" />
        <span class="nav-text" v-if="!isCollapsed">{{
          $t(item.translationKey)
        }}</span>
      </router-link>
    </nav>

    <!-- Нижняя часть (настройки и переключение языка) -->
    <div class="sidebar-footer">
      <router-link
        to="/settings"
        class="nav-item"
        :title="$t('sidebar.settings')"
        active-class="router-link-active"
      >
        <AppIcon name="Settings" size="md" class="nav-icon" />
        <span class="nav-text" v-if="!isCollapsed">{{
          $t("sidebar.settings")
        }}</span>
      </router-link>

      <button
        @click="toggleLanguage"
        class="nav-item language-toggle"
        :title="currentLanguageName"
      >
        <AppIcon name="Languages" size="md" class="nav-icon" />
        <span class="nav-text" v-if="!isCollapsed">{{
          currentLanguage === "ru" ? "Oʻzbekcha" : "Русский"
        }}</span>
      </button>

      <button
        @click="themeStore.toggleDarkMode"
        class="nav-item theme-toggle"
        :title="
          themeStore.isDarkMode
            ? $t('sidebar.lightMode')
            : $t('sidebar.darkMode')
        "
      >
        <AppIcon
          :name="themeStore.isDarkMode ? 'Sun' : 'Moon'"
          size="md"
          class="nav-icon"
        />
        <span class="nav-text" v-if="!isCollapsed">
          {{
            themeStore.isDarkMode
              ? $t("sidebar.lightMode")
              : $t("sidebar.darkMode")
          }}
        </span>
      </button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.app-sidebar {
  width: 250px;
  height: 100vh;
  background: var(--surface-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow-x: hidden;

  &.app-sidebar--collapsed {
    width: 60px !important;

    .sidebar-brand h2 {
      display: none;
    }

    .nav-text {
      display: none;
    }

    .nav-icon {
      margin-right: 0;
    }
  }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  border-bottom: 1px solid var(--border-color);
  min-height: 60px;
  flex-shrink: 0;
  gap: $spacing-sm;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  min-height: 32px;
  flex: 1;
  min-width: 0;
  .brand-content {
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    h2 {
      color: var(--primary-color);
      margin: 0;
      font-size: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .brand-icon {
    color: var(--primary-color);
    flex-shrink: 0;
  }

  .brand-icon--collapsed {
    color: var(--primary-color);
    margin: 0 auto;
  }
}

.sidebar-toggle {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: $spacing-xs;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s ease;
  font-family: inherit;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
}

.sidebar-nav {
  flex: 1;
  padding: $spacing-md 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: $secondary-color;
    border-radius: 3px;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  padding: $spacing-sm $spacing-lg $spacing-sm $spacing-md;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  min-height: 44px;

  &:hover {
    background: var(--primary-color);
    color: white;

    .nav-icon {
      color: white;
    }
  }

  &.router-link-active {
    background: var(--primary-color);
    color: white;
    font-weight: 500;
    border-right: 3px solid var(--accent-color);

    .nav-icon {
      color: white;
    }
  }
}

.nav-icon {
  margin-right: $spacing-md;
  transition: all 0.3s ease;
  flex-shrink: 0;
  color: var(--text-color);
}

.nav-text {
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  font-size: 15px;
}

.sidebar-footer {
  border-top: 1px solid var(--border-color);
  padding: $spacing-md 0;
  flex-shrink: 0;

  .nav-item {
    border-right: none;
  }
}

.language-toggle,
.theme-toggle {
  width: 100%;
  text-align: left;
}
</style>