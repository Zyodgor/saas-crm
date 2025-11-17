<!-- src/views/StudentsPage.vue -->
<template>
  <div class="students-page">
    <div class="page-header">
      <h1>👨‍🎓 Управление студентами</h1>
      <AppButton variant="primary" @click="showAddForm = true">
        + Добавить студента
      </AppButton>
    </div>

    <div class="students-list">
      <div v-for="student in students" :key="student.id" class="student-card">
        <h3>{{ student.name }}</h3>
        <p>Email: {{ student.email }}</p>
        <p>{{ $t("students.kurs") }}: {{ student.course }}</p>
      </div>
    </div>

    <!-- Простая форма добавления -->
    <div v-if="showAddForm" class="add-form">
      <h3>Добавить студента</h3>
      <input v-model="newStudent.name" placeholder="Имя" class="form-input" />
      <input
        v-model="newStudent.email"
        placeholder="Email"
        class="form-input"
      />
      <input
        v-model="newStudent.course"
        placeholder="Курс"
        class="form-input"
      />

      <div style="display: flex; gap: 10px; margin-top: 15px">
        <AppButton @click="addStudent" variant="primary">Добавить</AppButton>
        <AppButton @click="showAddForm = false" variant="secondary"
          >Отмена</AppButton
        >
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

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

const students = ref<Student[]>([
  {
    id: 1,
    name: "Алишер Умаров",
    email: "alisher@example.com",
    course: "Математика",
  },
  {
    id: 2,
    name: "Зухра Алимова",
    email: "zuhra@example.com",
    course: "Английский язык",
  },
  {
    id: 3,
    name: "Дилшод Рахимов",
    email: "dilshod@example.com",
    course: "Программирование",
  },
]);

const showAddForm = ref(false);
const newStudent = ref({
  name: "",
  email: "",
  course: "",
});

const addStudent = () => {
  if (newStudent.value.name && newStudent.value.email) {
    students.value.push({
      id: Date.now(),
      ...newStudent.value,
    });
    newStudent.value = { name: "", email: "", course: "" };
    showAddForm.value = false;
  }
};
</script>
  
  <style lang="scss" scoped>
.students-page {
  padding: $spacing-lg;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-xl;
}

.students-list {
  display: grid;
  gap: $spacing-md;
}

.student-card {
  background: var(--surface-color, #f8fafc);
  padding: $spacing-lg;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color, #e5e7eb);

  h3 {
    color: var(--primary-color);
    margin-bottom: $spacing-sm;
  }

  p {
    margin: $spacing-xs 0;
    color: var(--text-color);
  }
}

.add-form {
  background: var(--surface-color);
  padding: $spacing-lg;
  border-radius: var(--border-radius);
  margin: $spacing-lg 0;
  border: 2px dashed var(--primary-color);
}

.form-input {
  width: 100%;
  padding: $spacing-sm;
  margin-bottom: $spacing-md;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}
</style>