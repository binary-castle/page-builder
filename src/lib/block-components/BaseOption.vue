<script setup lang="ts">
import {ref, Ref} from "vue";

defineProps<{
  title: string,
  hasContainer?: boolean,
  backgroundColor?: string,
  backgroundImage?: string
}>()

const emit = defineEmits<{
  (event: 'onClose', state: boolean): void,
  (event: 'onDelete', state: boolean): void,
}>()

const showDeletePopup: Ref<boolean> = ref(false)

const closeOptionDrawer = ($event: Event) => {
  $event.preventDefault()
  emit('onClose', true)
}

const onDeleteItem = ($event: Event) => {
  $event.preventDefault()
  emit('onDelete', true)
}
</script>

<template>
  <div class="bcpb:h-full bcpb:flex bcpb:flex-col bcpb:bg-white">
    <!-- Header -->
    <div class="bcpb:flex bcpb:items-center bcpb:justify-between bcpb:px-4 bcpb:py-3 bcpb:border-b bcpb:border-gray-100 bcpb:bg-gray-50/50">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <button
            @click="closeOptionDrawer($event)"
            class="bcpb:p-2 bcpb:text-gray-400 hover:bcpb:text-gray-600 hover:bcpb:bg-gray-100 bcpb:rounded-md bcpb:transition-colors bcpb:duration-200"
            title="Back"
        >
          <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h3 class="bcpb:text-md bcpb:font-semibold bcpb:text-gray-900 bcpb:truncate">
          {{ title }}
        </h3>
      </div>
      <div class="bcpb:flex bcpb:items-center bcpb:gap-1">
        <button
            @click="showDeletePopup = true"
            type="button"
            class="bcpb:px-4 bcpb:py-2 bcpb:text-red-500 hover:bcpb:text-red-700 hover:bcpb:bg-red-50 bcpb:rounded-md bcpb:transition-colors bcpb:duration-200"
            title="Delete"
        >
          <span class="icon-trash bcpb:text-sm"></span>
        </button>
        <button
            @click="closeOptionDrawer($event)"
            class="bcpb:p-2 bcpb:text-gray-400 hover:bcpb:text-gray-600 hover:bcpb:bg-gray-100 bcpb:rounded-md bcpb:transition-colors bcpb:duration-200"
            title="Close"
        >
          <span class="icon-x-lg bcpb:text-sm"></span>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="bcpb:max-h-[calc(100vh-64px)] bcpb:overflow-y-auto bcpb:px-3">
      <slot></slot>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div
      v-if="showDeletePopup"
      class="bcpb:fixed bcpb:inset-0 bcpb:z-50 bcpb:flex bcpb:items-center bcpb:justify-center bcpb:p-4 bcpb:bg-black/20 bcpb:backdrop-blur-sm"
      @click.self="showDeletePopup = false"
  >
    <div class="bcpb:w-full bcpb:max-w-md bcpb:bg-white bcpb:rounded-xl bcpb:shadow-xl bcpb:border bcpb:border-gray-100 bcpb:overflow-hidden">
      <!-- Modal Header -->
      <div class="bcpb:px-6 bcpb:py-4 bcpb:border-b bcpb:border-gray-100">
        <h3 class="bcpb:text-lg bcpb:font-semibold bcpb:text-gray-900">Confirm Deletion</h3>
      </div>

      <!-- Modal Content -->
      <div class="bcpb:px-6 bcpb:py-4">
        <p class="bcpb:text-sm bcpb:text-gray-600 bcpb:leading-relaxed">
          Are you sure you want to delete this item? This action cannot be undone and all changes to this block will be
          permanently lost.
        </p>
      </div>

      <!-- Modal Actions -->
      <div class="bcpb:px-6 bcpb:py-4 bcpb:bg-gray-50 bcpb:border-t bcpb:border-gray-100 bcpb:flex bcpb:justify-end bcpb:gap-3">
        <button
            @click="showDeletePopup = false"
            class="bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:bg-white bcpb:border bcpb:border-gray-300 bcpb:rounded-lg hover:bcpb:bg-gray-50 focus:bcpb:outline-none focus:bcpb:ring-2 focus:bcpb:ring-gray-200 bcpb:transition-colors bcpb:duration-200"
        >
          Cancel
        </button>
        <button
            @click="onDeleteItem($event)"
            class="bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-white bcpb:bg-red-600 bcpb:border bcpb:border-red-600 bcpb:rounded-lg hover:bcpb:bg-red-700 focus:bcpb:outline-none focus:bcpb:ring-2 focus:bcpb:ring-red-200 bcpb:transition-colors bcpb:duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Minimal custom styles - most styling handled by Tailwind */
</style>