<script setup lang="ts">

import Sidebar from "./layouts/Sidebar.vue";
import ToolBar from "./layouts/ToolBar.vue";
import {Block} from "./utils/types.ts";
import {usePageBuilder} from "./PageBuilder.ts";
import {useLoadCSS} from "./useLoadCSS.ts";
import {onMounted, onUnmounted, ref, Ref, watchEffect} from "vue";
import {previewComponentMap, previewOptionMap} from "./utils/registry.ts";
import PagePreview from "./PagePreview.vue";

interface Props {
  cssUrl?: string;
  renderList?: Block[],
  meta?: Array<Record<string, string>>,
  pageTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  cssUrl: '',
})

const emit = defineEmits<{
  (event: 'onSave', value: any): void,
  (event: 'onBack', value: any): void,
}>()

const {
  meta,
  renderList,
  dragOverIndex,
  selectedOptionComponent,
  dragOverChildElement,
  onDrop,
  onDropChildElement,
  onDragLeave,
  onDragOver,
  startDragItem,
  onDragOverItem,
  onDragOverChildElement,
  onItemSelect,
  onSelectFormChildElement,
  onDelete
} = usePageBuilder()

const {loadCSS, removeCSS} = useLoadCSS()


// ESC key listener for preview mode
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isPreview.value) {
    isPreview.value = false;
  }
};

onMounted(() => {
  loadCSS(props.cssUrl)
  document.body.style.height = '100%';
  document.body.style.overflow = 'hidden';

  // Add ESC key listener
  document.addEventListener('keydown', handleKeyDown);
})

watchEffect(() => {
  renderList.value = props.renderList ? [...props.renderList] : []
  meta.value = props.meta ? [...props.meta] : []
})

onUnmounted(() => {
  removeCSS(props.cssUrl)
  document.body.style.height = 'auto';
  document.body.style.overflow = 'auto';

  // Cleanup ESC key listener
  document.removeEventListener('keydown', handleKeyDown);
})

const exportPage = ($event: Event) => {
  $event.preventDefault();
  emit('onSave', {'renderList': renderList.value, 'meta': meta.value})
}

const isPreview: Ref<boolean> = ref(false);

const selectedDevice = ref<'desktop' | 'tab' | 'mobile'>('desktop')

const devices: Record<'desktop' | 'tab' | 'mobile', string> = {
  'desktop': 'bcpb:w-full',
  'tab': 'bcpb:w-4xl bcpb:mx-auto',
  'mobile': 'bcpb:w-full bcpb:max-w-sm bcpb:mx-auto bcpb:px-4',
}
</script>

