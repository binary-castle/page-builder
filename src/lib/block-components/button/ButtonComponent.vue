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
    <div :class="[`d-flex justify-content-${blockInfo.options.contentAlign}`]">
      <button :class="blockInfo.options.styleClass"
              :style="[blockInfo.options.styles]">
        {{ blockInfo.options.text }}
      </button>
    </div>
  </BasePreview>


</template>

<style scoped>

</style>