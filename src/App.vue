<script setup lang="ts">
import {PageBuilder} from "./lib";
import PageBuilderV2 from "./lib/PageBuilderV2.vue";
// import RichTextEditor from "./lib/editors/RichTextEditor.vue";
// import {registerBlock} from "./lib/utils/blocks/registry.ts";

// registerBlock()

const onSave = (value: any) => {
  console.log(value)
}
</script>

<template>
  <!--  <RichTextEditor></RichTextEditor>-->
  <PageBuilderV2
               @onSave="onSave"></PageBuilderV2>
</template>

<style scoped>

</style>
