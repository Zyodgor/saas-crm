<template>
  <ModalContainer v-if="isOpen" @close="closeModal">
    <div class="logo-modal">
      <!-- Заголовок модалки -->
      <div class="modal-header">
        <h2>🎨 Настройка логотипа</h2>
        <p>Настройте внешний вид логотипа для вашего учебного центра</p>
      </div>

      <!-- Контент модалки -->
      <div class="modal-content">
        <!-- Предпросмотр -->
        <div class="preview-section">
          <h3>Предпросмотр</h3>
          <div class="preview-container">
            <div class="preview-item">
              <span class="preview-label">Развернутый вид:</span>
              <div class="preview-sidebar">
                <div class="preview-header">
                  <AppLogo size="md" :collapsed="false" />
                </div>
              </div>
            </div>
            <div class="preview-item">
              <span class="preview-label">Свернутый вид:</span>
              <div class="preview-sidebar preview-sidebar--collapsed">
                <div class="preview-header">
                  <AppLogo size="md" :collapsed="true" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Настройки (тот же контент что был на странице) -->
        <div class="setup-section">
          <h3>Настройки логотипа</h3>

          <!-- Тип логотипа -->
          <div class="setting-group">
            <label>Тип логотипа:</label>
            <div class="type-options">
              <button
                v-for="type in logoTypes"
                :key="type.value"
                :class="[
                  'type-option',
                  { 'type-option--active': currentLogo.type === type.value },
                ]"
                @click="updateLogoType(type.value)"
              >
                <AppIcon :name="type.icon" size="md" />
                <span>{{ type.label }}</span>
              </button>
            </div>
          </div>

          <!-- Настройки для иконки -->
          <div v-if="currentLogo.type === 'icon'" class="setting-group">
            <label>Иконка:</label>
            <div class="icon-grid">
              <button
                v-for="icon in availableIcons"
                :key="icon"
                :class="[
                  'icon-option',
                  { 'icon-option--active': currentLogo.iconName === icon },
                ]"
                @click="updateLogo({ iconName: icon })"
              >
                <AppIcon :name="icon" size="lg" />
              </button>
            </div>
          </div>

          <!-- Настройки для изображения -->
          <div v-if="currentLogo.type === 'image'" class="setting-group">
            <label>Загрузить изображение:</label>
            <div class="image-upload">
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                @change="handleImageUpload"
                class="file-input"
              />
              <button @click="triggerFileInput" class="upload-btn">
                <AppIcon name="Upload" size="sm" />
                Выбрать файл
              </button>
              <p class="upload-hint">Рекомендуется PNG или SVG, макс. 2MB</p>
            </div>

            <div v-if="currentLogo.imageUrl" class="current-image">
              <img
                :src="currentLogo.imageUrl"
                alt="Current logo"
                class="current-image-preview"
              />
              <button @click="removeImage" class="remove-btn">
                <AppIcon name="Trash2" size="sm" />
                Удалить
              </button>
            </div>
          </div>

          <!-- Настройки для текста -->
          <div v-if="currentLogo.type === 'text'" class="setting-group">
            <label>Текст логотипа:</label>
            <input
              v-model="customText"
              @input="updateCustomText"
              placeholder="Введите текст логотипа"
              class="text-input"
              maxlength="20"
            />
            <p class="input-hint">{{ customText.length }}/20 символов</p>
          </div>

          <!-- Общие настройки -->
          <div class="setting-group">
            <div class="text-input-header">
              <label>
                Текст бренда:
                <span class="optional-label">(опционально)</span>
              </label>
              <button
                v-if="brandText && brandText !== 'EduCRM'"
                @click="clearBrandText"
                class="clear-text-btn"
                type="button"
              >
                <AppIcon name="X" size="xs" />
                Очистить
              </button>
            </div>
            <input
              v-model="brandText"
              @input="updateBrandText"
              placeholder="Название вашего центра"
              class="text-input"
              maxlength="20"
            />
            <p class="input-hint">
              {{ brandText.length }}/20 символов
              <span v-if="brandText.length > 15" class="hint-warning">
                ⚠️ Длинные названия будут обрезаться в боковом меню
              </span>
              <span
                v-else-if="!brandText || brandText === 'EduCRM'"
                class="hint-warning"
              >
                ⚠️ Если оставить пустым, текст не будет отображаться
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Футер модалки -->
      <div class="modal-footer">
        <AppButton @click="resetLogo" variant="secondary">
          <AppIcon name="RotateCcw" size="sm" />
          Сбросить
        </AppButton>
        <div class="footer-actions">
          <AppButton @click="closeModal" variant="outline"> Отмена </AppButton>
          <AppButton @click="saveAndClose" variant="primary">
            <AppIcon name="Save" size="sm" />
            Сохранить
          </AppButton>
        </div>
      </div>
    </div>
  </ModalContainer>
