<script setup lang="ts">
import {ButtonBlock} from "../../utils/blocks/ButtonBlock.ts";
import BasePreview from "../BasePreview.vue";

interface Props {
  blockInfo: ButtonBlock;
  inEditor?: boolean
}

const props = defineProps<Props>()

const onClick = ($event: Event) => {
  $event.preventDefault();
  if (props.inEditor) {
    return
  }
  if (props.blockInfo.options.buttonAction.type === 'external_link') {
    window.open(props.blockInfo.options.buttonAction.url)
  } else if (props.blockInfo.options.buttonAction.type === 'internal_link') {
    window.open(props.blockInfo.options.buttonAction.url)
  }
}

</script>

<template>

  <BasePreview :inEditor="inEditor" :has-container="blockInfo.options.hasContainer"
               :background-color="blockInfo.options.backgroundColor"
               :background-image="blockInfo.options.backgroundImage">
    <div :style="{'text-align':blockInfo.options.buttonAlign}">
      <button @click="onClick"
              :class="blockInfo.options.styleClass"
              :style="blockInfo.options.styles">
        {{ blockInfo.options.text }}
      </button>
    </div>

  </BasePreview>


</template>

<style scoped>

</style>