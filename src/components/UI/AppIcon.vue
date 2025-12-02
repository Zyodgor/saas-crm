<template>
  <div class="app-icon-wrapper" :style="{ color }">
    <component
      :is="getIconComponent"
      :size="iconSize"
      :class="['app-icon', `app-icon--${size}`, `app-icon--${variant}`]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import * as LucideIcons from "lucide-vue-next";

interface Props {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
  variant?: "default" | "outline" | "filled";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "currentColor",
  variant: "default",
});

const getIconComponent = computed(() => {
  const iconName = props.name as keyof typeof LucideIcons;
  return LucideIcons[iconName] || LucideIcons.HelpCircle;
});

const iconSize = computed(() => {
  switch (props.size) {
    case "xs": return 16;
    case "sm": return 20;
    case "md": return 24;
    case "lg": return 32;
    case "xl": return 40;
    default: return 24;
  }
});
</script>

<style lang="scss" scoped>
.app-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.app-icon {
  display: block;

  &--xs { width: 16px; height: 16px; }
  &--sm { width: 20px; height: 20px; }
  &--md { width: 24px; height: 24px; }
  &--lg { width: 32px; height: 32px; }
  &--xl { width: 40px; height: 40px; }
}
</style>