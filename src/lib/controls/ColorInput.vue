<script setup lang="ts">
const model = defineModel()

const onReset = ($event: Event) => {
  $event.preventDefault()
  model.value = 'transparent'
}
</script>

<template>
  <div class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
    <!-- Reset Button -->
    <button 
      @click="onReset"
      class="bcpb:flex-shrink-0 bcpb:w-8 bcpb:h-8 bcpb:flex bcpb:items-center bcpb:justify-center bcpb:text-gray-500 hover:bcpb:text-gray-700 hover:bcpb:bg-gray-200 bcpb:rounded-md bcpb:transition-colors bcpb:duration-200 bcpb:text-sm bcpb:font-medium"
      title="Reset Color"
    >
      ↺
    </button>
    
    <!-- Color Input -->
    <div class="bcpb:relative bcpb:flex-1">
      <input 
        type="color" 
        v-model="model"
        class="bcpb:w-full bcpb:h-8 bcpb:rounded-md bcpb:border-0 bcpb:cursor-pointer bcpb:bg-transparent [&::-webkit-color-swatch-wrapper]:bcpb:p-0 [&::-webkit-color-swatch]:bcpb:border-0 [&::-webkit-color-swatch]:bcpb:rounded-md [&::-moz-color-swatch]:bcpb:border-0 [&::-moz-color-swatch]:bcpb:rounded-md"
      >
      <!-- Color Value Display -->
      <div class="bcpb:absolute bcpb:inset-0 bcpb:pointer-events-none bcpb:flex bcpb:items-center bcpb:justify-center">
        <span class="bcpb:text-xs bcpb:font-mono bcpb:text-white bcpb:mix-blend-difference">
          {{ model === 'transparent' ? 'transparent' : model }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pure CSS only - no Tailwind utilities */
</style>