<template>

  <!-- Enhanced Preview Modal -->
  <div v-if="isPreview"
       class="bcpb:fixed bcpb:inset-0 bcpb:bg-white bcpb:w-full bcpb:h-screen bcpb:z-[9999] bcpb:overflow-auto">

    <!-- Always Visible Close Button with Enhanced Styling -->
    <button
        @click="isPreview = false"
        class="preview-close-button bcpb:fixed bcpb:top-4 bcpb:right-4 bcpb:z-[99999] bcpb:w-12 bcpb:h-12 bcpb:bg-white bcpb:text-gray-700 bcpb:rounded-full bcpb:shadow-2xl bcpb:border-2 bcpb:border-gray-200 hover:bcpb:bg-gray-50 hover:bcpb:border-gray-300 hover:bcpb:text-gray-900 hover:bcpb:scale-110 bcpb:transition-all bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center focus:bcpb:outline-none focus:bcpb:ring-4 focus:bcpb:ring-blue-500/20 bcpb:backdrop-blur-sm"
        title="Close Preview (ESC)"
        aria-label="Close Preview"
    >
      <span class="icon-x-lg bcpb:text-lg"></span>
    </button>

    <!-- Secondary Close Button for Mobile/Touch -->
    <div
        class="preview-mode-indicator bcpb:fixed bcpb:top-4 bcpb:left-4 bcpb:z-[99998] bcpb:bg-black/80 bcpb:text-white bcpb:px-4 bcpb:py-2 bcpb:rounded-full bcpb:text-sm bcpb:font-medium bcpb:backdrop-blur-sm">
      Preview Mode
    </div>

    <!-- Floating Action Bar -->
    <div class="floating-action-bar bcpb:fixed bcpb:bottom-6 bcpb:right-6 bcpb:z-[99998] bcpb:flex bcpb:gap-3">
      <!-- Back to Editor Button -->
      <button
          @click="isPreview = false"
          class="bcpb:bg-blue-600 hover:bcpb:bg-blue-700 bcpb:text-white bcpb:px-6 bcpb:py-3 bcpb:rounded-full bcpb:shadow-lg hover:bcpb:shadow-xl bcpb:font-medium bcpb:transition-all bcpb:duration-200 hover:bcpb:scale-105 focus:bcpb:outline-none focus:bcpb:ring-4 focus:bcpb:ring-blue-500/20"
      >
        ← Back to Editor
      </button>

      <!-- Save Button in Preview -->
      <button
          @click="exportPage($event)"
          class="bcpb:bg-green-600 hover:bcpb:bg-green-700 bcpb:text-white bcpb:px-6 bcpb:py-3 bcpb:rounded-full bcpb:shadow-lg hover:bcpb:shadow-xl bcpb:font-medium bcpb:transition-all bcpb:duration-200 hover:bcpb:scale-105 focus:bcpb:outline-none focus:bcpb:ring-4 focus:bcpb:ring-green-500/20"
      >
        💾 Save Page
      </button>
    </div>

    <!-- Preview Content Container -->
    <div class="bcpb:w-full bcpb:min-h-full bcpb:bg-white">
      <PagePreview :renderList="renderList"></PagePreview>
    </div>
  </div>

  <div class="bcpb:flex bcpb:h-screen bcpb:bg-gray-50">
    <!-- Left Side - Canvas/Drop Zone -->
    <div class="bcpb:flex-1 bcpb:bg-white bcpb:border-r bcpb:border-gray-100 bcpb:flex bcpb:flex-col">

      <ToolBar @on-preview="isPreview = true" @on-save="exportPage" @onBack="emit('onBack', true)"
               @on-device="(event) => selectedDevice = event" :device="selectedDevice"></ToolBar>

      <!-- Canvas Area -->
      <div class="bcpb:flex-1 bcpb:p-4 bcpb:overflow-auto">
        <div :class="devices[selectedDevice]">
          <!-- Drop Zone -->
          <div
              @drop="onDrop($event)"
              @dragenter.prevent
              @dragleave.prevent="onDragLeave()"
              @dragover.prevent="onDragOver($event)"
              class="drop-zone bcpb:min-h-[700px] bcpb:border-2 bcpb:border-dashed bcpb:border-gray-200 bcpb:rounded-xl bcpb:bg-gradient-to-br bcpb:from-blue-50/30 bcpb:via-white bcpb:to-purple-50/20 bcpb:relative bcpb:overflow-hidden bcpb:transition-all bcpb:duration-300 hover:bcpb:border-gray-300 hover:bcpb:bg-gradient-to-br hover:bcpb:from-blue-50/40 hover:bcpb:to-purple-50/30">

            <div v-for="(block, index) of renderList" draggable="true" :key="`r_item_${index}`"
                 @dragover="onDragOverItem($event, index)"
                 @dragstart="startDragItem($event, block, index)">
              <div :class="{'drag-over': dragOverIndex == index && !dragOverChildElement}">
              </div>
              <component :is="previewComponentMap[block.name]"
                         :blockInfo="block"
                         :inEditor="true"
                         @onSelectChildElement="onSelectFormChildElement"
                         @onDragOverChildElement="onDragOverChildElement"
                         @onDropChildElement="onDropChildElement"
                         @click="onItemSelect(block)"></component>
            </div>

            <!-- Enhanced No Item State -->
            <div v-if="renderList.length == 0"
                 class="no-item bcpb:absolute bcpb:inset-0 bcpb:flex bcpb:items-center bcpb:justify-center">
              <div class="bcpb:text-center bcpb:p-12 bcpb:max-w-md bcpb:mx-auto">
                <!-- Icon Container -->
                <div class="bcpb:relative bcpb:mb-6">
                  <div
                      class="bcpb:w-24 bcpb:h-24 bcpb:mx-auto bcpb:bg-gradient-to-br bcpb:from-blue-100 bcpb:to-purple-100 bcpb:rounded-full bcpb:flex bcpb:items-center bcpb:justify-center bcpb:shadow-lg">
                    <span class="icon-info bcpb:text-4xl bcpb:text-blue-600"></span>
                  </div>
                  <!-- Floating Animation Elements -->
                  <div
                      class="bcpb:absolute bcpb:-top-2 bcpb:-right-2 bcpb:w-4 bcpb:h-4 bcpb:bg-blue-400 bcpb:rounded-full bcpb:animate-pulse"></div>
                  <div
                      class="bcpb:absolute bcpb:-bottom-1 bcpb:-left-3 bcpb:w-3 bcpb:h-3 bcpb:bg-purple-400 bcpb:rounded-full bcpb:animate-pulse bcpb:delay-75"></div>
                </div>

                <!-- Content -->
                <div class="bcpb:space-y-4">
                  <h3 class="bcpb:text-xl bcpb:font-semibold bcpb:text-gray-800">Ready to build something amazing?</h3>
                  <p class="bcpb:text-gray-600 bcpb:leading-relaxed">
                    Your canvas is empty and ready for creativity. Drag components from the sidebar and drop them here
                    to start building your page.
                  </p>

                  <!-- Call to Action -->
                  <div
                      class="bcpb:mt-6 bcpb:p-4 bcpb:bg-gradient-to-r bcpb:from-blue-50 bcpb:to-purple-50 bcpb:rounded-lg bcpb:border bcpb:border-blue-100">
                    <p class="bcpb:text-sm bcpb:text-blue-700 bcpb:font-medium">💡 Pro Tip: Start with a layout component
                      like columns
                      or containers</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!--    Sidebar portion where the element will be shown and user can modify selected elements-->
    <Sidebar></Sidebar>

    <!-- Options Panel with Transition -->
    <Transition name="slide-left">
      <div v-if="selectedOptionComponent"
           class="bcpb:fixed bcpb:right-0 bcpb:top-0 bcpb:bottom-0 bcpb:w-100 bcpb:bg-white bcpb:border-l bcpb:border-gray-200 bcpb:z-50">
        <!-- Content -->
        <div class="bcpb:flex-1 bcpb:overflow-y-auto">
          <component v-if="selectedOptionComponent"
                     :is="previewOptionMap[selectedOptionComponent.name]"
                     :blockInfo="selectedOptionComponent"
                     @onClose="selectedOptionComponent = null"
                     @onDelete="onDelete"
          ></component>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Slide-left transition for options panel */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(100%);
}

/* Enhanced drag over states */
.drag-over {
  border: 2px dashed #3b82f6;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
  0%, 100% {
    border-color: #3b82f6;
  }
  50% {
    border-color: #2563eb;
  }
}

.drop-zone {
  padding-bottom: 2rem !important;
}

/* Drop zone active state */
.drop-zone.drag-active {
  border-color: #60a5fa;
  background: linear-gradient(to bottom right, rgba(147, 197, 253, 0.5), rgba(219, 234, 254, 0.3), rgba(196, 181, 253, 0.4));
  animation: drop-zone-glow 2s infinite alternate;
}

@keyframes drop-zone-glow {
  0% {
    border-color: #60a5fa;
  }
  100% {
    border-color: #3b82f6;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
  }
}

/* Enhanced Preview Mode Styles */
.preview-close-button {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Floating Action Bar Animation */
.floating-action-bar {
  animation: slideUpFade 0.3s ease-out;
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Preview Mode Indicator Animation */
.preview-mode-indicator {
  animation: fadeInSlide 0.4s ease-out;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>