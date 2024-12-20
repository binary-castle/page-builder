<script setup lang="ts">
import {Ref, ref} from "vue";

interface Props {
  title: string;
  isExpandable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isExpandable: true
})

const isExpanded: Ref<boolean> = ref(true)

const toggleExpand = ($event: Event) => {
  $event.preventDefault();
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div class="bc-page-builder-accordion-widget">
    <div class="bc-page-builder-accordion-widget-header">
      <div class="bc-page-builder-accordion-widget-label">
        {{ title }}
      </div>
      <div class="bc-page-builder-accordion-widget-toggle" @click="toggleExpand">
        <span :class="[`${isExpanded? 'icon-chevron-up' : 'icon-chevron-down'}`]"></span>
      </div>
    </div>
    <div class="bc-page-builder-accordion-widget-content" :class="{'expanded': isExpanded}">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.bc-page-builder-accordion-widget {
  border-bottom: 1px solid rgb(238, 238, 238);
  &-header {
    display : flex;
    justify-content: space-between;
    align-items: center;
    gap:4px;
    padding :12px 8px;
    &:hover{
      background : #cccccc50;
    }
  }

  &-label {
    font-weight : 600;
  }

  &-toggle {
    cursor : pointer;
  }
  &-content{
    display:grid;
    grid-template-rows: 0fr;
    opacity: 1;
    transition: all .3s;
    padding: 0 8px;
    &.expanded{
      grid-template-rows: 1fr;
      opacity: 1;
    }
    :first-child{
      overflow: hidden;
    }
  }

}
</style>