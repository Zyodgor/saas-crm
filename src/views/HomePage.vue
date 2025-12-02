<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import AppButton from "@/components/UI/AppButton.vue";
import AppIcon from "@/components/UI/AppIcon.vue";

const router = useRouter();
const { t } = useI18n();

// Обновляем статистику с иконками
const stats = ref([
  {
    icon: "Users",
    value: "247",
    key: "students",
    translationKey: "dashboard.stats.students",
    trend: { type: "up", value: "+12%", icon: "TrendingUp" },
  },
  {
    icon: "BookOpen",
    value: "15",
    key: "courses",
    translationKey: "dashboard.stats.courses",
    trend: { type: "up", value: "+3%", icon: "TrendingUp" },
  },
  {
    icon: "UserCheck",
    value: "8",
    key: "teachers",
    translationKey: "dashboard.stats.teachers",
    trend: { type: "stable", value: "0%", icon: "Minus" },
  },
  {
    icon: "CreditCard",
    value: "12.5M",
    key: "revenue",
    translationKey: "dashboard.stats.revenue",
    trend: { type: "up", value: "+8%", icon: "TrendingUp" },
  },
]);

// Обновляем быстрые действия с иконками
const quickActions = ref([
  {
    icon: "UserPlus",
    labelKey: "dashboard.addStudent",
    route: "/students",
    variant: "primary",
  },
  {
    icon: "CalendarPlus",
    labelKey: "dashboard.createSchedule",
    route: "/schedule",
    variant: "secondary",
  },
  {
    icon: "CreditCard",
    labelKey: "dashboard.managePayments",
    route: "/finance",
    variant: "secondary",
  },
  {
    icon: "BarChart3",
    labelKey: "dashboard.viewReports",
    route: "/reports",
    variant: "secondary",
  },
]);

// Остальной код без изменений...
</script>

<template>
  <div class="home-page">
    <!-- ... остальной template ... -->

    <div class="content-card">
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.key">
          <AppIcon :name="stat.icon" size="xl" class="stat-icon" />
          <div class="stat-info">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-title">{{ $t(stat.translationKey) }}</div>
            <div
              v-if="stat.trend"
              class="stat-trend"
              :class="`trend--${stat.trend.type}`"
            >
              <AppIcon :name="stat.trend.icon" size="sm" class="trend-icon" />
              <span class="trend-value">{{ stat.trend.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-card">
      <h2>{{ $t("dashboard.quickActions") }}</h2>
      <div class="quick-actions">
        <AppButton
          v-for="action in quickActions"
          :key="action.labelKey"
          :variant="action.variant as 'primary' | 'secondary'"
          @click="$router.push(action.route)"
          class="quick-action-btn"
        >
          <AppIcon :name="action.icon" size="md" class="action-icon" />
          <span class="action-text">{{ $t(action.labelKey) }}</span>
        </AppButton>
      </div>
    </div>

    <!-- ... остальные секции ... -->
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  .page-header {
    margin-bottom: $spacing-2xl;

    p {
      color: var(--text-muted);
      font-size: 1.1em;
      margin: 0;
    }
  }
}

.stat-icon {
  color: var(--primary-color);
  opacity: 0.9;
}

.action-icon {
  color: currentColor;
}

.trend-icon {
  margin-right: 2px;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-lg;

  h2 {
    margin: 0;
    color: var(--text-color);
  }

  .last-updated {
    color: var(--text-muted);
    font-size: 0.9em;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: $spacing-lg;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background: var(--background-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  .stat-icon {
    font-size: 2.5rem;
    opacity: 0.8;
  }

  .stat-info {
    flex: 1;

    .stat-number {
      font-size: 1.75rem;
      font-weight: bold;
      color: var(--primary-color);
      line-height: 1;
      margin-bottom: $spacing-xs;
    }

    .stat-title {
      color: var(--text-muted);
      font-size: 0.9em;
      margin-bottom: $spacing-xs;
    }

    .stat-trend {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      font-size: 0.8em;
      font-weight: 500;

      &.trend--up {
        color: #10b981;
      }

      &.trend--down {
        color: #ef4444;
      }

      &.trend--stable {
        color: var(--text-muted);
      }

      .trend-icon {
        font-size: 0.9em;
      }
    }
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-md;
  margin-top: $spacing-lg;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  justify-content: flex-start;
  padding: $spacing-lg;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  .action-icon {
    font-size: 1.5em;
  }

  .action-text {
    font-weight: 500;
  }
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-lg;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  background: var(--background-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--surface-color);
  }

  .activity-icon {
    font-size: 1.5rem;
    width: 40px;
    text-align: center;
  }

  .activity-content {
    flex: 1;

    .activity-text {
      margin: 0 0 $spacing-xs 0;
      color: var(--text-color);
      font-weight: 500;
    }

    .activity-time {
      color: var(--text-muted);
      font-size: 0.8em;
    }
  }

  .activity-badge {
    padding: $spacing-xs $spacing-sm;
    border-radius: 20px;
    font-size: 0.75em;
    font-weight: 500;

    &.badge--completed {
      background: #10b98120;
      color: #10b981;
    }

    &.badge--pending {
      background: #f59e0b20;
      color: #f59e0b;
    }
  }
}

.empty-state {
  text-align: center;
  padding: $spacing-2xl;
  color: var(--text-muted);

  .empty-icon {
    font-size: 3rem;
    margin-bottom: $spacing-md;
    display: block;
  }
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-top: $spacing-lg;
}

.event-item {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background: var(--background-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }

  .event-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;

    .event-day {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
    }

    .event-month {
      font-size: 0.8em;
      color: var(--text-muted);
      text-transform: uppercase;
    }
  }

  .event-details {
    flex: 1;

    .event-title {
      margin: 0 0 $spacing-xs 0;
      color: var(--text-color);
    }

    .event-info {
      margin: 0;
      display: flex;
      gap: $spacing-lg;
      color: var(--text-muted);
      font-size: 0.9em;

      .event-time,
      .event-location {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
      }
    }
  }
}

// Адаптивность
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .activity-header {
    flex-direction: column;
    gap: $spacing-md;
    align-items: flex-start;
  }

  .event-item {
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-md;

    .event-date {
      flex-direction: row;
      gap: $spacing-sm;
    }

    .event-info {
      flex-direction: column;
      gap: $spacing-xs;
    }

    .event-actions {
      align-self: stretch;

      button {
        width: 100%;
      }
    }
  }
}
</style>