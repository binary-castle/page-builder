<script setup lang="ts">
import OptionWidget from "../OptionWidget.vue";

const model = defineModel();

const updateModel = (alignment: 'left' | 'right' | 'center' | 'justify') => {
  model.value = alignment;
}
</script>

<template>
  <option-widget title="Text Align">
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
      <button type="button" @click="updateModel('left')"
              :class="{'active' : model === 'left'}"
              class="btn btn-outline-secondary rounded-0">
        <i class="bi bi-text-left"></i>
      </button>
      <button type="button" @click="updateModel('center')"
              :class="{'active' : model === 'center'}"
              class="btn btn-outline-secondary">
        <i class="bi bi-text-center"></i>
      </button>
      <button type="button" @click="updateModel('right')"
              :class="{'active' : model === 'right'}"
              class="btn btn-outline-secondary">
        <i class="bi bi-text-right"></i>
      </button>
      <button type="button" @click="updateModel('justify')"
              :class="{'active' : model === 'justify'}"
              class="btn btn-outline-secondary rounded-0">
        <i class="bi bi-justify"></i>
      </button>
    </div>
  </option-widget>
</template>

<style scoped>

</style>