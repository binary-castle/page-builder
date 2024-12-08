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
  <PageBuilder css-url="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
               @onSave="onSave"></PageBuilder>
</template>

<style scoped>

</style>
