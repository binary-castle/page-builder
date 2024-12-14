<script setup lang="ts">
import {usePageBuilder} from "../PageBuilder.ts";
import {blockRegistry} from "../utils/registry.ts";

const {startDrag} = usePageBuilder()
</script>

<template>
  <div class="bc-page-builder--blocks-sidebar--blocks">
    <div v-for="(item, index) of blockRegistry" draggable="true"
         class="block"
         @dragstart="startDrag($event, item)"
         :key="`item_${index}`">
      <div class="icon" v-html="item.icon"></div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>