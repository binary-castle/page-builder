<script setup lang="ts">

import BasePreview from "../BasePreview.vue";
import RichTextEditor from "../../editors/RichTextEditor.vue";
import {TextBlock} from "../../utils/blocks/TextBlock.ts";

interface Props {
  blockInfo: TextBlock
}

defineProps<Props>()

</script>

<template>
  <BasePreview draggable="false">
    <RichTextEditor v-model="blockInfo.options.text"></RichTextEditor>
  </BasePreview>
</template>

<style scoped>

</style>