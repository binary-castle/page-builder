<script setup lang="ts">
import {computed, ref} from 'vue'
import {usePageBuilder} from "../PageBuilder.ts";
import {blockRegistry} from "../utils/registry.ts";
import type {Block} from "../utils/types.ts";

const {startDrag} = usePageBuilder()

// Search functionality
const searchTerm = ref('')

// Drag state management
const draggedElementId = ref<string | null>(null)

const handleDragStart = (event: DragEvent, element: Block) => {
  draggedElementId.value = element.id || null
  startDrag(event, element)
  
  // Add visual feedback
  ;(event.target as HTMLElement).classList.add('dragging')
}

const handleDragEnd = (event: DragEvent) => {
  draggedElementId.value = null
  
  // Remove visual feedback
  ;(event.target as HTMLElement).classList.remove('dragging')
}

// Computed properties for filtered elements
const filteredBasicElements = computed(() => {
  const elements = blockRegistry.value.filter((el: Block) => el.type === 'element')
  if (!searchTerm.value.trim()) return elements
  
  const search = searchTerm.value.toLowerCase()
  return elements.filter((element: Block) => 
    element.name.toLowerCase().includes(search) || 
    element.description.toLowerCase().includes(search)
  )
})

const filteredLayoutElements = computed(() => {
  const elements = blockRegistry.value.filter((el: Block) => el.type === 'layout')
  if (!searchTerm.value.trim()) return elements
  
  const search = searchTerm.value.toLowerCase()
  return elements.filter((element: Block) => 
    element.name.toLowerCase().includes(search) || 
    element.description.toLowerCase().includes(search)
  )
})

const filteredUIComponents = computed(() => {
  const elements = blockRegistry.value.filter((el: Block) => el.type === 'ui-component')
  if (!searchTerm.value.trim()) return elements
  
  const search = searchTerm.value.toLowerCase()
  return elements.filter((element: Block) => 
    element.name.toLowerCase().includes(search) || 
    element.description.toLowerCase().includes(search)
  )
})
</script>

