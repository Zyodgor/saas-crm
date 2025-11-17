<template>
  <div class="courses-page">
    <h1>📚 Курсы</h1>
    <p>Страница курсов в разработке...</p>

    <div class="course-list">
      <div class="course-card" v-for="course in courses" :key="course.id">
        <h3>{{ course.name }}</h3>
        <p>{{ course.description }}</p>
        <span class="course-duration">{{ course.duration }}</span>
      </div>
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
import AppButton from "@/components/UI/AppButton.vue";

const courses = ref([
  {
    id: 1,
    name: "Математика",
    description: "Основы математики",
    duration: "6 месяцев",
  },
  {
    id: 2,
    name: "Английский язык",
    description: "Разговорный английский",
    duration: "8 месяцев",
  },
  {
    id: 3,
    name: "Программирование",
    description: "Основы веб-разработки",
    duration: "12 месяцев",
  },
]);
</script>
  
  <style lang="scss" scoped>
.courses-page {
  padding: $spacing-lg;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-md;
  margin: $spacing-xl 0;
}

.course-card {
  background: var(--surface-color);
  padding: $spacing-lg;
  border-radius: var(--border-radius);
  border-left: 4px solid var(--accent-color);

  h3 {
    color: var(--primary-color);
    margin-bottom: $spacing-sm;
  }

  p {
    color: var(--text-color);
    margin-bottom: $spacing-md;
  }
}

.course-duration {
  background: var(--accent-color);
  color: white;
  padding: $spacing-xs $spacing-sm;
  border-radius: 20px;
  font-size: 0.8em;
}
</style>