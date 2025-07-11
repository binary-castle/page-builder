<script setup lang="ts">
const model = defineModel({
  type: Boolean,
})
</script>

<template>
  <div class="bcpb:inline-flex bcpb:items-center">
    <label class="bcpb:relative bcpb:inline-flex bcpb:items-center bcpb:cursor-pointer">
      <!-- Hidden Checkbox -->
      <input 
        type="checkbox" 
        v-model="model" 
        class="bcpb:sr-only bcpb:peer"
      >
      
      <!-- Toggle Track -->
      <div class="bcpb:relative bcpb:w-11 bcpb:h-6 bcpb:bg-gray-200 bcpb:rounded-full bcpb:transition-colors bcpb:duration-200 bcpb:ease-in-out bcpb:peer-checked:bg-blue-600 bcpb:peer-focus:ring-2 bcpb:peer-focus:ring-blue-300 bcpb:peer-focus:ring-opacity-50"></div>
      
      <!-- Toggle Thumb (direct sibling of input) -->
      <div class="bcpb:absolute bcpb:top-0.5 bcpb:left-0.5 bcpb:w-5 bcpb:h-5 bcpb:bg-white bcpb:rounded-full bcpb:shadow-md bcpb:transform bcpb:transition-transform bcpb:duration-200 bcpb:ease-in-out bcpb:peer-checked:translate-x-5 bcpb:pointer-events-none"></div>
    </label>
  </div>
</template>

<style scoped>
/* Pure CSS only - no Tailwind utilities */
</style>