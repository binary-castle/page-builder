<script setup lang="ts">
const model = defineModel({
  type: Boolean,
})
</script>

<template>
  <div class="slider-wrapper">
    <label class="slider">
      <input type="checkbox" v-model="model">
      <span class="slider-track"></span>
    </label>
  </div>
</template>

<style scoped>


</style>