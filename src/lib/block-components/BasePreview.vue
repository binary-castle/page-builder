<script setup lang="ts">
interface Props {
  inEditor?: boolean
  hasContainer?: boolean
  backgroundColor?: string | null
  backgroundImage?: string | null
}

withDefaults(defineProps<Props>(), {
  inEditor: true,
  hasContainer: false,
  backgroundImage: null,
  backgroundColor: null
})

</script>

<template>
  <div class="base-preview-item" :class="{'editor': inEditor}"
       :style="{
    'background-image': backgroundImage ? 'url(' + backgroundImage + ')' : '',
    'background-color': backgroundColor ? backgroundColor : 'transparent',
  }">
    <div v-if="hasContainer" class="container">
      <slot></slot>
    </div>
    <slot v-else></slot>
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