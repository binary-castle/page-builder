<script setup lang="ts">


</script>

<template>
  <div class="base-preview-item preview">
    <slot></slot>
  </div>

</template>

<style lang="scss" scoped>
.base-preview-item {
  background-color: white;
}

.preview {
  border: 1px dashed rgba(0, 0, 255, 0.38);

  &:hover {
    border-color: rgb(0, 0, 255);
  }
}
</style>