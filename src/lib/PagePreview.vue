<script setup lang="ts">
import {Block} from "./utils/types.ts";
import {previewComponentMap} from "./utils/registry.ts";
import {useLoadCSS} from "./useLoadCSS.ts";
import {onMounted, onUnmounted} from "vue";

interface Props {
  renderList: Block[]
  cssUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  cssUrl: ''
})

const {loadCSS, removeCSS} = useLoadCSS()

onMounted(() => {
  loadCSS(props.cssUrl)
})

onUnmounted(() => {
  removeCSS(props.cssUrl)
})
</script>

<template>
  <div v-for="(block, index) of renderList" :key="`r_item_${index}`">
    <component :is="previewComponentMap[block.name]" :blockInfo="block">

    </component>
  </div>

</template>

<style scoped>

</style>