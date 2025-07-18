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

      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg bcpb:text-lg"
           viewBox="0 0 16 16">
        <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg>
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
          class="bcpb:flex bcpb:space-x-2 bcpb:items-center bcpb:bg-green-600 hover:bcpb:bg-green-700 bcpb:text-white bcpb:px-6 bcpb:py-3 bcpb:rounded-full bcpb:shadow-lg hover:bcpb:shadow-xl bcpb:font-medium bcpb:transition-all bcpb:duration-200 hover:bcpb:scale-105 focus:bcpb:outline-none focus:bcpb:ring-4 focus:bcpb:ring-green-500/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy"
             viewBox="0 0 16 16">
          <path d="M11 2H9v3h2z"/>
          <path
              d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
        </svg>
        <span>Save Page</span>
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

            <div v-for="(block, index) of renderList" :key="`r_item_${index}`"
                 @dragover="onDragOverItem($event, index)">
              <div :class="{'drag-over': dragOverIndex == index && !dragOverChildElement}">
              </div>
              
              <!-- Drag Handle Button -->
              <div class="bcpb:relative bcpb:group">
                <button
                    @dragstart="startDragItem($event, block, index)"
                    class="drag-handle bcpb:absolute bcpb:top-2 bcpb:right-2 bcpb:z-50 bcpb:w-8 bcpb:h-8 bcpb:bg-white bcpb:border bcpb:border-gray-300 bcpb:rounded-md bcpb:shadow-sm bcpb:flex bcpb:items-center bcpb:justify-center bcpb:opacity-0 bcpb:group-hover:opacity-100 bcpb:transition-all bcpb:duration-200 hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400 hover:bcpb:shadow-md bcpb:cursor-grab active:bcpb:cursor-grabbing"
                    title="Drag to reorder"
                    draggable="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bcpb:text-gray-500" viewBox="0 0 16 16">
                    <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                  </svg>
                </button>
                
                <component :is="previewComponentMap[block.name]"
                           :blockInfo="block"
                           :inEditor="true"
                           @onSelectChildElement="onSelectFormChildElement"
                           @onDragOverChildElement="onDragOverChildElement"
                           @onDropChildElement="onDropChildElement"
                           @click="onItemSelect(block)"></component>
              </div>
            </div>

            <!-- Enhanced No Item State -->
            <div v-if="renderList.length == 0"
                 class="no-item bcpb:absolute bcpb:inset-0 bcpb:flex bcpb:items-center bcpb:justify-center">
              <div class="bcpb:text-center bcpb:p-12 bcpb:max-w-md bcpb:mx-auto">
                <!-- Icon Container -->
                <div class="bcpb:relative bcpb:mb-6">
                  <div
                      class="bcpb:w-24 bcpb:h-24 bcpb:mx-auto bcpb:bg-gradient-to-br bcpb:from-blue-100 bcpb:to-purple-100 bcpb:rounded-full bcpb:flex bcpb:items-center bcpb:justify-center bcpb:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor"
                         class="bcpb:text-4xl bcpb:text-blue-600" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path
                          d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
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

/* Drag Handle Styles */
.drag-handle {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.drag-handle:hover {
  transform: scale(1.05);
}

.drag-handle:active {
  transform: scale(0.95);
}

/* Show drag handle when component is selected */
.group:hover .drag-handle,
.group:focus-within .drag-handle {
  opacity: 1 !important;
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