</template>
  
  <script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useLogoStore } from "@/stores/logo";
import AppIcon from "@/components/UI/AppIcon.vue";
import AppButton from "@/components/UI/AppButton.vue";
import AppLogo from "@/components/UI/AppLogo.vue";
import ModalContainer from "@/components/modals/ModalContainer.vue";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const logoStore = useLogoStore();
const fileInput = ref<HTMLInputElement>();

const currentLogo = computed(() => logoStore.currentLogo);
const customText = ref(logoStore.currentLogo.customText || "");
const brandText = ref(logoStore.currentLogo.text || "EduCRM");

const logoTypes = [
  { value: "icon", label: "Иконка", icon: "Star" },
  { value: "image", label: "Изображение", icon: "Image" },
  { value: "text", label: "Текст", icon: "Type" },
];

const availableIcons = [
  "GraduationCap",
  "School",
  "BookOpen",
  "Users",
  "Lightbulb",
  "Rocket",
  "Target",
  "Award",
  "Heart",
  "Star",
];

const updateLogoType = (type: "icon" | "image" | "text") => {
  // При смене типа очищаем старые данные
  const newConfig: Partial<LogoConfig> = { type };

  if (type === "icon") {
    // Для иконки - устанавливаем дефолтную иконку и очищаем изображение
    newConfig.iconName = "GraduationCap";
    newConfig.imageUrl = undefined;
    newConfig.imageData = undefined;
    newConfig.customText = undefined;
  } else if (type === "image") {
    // Для изображения - очищаем иконку и кастомный текст
    newConfig.iconName = undefined;
    newConfig.customText = undefined;
  } else if (type === "text") {
    // Для текста - очищаем все кроме текста
    newConfig.iconName = undefined;
    newConfig.imageUrl = undefined;
    newConfig.imageData = undefined;
  }

  logoStore.updateLogo(newConfig);
  // Обновляем локальные переменные
  customText.value = logoStore.currentLogo.customText || "";
  brandText.value = logoStore.currentLogo.text || "";
};

const clearBrandText = () => {
  brandText.value = "";
  logoStore.updateLogo({ text: "" });
};

const updateLogo = (config: any) => {
  logoStore.updateLogo(config);
};

const updateCustomText = () => {
  logoStore.updateLogo({ customText: customText.value });
};

const updateBrandText = () => {
  logoStore.updateLogo({ text: brandText.value });
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert("Файл слишком большой. Максимальный размер: 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      logoStore.updateLogo({
        type: "image",
        imageData,
        imageUrl: imageData,
        text: "", // Очищаем текст при загрузке картинки
        customText: undefined,
      });
      // Обновляем локальные переменные
      brandText.value = "";
    };
    reader.onerror = () => {
      console.error("Failed to read file");
      alert("Ошибка при чтении файла");
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  logoStore.updateLogo({
    type: "icon",
    imageUrl: undefined,
    imageData: undefined,
  });
};

const saveAndClose = () => {
  // Принудительно обновляем стор
  logoStore.updateLogo({ ...logoStore.currentLogo });
  closeModal();
};

const resetLogo = () => {
  logoStore.resetLogo();
  customText.value = "";
  brandText.value = "EduCRM";
};

const closeModal = () => {
  emit("close");
};

// Инициализация при открытии
onMounted(() => {
  customText.value = logoStore.currentLogo.customText || "";
  brandText.value = logoStore.currentLogo.text || "EduCRM";
});
</script>
  
  <style lang="scss" scoped>
