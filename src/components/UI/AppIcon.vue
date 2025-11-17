<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="color"
    :class="['app-icon', `app-icon--${size}`, `app-icon--${variant}`]"
  />
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

const iconComponent = computed(() => {
  const iconName = `${props.name}`;
  return (
    LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.HelpCircle
  );
});
</script>
  
  <style lang="scss" scoped>
.app-icon {
  display: inline-block;
  vertical-align: middle;

  &--xs {
    width: 16px;
    height: 16px;
  }

  &--sm {
    width: 20px;
    height: 20px;
  }

  &--md {
    width: 24px;
    height: 24px;
  }

  &--lg {
    width: 32px;
    height: 32px;
  }

  &--xl {
    width: 40px;
    height: 40px;
  }
}
</style>