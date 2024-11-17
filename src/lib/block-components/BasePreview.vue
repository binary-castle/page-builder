<script setup lang="ts">

import BaseOption from "./BaseOption.vue";
import {ref, Ref} from "vue";

const showOption: Ref<boolean> = ref(false);

const toggleOption = ($event: Event) => {
  $event.preventDefault();
  showOption.value = !showOption.value
}
</script>

<template>
  <div @click="toggleOption($event)">
    <slot></slot>
  </div>

  <BaseOption v-model="showOption">
    <slot name="options"></slot>
  </BaseOption>
</template>

<style  lang="scss">

</style>