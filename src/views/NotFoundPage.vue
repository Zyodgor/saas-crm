<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <AppButton @click="$router.push('/')" variant="primary">
        Вернуться на главную
      </AppButton>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import AppButton from "@/components/UI/AppButton.vue";
</script>
  
  <style lang="scss" scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.not-found-content {
  h1 {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: $spacing-md;
  }

  p {
    font-size: 1.2rem;
    color: var(--text-color);
    margin-bottom: $spacing-xl;
  }
}
</style>