.text-input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;
}

.clear-text-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-muted);
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--error-color, #ef4444);
    color: white;
    border-color: var(--error-color, #ef4444);
  }
}

.optional-label {
  font-size: 0.8em;
  color: var(--text-muted);
  font-weight: normal;
  margin-left: 4px;
}

.hint-info {
  color: var(--primary-color);
  font-weight: 500;
}

.hint-warning {
  color: #f59e0b;
  font-weight: 500;
}
.text-input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;
}

.clear-text-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-muted);
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--error-color, #ef4444);
    color: white;
    border-color: var(--error-color, #ef4444);
  }
}

.optional-label {
  font-size: 0.8em;
  color: var(--text-muted);
  font-weight: normal;
  margin-left: 4px;
}

.hint-warning {
  color: #f59e0b;
  font-weight: 500;
}

.logo-modal {
  background: var(--background-color);
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: $spacing-xl;
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0 0 $spacing-xs 0;
    color: var(--text-color);
  }

  p {
    margin: 0;
    color: var(--text-muted);
  }
}

.modal-content {
  padding: $spacing-xl;
  max-height: 60vh;
  overflow-y: auto;
}

.preview-section {
  margin-bottom: $spacing-2xl;

  h3 {
    margin-bottom: $spacing-lg;
    color: var(--text-color);
  }
}

.preview-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xl;
}

.preview-item {
  .preview-label {
    display: block;
    margin-bottom: $spacing-sm;
    font-size: 0.9em;
    color: var(--text-muted);
    font-weight: 500;
  }
}

.preview-sidebar {
  background: var(--surface-color);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: $spacing-md;

  &.preview-sidebar--collapsed {
    width: 60px;
  }
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
}

.setup-section {
  h3 {
    margin-bottom: $spacing-xl;
    color: var(--text-color);
  }
}

.setting-group {
  margin-bottom: $spacing-xl;

  label {
    display: block;
    margin-bottom: $spacing-md;
    font-weight: 500;
    color: var(--text-color);
  }
}

.type-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: $spacing-md;
}

.type-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-lg;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
  }

  &.type-option--active {
    border-color: var(--primary-color);
    background: var(--primary-color);
    color: white;

    .app-icon {
      color: white;
    }
  }
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: $spacing-md;
}

.icon-option {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
  }

  &.icon-option--active {
    border-color: var(--primary-color);
    background: var(--primary-color);

    .app-icon {
      color: white;
    }
  }
}

.image-upload {
  .file-input {
    display: none;
  }

  .upload-btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-lg;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-family: inherit;

    &:hover {
      opacity: 0.9;
    }
  }

  .upload-hint {
    margin-top: $spacing-xs;
    color: var(--text-muted);
    font-size: 0.9em;
  }
}

.current-image {
  margin-top: $spacing-md;

  .current-image-preview {
    max-width: 100px;
    max-height: 100px;
    border-radius: var(--border-radius);
    margin-bottom: $spacing-sm;
  }

  .remove-btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-md;
    background: var(--error-color, #ef4444);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9em;

    &:hover {
      opacity: 0.9;
    }
  }
}

.text-input {
  width: 100%;
  max-width: 300px;
  padding: $spacing-md;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-color);
  color: var(--text-color);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

.input-hint {
  margin-top: $spacing-xs;
  color: var(--text-muted);
  font-size: 0.9em;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-xl;
  border-top: 1px solid var(--border-color);
  background: var(--surface-color);
  border-radius: 0 0 12px 12px;
}

.footer-actions {
  display: flex;
  gap: $spacing-md;
}

.optional-label {
  font-size: 0.8em;
  color: var(--text-muted);
  font-weight: normal;
  margin-left: 4px;
}

.hint-warning {
  color: #f59e0b;
  font-weight: 500;
}

@media (max-width: 768px) {
  .logo-modal {
    margin: 20px;
    max-height: 95vh;
  }

  .preview-container {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
    gap: $spacing-md;

    .footer-actions {
      width: 100%;

      button {
        flex: 1;
      }
    }
  }

  .type-options {
    grid-template-columns: 1fr;
  }
}
</style>