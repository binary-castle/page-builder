<script setup lang="ts">
import {Ref, ref} from "vue";

interface Props {
  title: string;
  align?: 'vertical' | 'horizontal';
  isExpandable?: boolean;
}

withDefaults(defineProps<Props>(), {
  align: 'horizontal',
  isExpandable: false
})

const isExpanded: Ref<boolean> = ref(false)

const toggleExpand = ($event: Event) => {
  $event.preventDefault();
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div v-if="isExpanded" class="option-widget-backdrop" role="button" @click="toggleExpand"></div>
  <div class="bc-page-builder-option-widget" :class="align">
    <div class="bc-page-builder-option-widget-label">
      {{ title }}

      <div class="expand-icon" role="button" @click="toggleExpand" v-if="isExpandable">
        <i class="icon-arrows-angle-expand"></i>
      </div>

    </div>
    <div class="bc-page-builder-option-widget-control" :class="{'expanded': isExpanded}">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.option-widget-backdrop {
  background-color: #00000073;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bc-page-builder-option-widget {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  border-bottom: 1px solid rgb(238, 238, 238);

  &.vertical {
    flex-direction: column;
    align-items: stretch;

    .bc-page-builder-option-widget-label {
      width: 95%;
    }

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
    width: 35%;
    display: flex;
    justify-content: space-between;

    .expand-icon {
      cursor: pointer;
    }
  }

  &-control {
    max-width: 100%;
    padding-right: 5px;
    overflow: hidden;
    transition: all 0.3s ease;

    &.expanded {
      position: fixed;
      left: 20%;
      width: 60%;
      top: 10%;
      bottom: 10%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
  }

}
</style>