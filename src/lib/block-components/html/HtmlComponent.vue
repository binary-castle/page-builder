<script setup lang="ts">

import BasePreview from "../BasePreview.vue";
import {HtmlBlock} from "../../utils/blocks/HtmlBlock.ts";

interface Props {
  blockInfo: HtmlBlock
}

defineProps<Props>()

</script>

<template>
  <BasePreview>
    <div v-html="blockInfo.options.html"></div>
  </BasePreview>
</template>

<style scoped>

</style>