<template>
  <!-- Right Side - Elements Panel -->
  <div class="bcpb:w-100 bcpb:bg-white bcpb:flex bcpb:flex-col bcpb:border-l bcpb:border-gray-100">
    <!-- Panel Header -->
    <div class="bcpb:px-6 bcpb:py-3 bcpb:border-b bcpb:border-gray-100">
      <h2 class="bcpb:text-xl bcpb:font-semibold bcpb:text-gray-900 bcpb:mb-1">Elements</h2>
      <p class="bcpb:text-sm bcpb:text-gray-600">Drag components to your canvas</p>
    </div>

    <!-- Search -->
    <div class="bcpb:px-6 bcpb:py-4 bcpb:border-b bcpb:border-gray-100">
      <div class="bcpb:relative">
        <input 
          type="text" 
          placeholder="Search elements..."
          v-model="searchTerm"
          class="bcpb:w-full bcpb:px-4 bcpb:py-3 bcpb:pl-11 bcpb:text-sm bcpb:border bcpb:border-gray-200 bcpb:rounded-xl focus:bcpb:outline-none focus:bcpb:ring-2 focus:bcpb:ring-blue-500 focus:bcpb:border-transparent bcpb:bg-gray-50 focus:bcpb:bg-white bcpb:transition-colors">
        <svg class="bcpb:absolute bcpb:left-4 bcpb:top-3.5 bcpb:w-4 bcpb:h-4 bcpb:text-gray-400" fill="none" stroke="currentColor"
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>

    <!-- Elements List -->
    <div class="bcpb:flex-1 bcpb:overflow-y-auto">
      <!-- Basic Elements -->
      <div v-if="filteredBasicElements.length > 0" class="bcpb:px-6 bcpb:py-6">
        <h3 class="bcpb:text-sm bcpb:font-semibold bcpb:text-gray-900 bcpb:mb-4 bcpb:uppercase bcpb:tracking-wide">Basic Elements</h3>
        <div class="bcpb:space-y-3">
          <div v-for="element in filteredBasicElements" :key="element.id"
               draggable="true" @dragstart="handleDragStart($event, element)" @dragend="handleDragEnd"
               class="drag-item group bcpb:bg-white bcpb:border bcpb:border-gray-100 bcpb:rounded-xl bcpb:p-4 bcpb:cursor-grab hover:bcpb:cursor-grab active:bcpb:cursor-grabbing hover:bcpb:border-blue-300 hover:bcpb:bg-gradient-to-r hover:bcpb:from-blue-50/70 hover:bcpb:to-blue-100/50 hover:bcpb:shadow-md hover:bcpb:shadow-blue-100/50 hover:bcpb:-translate-y-1 hover:bcpb:scale-[1.02] bcpb:transition-all bcpb:duration-300 bcpb:ease-out active:bcpb:scale-[0.98] active:bcpb:shadow-lg active:bcpb:shadow-blue-200/60 active:bcpb:border-blue-400">
            <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
              <div
                  class="bcpb:w-10 bcpb:h-10 bcpb:bg-gradient-to-br bcpb:from-blue-50 bcpb:to-blue-100 bcpb:rounded-lg bcpb:flex bcpb:items-center bcpb:justify-center group-hover:bcpb:from-blue-100 group-hover:bcpb:to-blue-200 group-hover:bcpb:shadow-sm bcpb:transition-all bcpb:duration-300">
                <div class="bcpb:text-blue-600 group-hover:bcpb:text-blue-700 group-hover:bcpb:scale-110 bcpb:transition-all bcpb:duration-300" v-html="element.icon"></div>
              </div>
              <div class="bcpb:flex-1">
                <p class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900 group-hover:bcpb:text-blue-900 bcpb:transition-colors bcpb:duration-200">{{ element.title }}</p>
                <p class="bcpb:text-xs bcpb:text-gray-500 group-hover:bcpb:text-blue-700 bcpb:transition-colors bcpb:duration-200">{{ element.description }} | {{
                    element.type
                  }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Layout Elements -->
      <div v-if="filteredLayoutElements.length > 0" class="bcpb:px-6 bcpb:py-6 bcpb:border-t bcpb:border-gray-100">
        <h3 class="bcpb:text-sm bcpb:font-semibold bcpb:text-gray-900 bcpb:mb-4 bcpb:uppercase bcpb:tracking-wide">Layout</h3>
        <div class="bcpb:space-y-3">
          <div v-for="element in filteredLayoutElements" :key="element.id"
               draggable="true" @dragstart="handleDragStart($event, element)" @dragend="handleDragEnd"
               class="drag-item group bcpb:bg-white bcpb:border bcpb:border-gray-100 bcpb:rounded-xl bcpb:p-4 bcpb:cursor-grab hover:bcpb:cursor-grab active:bcpb:cursor-grabbing hover:bcpb:border-indigo-300 hover:bcpb:bg-gradient-to-r hover:bcpb:from-indigo-50/70 hover:bcpb:to-indigo-100/50 hover:bcpb:shadow-md hover:bcpb:shadow-indigo-100/50 hover:bcpb:-translate-y-1 hover:bcpb:scale-[1.02] bcpb:transition-all bcpb:duration-300 bcpb:ease-out active:bcpb:scale-[0.98] active:bcpb:shadow-lg active:bcpb:shadow-indigo-200/60 active:bcpb:border-indigo-400">
            <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
              <div
                  class="bcpb:w-10 bcpb:h-10 bcpb:bg-gradient-to-br bcpb:from-indigo-50 bcpb:to-indigo-100 bcpb:rounded-lg bcpb:flex bcpb:items-center bcpb:justify-center group-hover:bcpb:from-indigo-100 group-hover:bcpb:to-indigo-200 group-hover:bcpb:shadow-sm bcpb:transition-all bcpb:duration-300">
                <svg class="bcpb:w-5 bcpb:h-5 bcpb:text-indigo-600 group-hover:bcpb:text-indigo-700 group-hover:bcpb:scale-110 bcpb:transition-all bcpb:duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                </svg>
              </div>
              <div class="bcpb:flex-1">
                <p class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900 group-hover:bcpb:text-indigo-900 bcpb:transition-colors bcpb:duration-200">{{ element.title }}</p>
                <p class="bcpb:text-xs bcpb:text-gray-500 group-hover:bcpb:text-indigo-700 bcpb:transition-colors bcpb:duration-200">
                  {{ element.description }} | {{ element.type }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Components -->
      <div v-if="filteredUIComponents.length > 0" class="bcpb:px-6 bcpb:py-6 bcpb:border-t bcpb:border-gray-100">
        <h3 class="bcpb:text-sm bcpb:font-semibold bcpb:text-gray-900 bcpb:mb-4 bcpb:uppercase bcpb:tracking-wide">Components</h3>
        <div class="bcpb:space-y-3">
          <div v-for="element in filteredUIComponents" :key="element.id"
               draggable="true" @dragstart="handleDragStart($event, element)" @dragend="handleDragEnd"
               class="drag-item group bcpb:bg-white bcpb:border bcpb:border-gray-100 bcpb:rounded-xl bcpb:p-4 bcpb:cursor-grab hover:bcpb:cursor-grab active:bcpb:cursor-grabbing hover:bcpb:border-teal-300 hover:bcpb:bg-gradient-to-r hover:bcpb:from-teal-50/70 hover:bcpb:to-teal-100/50 hover:bcpb:shadow-md hover:bcpb:shadow-teal-100/50 hover:bcpb:-translate-y-1 hover:bcpb:scale-[1.02] bcpb:transition-all bcpb:duration-300 bcpb:ease-out active:bcpb:scale-[0.98] active:bcpb:shadow-lg active:bcpb:shadow-teal-200/60 active:bcpb:border-teal-400">
            <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
              <div
                  class="bcpb:w-10 bcpb:h-10 bcpb:bg-gradient-to-br bcpb:from-teal-50 bcpb:to-teal-100 bcpb:rounded-lg bcpb:flex bcpb:items-center bcpb:justify-center group-hover:bcpb:from-teal-100 group-hover:bcpb:to-teal-200 group-hover:bcpb:shadow-sm bcpb:transition-all bcpb:duration-300">
                <svg class="bcpb:w-5 bcpb:h-5 bcpb:text-teal-600 group-hover:bcpb:text-teal-700 group-hover:bcpb:scale-110 bcpb:transition-all bcpb:duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </div>
              <div class="bcpb:flex-1">
                <p class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900 group-hover:bcpb:text-teal-900 bcpb:transition-colors bcpb:duration-200">{{ element.title }}</p>
                <p class="bcpb:text-xs bcpb:text-gray-500 group-hover:bcpb:text-teal-700 bcpb:transition-colors bcpb:duration-200">{{ element.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No results message -->
      <div v-if="searchTerm.trim() && filteredBasicElements.length === 0 && filteredLayoutElements.length === 0 && filteredUIComponents.length === 0" 
           class="bcpb:px-6 bcpb:py-12 bcpb:text-center">
        <div class="bcpb:text-gray-400 bcpb:mb-3">
          <svg class="bcpb:w-12 bcpb:h-12 bcpb:mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h3 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900 bcpb:mb-1">No elements found</h3>
        <p class="bcpb:text-sm bcpb:text-gray-500">Try searching for something else</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for drag and drop effects */
.drag-item {
  user-select: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drag-item:active {
  transform: scale(0.98) translateY(2px);
}

/* Additional visual feedback for dragging state */
.drag-item.dragging {
  opacity: 0.5;
  transform: rotate(5deg) scale(1.05);
  z-index: 1000;
}

/* Improve grab cursor */
.drag-item[draggable="true"] {
  cursor: grab;
}

.drag-item[draggable="true"]:active {
  cursor: grabbing;
}

/* Smoother icon transitions */
.drag-item .group-hover\:bcpb\:scale-110 {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>