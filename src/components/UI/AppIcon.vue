<template>
  <div class="app-icon-wrapper" :style="{ color }">
    <component :is="iconComponent" :size="iconSize" stroke-width="2" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import * as LucideIcons from "lucide-vue-next";

interface Props {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "currentColor",
});

const iconComponent = computed(() => {
  const iconName = props.name as keyof typeof LucideIcons;
  return LucideIcons[iconName] || LucideIcons.HelpCircle;
});

const iconSize = computed(() => {
  switch (props.size) {
    case "xs":
      return 16;
    case "sm":
      return 20;
    case "md":
      return 24;
    case "lg":
      return 32;
    case "xl":
      return 40;
    default:
      return 24;
  }
});
</script>

<style lang="scss" scoped>
.app-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
    stroke: currentColor;
    fill: none;
  }

  &.app-icon-wrapper--xs svg {
    width: 16px;
    height: 16px;
  }
  &.app-icon-wrapper--sm svg {
    width: 20px;
    height: 20px;
  }
  &.app-icon-wrapper--md svg {
    width: 24px;
    height: 24px;
  }
  &.app-icon-wrapper--lg svg {
    width: 32px;
    height: 32px;
  }
  &.app-icon-wrapper--xl svg {
    width: 40px;
    height: 40px;
  }
}
</style>