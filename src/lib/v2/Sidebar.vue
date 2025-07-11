<script setup lang="ts">
import {computed, ref} from 'vue'
import {usePageBuilder} from "../PageBuilder.ts";
import {blockRegistry} from "../utils/registry.ts";
import type {Block} from "../utils/types.ts";

const {startDrag} = usePageBuilder()

// Search functionality
const searchTerm = ref('')

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
               draggable="true" @dragstart="startDrag($event, element)"
               class="drag-item group bcpb:bg-white bcpb:border bcpb:border-gray-100 bcpb:rounded-xl bcpb:p-4 bcpb:cursor-move hover:bcpb:border-blue-200 hover:bcpb:bg-blue-50/50 bcpb:transition-all bcpb:duration-200">
            <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
              <div
                  class="bcpb:w-10 bcpb:h-10 bcpb:bg-gradient-to-br bcpb:from-blue-50 bcpb:to-blue-100 bcpb:rounded-lg bcpb:flex bcpb:items-center bcpb:justify-center">
                <div class="bcpb:text-blue-600" v-html="element.icon"></div>

              </div>
              <div class="bcpb:flex-1">
                <p class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900 group-hover:bcpb:text-blue-900">{{ element.name }}</p>
                <p class="bcpb:text-xs bcpb:text-gray-500 group-hover:bcpb:text-blue-700">{{ element.description }} | {{
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
               draggable="true" @dragstart="startDrag($event, element)"
               class="drag-item group bcpb:bg-white bcpb:border bcpb:border-gray-100 bcpb:rounded-xl bcpb:p-4 bcpb:cursor-move hover:bcpb:border-indigo-200 hover:bcpb:bg-indigo-50/50 bcpb:transition-all bcpb:duration-200">
            <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
              <div
                  class="bcpb:w-10 bcpb:h-10 bcpb:bg-gradient-to-br bcpb:from-indigo-50 bcpb:to-indigo-100 bcpb:rounded-lg bcpb:flex bcpb:items-center bcpb:justify-center">
                <svg class="bcpb:w-5 bcpb:h-5 bcpb:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                </svg>
              </div>
              <div class="bcpb:flex-1">
                <p class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900 group-hover:bcpb:text-blue-900">{{ element.name }}</p>
                <p class="bcpb:text-xs bcpb:text-gray-500 group-hover:bcpb:text-blue-700">
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
               draggable="true" @dragstart="startDrag($event, element)"
               class="drag-item group bcpb:bg-white bcpb:border bcpb:border-gray-100 bcpb:rounded-xl bcpb:p-4 bcpb:cursor-move hover:bcpb:border-teal-200 hover:bcpb:bg-teal-50/50 bcpb:transition-all bcpb:duration-200">
            <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
              <div
                  class="bcpb:w-10 bcpb:h-10 bcpb:bg-gradient-to-br bcpb:from-teal-50 bcpb:to-teal-100 bcpb:rounded-lg bcpb:flex bcpb:items-center bcpb:justify-center">
                <svg class="bcpb:w-5 bcpb:h-5 bcpb:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </div>
              <div class="bcpb:flex-1">
                <p class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900 group-hover:bcpb:text-teal-900">Header</p>
                <p class="bcpb:text-xs bcpb:text-gray-500 group-hover:bcpb:text-teal-700">Page header</p>
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

</style>