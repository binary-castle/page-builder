<script setup lang="ts">
import {PageBuilder} from "./lib";
// import RichTextEditor from "./lib/editors/RichTextEditor.vue";
// import {registerBlock} from "./lib/utils/blocks/registry.ts";

// registerBlock()

const onSave = (value: any) => {
  console.log(value)
}
</script>

<template>
  <!--  <RichTextEditor></RichTextEditor>-->
  <PageBuilder
               @onSave="onSave"></PageBuilder>
</template>

<style scoped>

</style>
