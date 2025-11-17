<template>
  <div class="modal-overlay" @click.self="handleOverlayClick">
    <div class="modal-container">
      <slot />
    </div>
  </div>
</template>
  
  <script setup lang="ts">
interface Emits {
  (e: "close"): void;
}

const emit = defineEmits<Emits>();

const handleOverlayClick = () => {
  emit("close");
};
</script>
  
  <style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.modal-container {
  background: var(--background-color);
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideIn 0.2s ease;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

// Адаптивность
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    max-width: 95vw;
    max-height: 95vh;
  }
}
</style>