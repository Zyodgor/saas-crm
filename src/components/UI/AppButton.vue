<!-- src/components/UI/AppButton.vue -->
<template>
  <button
    :class="['app-button', `app-button--${variant}`]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot>Кнопка</slot>
  </button>
</template>
  
  <script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary";
  disabled?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>
  
  <style lang="scss" scoped>
.app-button {
  padding: $spacing-sm $spacing-md;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  font-weight: 500;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background-color: var(--primary-color);
    color: white;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--primary-color) 90%, black);
      transform: translateY(-1px);
    }
  }

  &--secondary {
    background-color: var(--secondary-color);
    color: white;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--secondary-color) 90%, black);
      transform: translateY(-1px);
    }
  }
}
</style>