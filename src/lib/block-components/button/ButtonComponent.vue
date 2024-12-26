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

  <BasePreview :inEditor="inEditor" :has-container="blockInfo.options.hasContainer"
               :background-color="blockInfo.options.backgroundColor"
               :background-image="blockInfo.options.backgroundImage">
    <div :style="{'text-align':blockInfo.options.buttonAlign}">
      <button :class="blockInfo.options.styleClass"
              :style="blockInfo.options.styles">
        {{ blockInfo.options.text }}
      </button>
    </div>

  </BasePreview>


</template>

<style scoped>

</style>