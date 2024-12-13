<script setup lang="ts">
import {ButtonBlock} from "../../utils/blocks/ButtonBlock.ts";
import BasePreview from "../BasePreview.vue";

interface Props {
  blockInfo: ButtonBlock;
  inEditor?: boolean
}

defineProps<Props>()


</script>

<template>

  <BasePreview :inEditor="inEditor">
    <button :class="blockInfo.options.styleClass"
            :style="blockInfo.options.styles">
      {{ blockInfo.options.text }}
    </button>
  </BasePreview>


</template>

<style scoped>

</style>