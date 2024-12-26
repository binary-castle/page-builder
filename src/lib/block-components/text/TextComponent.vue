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
  <BasePreview :inEditor="inEditor"
               :has-container="blockInfo.options.hasContainer"
               :background-color="blockInfo.options.backgroundColor"
               :background-image="blockInfo.options.backgroundImage">
    <template v-if="inEditor">
      <div :class="blockInfo.options.cssClasses" :style="blockInfo.options.styles">
        <RichTextEditor v-model="blockInfo.options.text"></RichTextEditor>
      </div>
    </template>
    <template v-else>
      <div :class="blockInfo.options.cssClasses" :style="blockInfo.options.styles"
           v-html="blockInfo.options.text"></div>
    </template>
  </BasePreview>
</template>

<style scoped>

</style>