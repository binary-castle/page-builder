<script setup lang="ts">
import {PropType, ref} from 'vue'
import MetaComponent from "./components/MetaComponent.vue";

defineProps({
  device: {
    type: String as PropType<'desktop' | 'tab' | 'mobile'>,
    default: 'desktop',
  }
})
const emit = defineEmits(['onPreview', 'onSave', 'onBack', 'onDevice'])

const showMetaModal = ref(false)

const openMetaModal = () => {
  showMetaModal.value = true
}

const closeMetaModal = () => {
  showMetaModal.value = false
}

</script>

<template>
  <!-- Toolbar -->
  <div
      class="bcpb:bg-white bcpb:border-b bcpb:border-gray-100 bcpb:px-8 bcpb:py-4 bcpb:flex bcpb:items-center bcpb:justify-between">
    <div class="bcpb:flex bcpb:items-center bcpb:space-x-6">
      <button
          type="button"
          @click="emit('onBack')"
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-gray-50 bcpb:rounded-lg bcpb:transition-colors bcpb:duration-200">
        <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <!-- Device Selector -->
      <div
          class="bcpb:flex bcpb:items-center bcpb:bg-gray-50 bcpb:rounded-lg bcpb:p-1 bcpb:border bcpb:border-gray-200">
        <button
            type="button"
            @click="emit('onDevice', 'desktop')"
            :class="{'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm bcpb:ring-1 bcpb:ring-gray-200': device === 'desktop'}"
            class="bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-white bcpb:rounded-md bcpb:transition-all bcpb:duration-200">
          <span class="bcpb:flex bcpb:items-center bcpb:gap-2">
            <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Desktop
          </span>
        </button>
        <button
            type="button"
            @click="emit('onDevice', 'tab')"
            :class="{'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm bcpb:ring-1 bcpb:ring-gray-200': device === 'tab'}"
            class="bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-white bcpb:rounded-md bcpb:transition-all bcpb:duration-200">
          <span class="bcpb:flex bcpb:items-center bcpb:gap-2">
            <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"/>
            </svg>
            Tablet
          </span>
        </button>
        <button
            type="button"
            @click="emit('onDevice', 'mobile')"
            :class="{'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm bcpb:ring-1 bcpb:ring-gray-200': device === 'mobile'}"
            class="bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-white bcpb:rounded-md bcpb:transition-all bcpb:duration-200">
          <span class="bcpb:flex bcpb:items-center bcpb:gap-2">
            <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            Mobile
          </span>
        </button>
      </div>
    </div>

    <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
      <!-- Preview Button -->
      <button
          type="button"
          @click="emit('onPreview', true)"
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:bg-white bcpb:border bcpb:border-gray-300 bcpb:rounded-lg hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400 bcpb:transition-all bcpb:duration-200 bcpb:shadow-sm">
        <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        Preview
      </button>

      <!-- Meta Tags Button -->
      <button
          type="button"
          @click="openMetaModal"
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:bg-purple-600 bcpb:text-white bcpb:rounded-lg hover:bcpb:bg-purple-700 focus:bcpb:ring-2 focus:bcpb:ring-purple-500/20 bcpb:transition-all bcpb:duration-200 bcpb:shadow-sm">
        <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
        </svg>
        Meta Tags
      </button>

      <!-- Publish Button -->
      <button
          type="button"
          @click="emit('onSave', $event)"
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:bg-blue-600 bcpb:text-white bcpb:rounded-lg hover:bcpb:bg-blue-700 focus:bcpb:ring-2 focus:bcpb:ring-blue-500/20 bcpb:transition-all bcpb:duration-200 bcpb:shadow-sm">
        <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
        </svg>
        Publish
      </button>
    </div>
  </div>

  <!-- Meta Tags Modal -->
  <div v-if="showMetaModal" class="bcpb:fixed bcpb:inset-0 bcpb:z-50 bcpb:overflow-y-auto">
    <!-- Backdrop -->
    <div
        class="bcpb:fixed bcpb:inset-0 bcpb:bg-black/50 bcpb:backdrop-blur-sm bcpb:transition-opacity"
        @click="closeMetaModal"
    ></div>

    <!-- Modal Container -->
    <div class="bcpb:flex bcpb:min-h-full bcpb:items-center bcpb:justify-center bcpb:p-4">
      <div
          class="bcpb:relative bcpb:w-full bcpb:max-w-2xl bcpb:bg-white bcpb:rounded-xl bcpb:shadow-2xl bcpb:transform bcpb:transition-all">
        <!-- Modal Header -->
        <div class="bcpb:flex bcpb:items-center bcpb:justify-between bcpb:p-6 bcpb:border-b bcpb:border-gray-200">
          <div class="bcpb:flex bcpb:items-center bcpb:gap-3">
            <div
                class="bcpb:w-10 bcpb:h-10 bcpb:bg-purple-100 bcpb:rounded-lg bcpb:flex bcpb:items-center bcpb:justify-center">
              <svg class="bcpb:w-5 bcpb:h-5 bcpb:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
              </svg>
            </div>
            <div>
              <h3 class="bcpb:text-lg bcpb:font-semibold bcpb:text-gray-900">Page Meta Tags</h3>
              <p class="bcpb:text-sm bcpb:text-gray-500">Configure SEO and social media meta tags</p>
            </div>
          </div>
          <button
              @click="closeMetaModal"
              class="bcpb:p-2 bcpb:text-gray-400 hover:bcpb:text-gray-600 hover:bcpb:bg-gray-100 bcpb:rounded-lg bcpb:transition-colors bcpb:duration-200"
          >
            <svg class="bcpb:w-5 bcpb:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="bcpb:p-6 bcpb:space-y-6">
          <MetaComponent></MetaComponent>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>