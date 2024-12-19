<script setup lang="ts">

import BasePreview from "../BasePreview.vue";
import RichTextEditor from "../../editors/RichTextEditor.vue";
import {TextBlock} from "../../utils/blocks/TextBlock.ts";

interface Props {
  blockInfo: TextBlock
  inEditor?: boolean
}

defineProps<Props>()

</script>

<template>
  <BasePreview :has-container="blockInfo.options.hasContainer"
               :background-color="blockInfo.options.backgroundColor"
               :background-image="blockInfo.options.backgroundImage"
               :class="blockInfo.options.cssClasses"
               :inEditor="inEditor">
    <RichTextEditor v-model="blockInfo.options.text"></RichTextEditor>
  </BasePreview>
</template>

<style scoped>

</style>