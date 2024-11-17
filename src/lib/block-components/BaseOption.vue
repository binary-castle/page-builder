<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';

// Props
defineProps({
  modelValue: Boolean,
  width: {
    type: String,
    default: '300px',
  },
  height: {
    type: String,
    default: '100%',
  },
});

// Emits
const emit = defineEmits(['update:modelValue']);

// Methods
const close = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <div class="bc-page-builder-offcanvas" :class="{ open: modelValue }" :style="{ width, height }" draggable="false">
    <slot></slot>
    <button class="close-btn" @click="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x"
           viewBox="0 0 16 16">
        <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.bc-page-builder-offcanvas {
  padding: 10px;
  position: fixed;
  top: 0;
  right: -314px;
  height: 100%;
  width: 300px;
  background-color: #fff;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
  transition: right 0.3s ease-in-out;
  display: none;

  &.open {
    display: block;
    right: 0;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;

    &:hover {
      svg {
        box-shadow: 8px 9px 26px -8px rgba(0, 0, 0, 0.54);
      }
    }
  }

}
</style>