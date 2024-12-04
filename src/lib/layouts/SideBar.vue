<script setup lang="ts">

import {blockRegistry} from "../utils/registry.ts";
import {usePageBuilder} from "../PageBuilder.ts";

const {startDrag} = usePageBuilder()
</script>

<template>
  <div class="bc-page-builder--main-sidebar">
    <div class="bc-page-builder--main-sidebar--item" role="button">
      <span class="icon-tags"></span>
    </div>
    <div class="bc-page-builder--main-sidebar--item active" role="button">
      <span class="icon-box"></span>
    </div>
    <div class="bc-page-builder--main-sidebar--item" role="button">
      <span class="icon-boxes"></span>
    </div>
  </div>

  <div class="bc-page-builder--blocks-sidebar">
    <div class="bc-page-builder--blocks-sidebar--blocks">
      <div v-for="(item, index) of blockRegistry" draggable="true"
           class="block"
           @dragstart="startDrag($event, item)"
           :key="`item_${index}`">
        <div class="icon" v-html="item.icon"></div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>