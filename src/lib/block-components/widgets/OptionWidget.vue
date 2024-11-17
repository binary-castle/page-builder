<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bc-page-builder-option-widget">
    <div class="bc-page-builder-option-widget-label">{{ title}}</div>
    <div class="bc-page-builder-option-widget-control">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bc-page-builder-option-widget {
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
  border-bottom: 1px solid rgb(238, 238, 238);

  &:last-child {
    border-bottom: none;
  }

  &-label {
    font-size: 13px;
    font-weight: 500;
    color: rgb(81, 81, 81);
  }

}
</style>