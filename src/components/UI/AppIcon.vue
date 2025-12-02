<template>
  <div class="app-icon-wrapper">
    <component
      :is="getIconComponent"
      :size="iconSize"
      :color="color"
      class="app-icon"
      :style="{ width: iconSize + 'px', height: iconSize + 'px' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Импортируем ТОЛЬКО нужные иконки
import {
  HelpCircle,
  Home,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Languages,
  UserPlus,
  CalendarPlus,
  TrendingUp,
  Minus,
  Upload,
  Trash2,
  X,
  RotateCcw,
  Save,
  GraduationCap,
  School,
  Lightbulb,
  Rocket,
  Target,
  Award,
  Heart,
  Star,
  Image,
  Type,
} from "lucide-vue-next";

interface Props {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "currentColor",
});

// Маппинг имен иконок на компоненты
const iconMap = {
  // Навигация
  Home,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Languages,

  // Действия
  UserPlus,
  CalendarPlus,
  Upload,
  Trash2,
  X,
  RotateCcw,
  Save,

  // Статистика
  TrendingUp,
  Minus,

  // Логотипы
  GraduationCap,
  School,
  Lightbulb,
  Rocket,
  Target,
  Award,
  Heart,
  Star,
  Image,
  Type,

  // Дефолтная
  HelpCircle,
};

const getIconComponent = computed(() => {
  return iconMap[props.name as keyof typeof iconMap] || HelpCircle;
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
}

.app-icon {
  display: block;
  flex-shrink: 0;
}
</style>