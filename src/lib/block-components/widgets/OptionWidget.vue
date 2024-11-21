<script setup lang="ts">
interface Props {
  title: string;
  align?: 'vertical' | 'horizontal';
}

withDefaults(defineProps<Props>(), {
  align: 'horizontal',
})
</script>

<template>
  <div class="bc-page-builder-option-widget" :class="align">
    <div class="bc-page-builder-option-widget-label">{{ title }}</div>
    <div class="bc-page-builder-option-widget-control">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bc-page-builder-option-widget {
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid rgb(238, 238, 238);

  &.vertical {
    flex-direction: column;
    align-items: stretch;

    .bc-page-builder-option-widget-control {
      padding: 10px;
    }
  }

  &:last-child {
    border-bottom: none;
  }

  &-label {
    font-size: 13px;
    font-weight: 500;
    color: rgb(81, 81, 81);
    padding-left: 5px;
    width: 100px;
  }

  &-control {
    max-width: 100%;
    padding-right: 5px;
    overflow: hidden;
  }

}
</style>