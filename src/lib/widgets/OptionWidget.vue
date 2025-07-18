<script setup lang="ts">
import {Ref, ref, provide} from "vue";

interface Props {
  title: string;
  align?: 'vertical' | 'horizontal';
  isExpandable?: boolean;
}

withDefaults(defineProps<Props>(), {
  align: 'horizontal',
  isExpandable: false
})

const isExpanded: Ref<boolean> = ref(false)
const isFullScreen: Ref<boolean> = ref(false)

// Provide fullHeight context to child components
provide('optionWidgetFullHeight', isFullScreen)

const toggleExpand = ($event: Event) => {
  $event.preventDefault();
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
    isFullScreen.value = false;
  }
}

const toggleFullScreen = ($event: Event) => {
  $event.preventDefault();
  isFullScreen.value = !isFullScreen.value;
}
</script>

<template>
  <!-- Backdrop for expanded state -->
  <div
      v-if="isExpanded"
      class="bcpb:fixed bcpb:inset-0 bcpb:bg-black/40 bcpb:backdrop-blur-sm bcpb:z-40"
      role="button"
      @click="toggleExpand"
  ></div>

  <!-- Main Widget Container -->
  <div
      class="group bcpb:border-b bcpb:border-gray-100 last:bcpb:border-b-0 bcpb:transition-colors bcpb:duration-200 hover:bcpb:bg-gray-50/30"
      :class="{
      'bcpb:flex bcpb:items-start bcpb:justify-between bcpb:py-4 bcpb:px-1': align === 'horizontal',
      'bcpb:flex bcpb:flex-col bcpb:space-y-3 bcpb:py-4 bcpb:px-1': align === 'vertical'
    }"
  >
    <!-- Label Section -->
    <div
        class="bcpb:flex bcpb:items-center bcpb:justify-between bcpb:text-sm bcpb:font-medium bcpb:text-gray-700"
        :class="{
        'bcpb:w-2/5 bcpb:min-w-0': align === 'horizontal',
        'bcpb:w-full': align === 'vertical'
      }"
    >
      <span class="bcpb:truncate">{{ title }}</span>

      <!-- Expand Icon -->
      <button
          v-if="isExpandable"
          @click="toggleExpand"
          class="bcpb:ml-2 bcpb:p-1 bcpb:text-gray-400 hover:bcpb:text-gray-600 hover:bcpb:bg-gray-100 bcpb:rounded bcpb:transition-colors bcpb:duration-200"
          title="Expand"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-left bcpb:text-sm" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5"/>
          <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0z"/>
        </svg>
      </button>
    </div>

    <!-- Control Section -->
    <div
        class="bcpb:transition-all bcpb:duration-300 bcpb:ease-in-out"
        :class="{
        'bcpb:w-3/5 bcpb:min-w-0': align === 'horizontal' && !isExpanded,
        'bcpb:w-full': align === 'vertical' && !isExpanded,
        // Expanded state styles
        'bcpb:fixed bcpb:left-1/2 bcpb:top-1/2 bcpb:-translate-x-1/2 bcpb:-translate-y-1/2 bcpb:w-[190vw] bcpb:max-w-4xl bcpb:max-h-[80vh] bcpb:bg-white bcpb:rounded-xl bcpb:shadow-2xl bcpb:border bcpb:border-gray-200 bcpb:z-50 bcpb:overflow-hidden': isExpanded && !isFullScreen,
        // Full screen state styles
        'bcpb:fixed bcpb:left-1/2 bcpb:top-1/2 bcpb:-translate-x-1/2 bcpb:-translate-y-1/2 bcpb:w-[90vw] bcpb:h-[90vh] bcpb:bg-white bcpb:rounded-xl bcpb:shadow-2xl bcpb:border bcpb:border-gray-200 bcpb:z-50 bcpb:overflow-hidden': isExpanded && isFullScreen
      }"
    >
      <!-- Expanded Header (only shown when expanded) -->
      <div v-if="isExpanded" class="bcpb:flex bcpb:items-center bcpb:justify-between bcpb:px-4 bcpb:border-b bcpb:border-gray-100 bcpb:bg-gray-50/50">
        <h3 class="bcpb:text-lg bcpb:font-semibold bcpb:text-gray-900">{{ title }}</h3>
        <div class="bcpb:flex bcpb:items-center bcpb:space-x-2">
          <!-- Full Screen Toggle Button -->
          <button
              @click="toggleFullScreen"
              class="bcpb:p-2 bcpb:text-gray-400 hover:bcpb:text-gray-600 hover:bcpb:bg-gray-100 bcpb:rounded-lg bcpb:transition-colors bcpb:duration-200"
              :title="isFullScreen ? 'Exit Full Screen' : 'Full Screen'"
          >
            <svg v-if="!isFullScreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen bcpb:text-sm" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 1 1-1 0V9.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H1.732l4.096-4.096a.5.5 0 0 0 0-.707z"/>
              <path fill-rule="evenodd" d="M10.172 5.828a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 1 1 0v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h1.732l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse bcpb:text-sm" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zM.5 9a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 1 0 1h-2A1.5 1.5 0 0 1 0 11.5v-2A.5.5 0 0 1 .5 9zm5 1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-2zm0-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H6.5a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <!-- Close Button -->
          <button
              @click="toggleExpand"
              class="bcpb:p-2 bcpb:text-gray-400 hover:bcpb:text-gray-600 hover:bcpb:bg-gray-100 bcpb:rounded-lg bcpb:transition-colors bcpb:duration-200"
              title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg bcpb:text-sm" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content Container -->
      <div
          :class="{
          'bcpb:p-1': !isExpanded,
          'bcpb:p-4 bcpb:overflow-y-auto bcpb:max-h-[calc(80vh-80px)]': isExpanded && !isFullScreen,
          'bcpb:p-4 bcpb:overflow-y-auto bcpb:h-[calc(90vh-80px)]': isExpanded && isFullScreen
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pure CSS only - no Tailwind utilities */
</style>