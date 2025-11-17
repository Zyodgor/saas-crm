<template>
  <div
    class="app-logo"
    :class="[`app-logo--${size}`, { 'app-logo--collapsed': collapsed }]"
  >
    <!-- Режим иконки -->
    <div v-if="logo.type === 'icon'" class="logo-icon">
      <AppIcon :name="logo.iconName || 'GraduationCap'" :size="iconSize" />
    </div>

    <!-- Режим картинки -->
    <div
      v-else-if="logo.type === 'image' && (logo.imageData || logo.imageUrl)"
      class="logo-image"
    >
      <img
        :src="logo.imageData || logo.imageUrl"
        :alt="logo.text || 'Logo'"
        @error="handleImageError"
      />
    </div>

    <!-- Режим текста -->
    <div v-else-if="logo.type === 'text'" class="logo-text">
      {{ displayText }}
    </div>

    <!-- Текст логотипа (только в развернутом режиме и если есть текст) -->
    <div
      v-if="!collapsed && showText && shouldShowText"
      class="logo-text-content"
      :title="displayText"
    >
      {{ displayText }}
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { computed, toRef } from "vue";
import { useLogoStore } from "@/stores/logo";
import AppIcon from "./AppIcon.vue";

interface Props {
  size?: "sm" | "md" | "lg";
  collapsed?: boolean;
  showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  collapsed: false,
  showText: true,
});

const logoStore = useLogoStore();
const logo = toRef(logoStore, "currentLogo");

const displayText = computed(() => {
  const text = logo.value.customText || logo.value.text;
  // Если текст пустой или дефолтный - возвращаем пустую строку
  return text && text.trim() !== "" && text !== "EduCRM" ? text : "";
});

// Определяем когда показывать текст
const shouldShowText = computed(() => {
  // Для текстового режима текст показывается в основном блоке
  if (logo.value.type === "text") return false;

  // Для иконок и картинок показываем текст только если он явно задан
  const text = logo.value.customText || logo.value.text;
  return text && text.trim() !== "" && text !== "EduCRM";
});

const iconSize = computed(() => {
  switch (props.size) {
    case "sm":
      return "md";
    case "md":
      return "lg";
    case "lg":
      return "xl";
    default:
      return "lg";
  }
});

const handleImageError = (event: Event) => {
  console.error("Failed to load logo image");
  logoStore.updateLogo({
    type: "icon",
    iconName: "GraduationCap",
    imageUrl: undefined,
    imageData: undefined,
  });
};
</script>
  
<style lang="scss" scoped>
.app-logo {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  min-height: 32px;
  width: 100%;
  &.app-logo--collapsed {
    justify-content: center;
    width: 100%;

    .logo-text-content {
      display: none;
    }
  }
}

.logo-icon {
  display: flex;
  align-items: center;
  color: var(--primary-color);
  flex-shrink: 0;

  .app-logo--sm & {
    font-size: 1.25rem;
  }

  .app-logo--md & {
    font-size: 1.5rem;
  }

  .app-logo--lg & {
    font-size: 2rem;
  }
}

.logo-image {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  img {
    display: block;
    object-fit: contain;

    .app-logo--sm & {
      width: 24px;
      height: 24px;
    }

    .app-logo--md & {
      width: 32px;
      height: 32px;
    }

    .app-logo--lg & {
      width: 40px;
      height: 40px;
    }
  }
}

.logo-text {
  font-weight: 700;
  color: var(--primary-color);
  flex-shrink: 0;
  max-width: 150px; /* Ограничиваем ширину текстового лого */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .app-logo--sm & {
    font-size: 1rem;
  }

  .app-logo--md & {
    font-size: 1.25rem;
  }

  .app-logo--lg & {
    font-size: 1.5rem;
  }
}

.logo-text-content {
  font-weight: 600;
  color: var(--primary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  flex-shrink: 1;
  .app-logo--sm & {
    font-size: 0.9rem;
  }

  .app-logo--md & {
    font-size: 1.1rem;
  }

  .app-logo--lg & {
    font-size: 1.3rem;
  }
}
</style>