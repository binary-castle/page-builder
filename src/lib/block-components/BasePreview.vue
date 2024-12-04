<script setup lang="ts">
interface Props {
  inEditor?: boolean
}

withDefaults(defineProps<Props>(), {
  inEditor: true
})

</script>

<template>
  <div class="base-preview-item" :class="{'editor': inEditor}">
    <slot></slot>
  </div>

</template>

<style lang="scss" scoped>
.base-preview-item {
  background-color: white;
}

.editor {
  border: 1px dashed rgba(0, 0, 255, 0.38);

  &:hover {
    border-color: rgb(0, 0, 255);
  }
}
</style>