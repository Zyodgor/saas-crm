<template>
  <div class="app-layout">
    <AppSidebar />

    <main
      class="main-content"
      :class="{ 'main-content--collapsed': isSidebarCollapsed }"
    >
      <div class="content-wrapper">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSidebar } from '@/composables/useSidebar'
import AppSidebar from './AppSidebar.vue'

const { isCollapsed } = useSidebar()

const isSidebarCollapsed = computed(() => isCollapsed.value)
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
  margin-left: 250px; /* Ширина развернутого sidebar */

  &.main-content--collapsed {
    margin-left: 60px; /* Ширина свернутого sidebar */
  }
}

.content-wrapper {
  padding: $spacing-xl;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0 !important;
  }

  .content-wrapper {
    padding: $spacing-lg;
  }
}
</style>