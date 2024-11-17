<script setup lang="ts">
import {ButtonBlock} from "../../utils/blocks/ButtonBlock.ts";
import BasePreview from "../BasePreview.vue";
import OptionWidget from "../widgets/OptionWidget.vue";

interface Props {
  blockInfo: ButtonBlock
}

const props = defineProps<Props>()


</script>

<template>

  <BasePreview>
    <button :class="blockInfo.options.styleClass">{{ blockInfo.options.text }}</button>

    <template v-slot:options>
      <h2>Button</h2>

      <option-widget title="Text">
        <input type="text" v-model="blockInfo.options.text">
      </option-widget>

      <option-widget title="Style Class">
        <input type="text" v-model="blockInfo.options.styleClass">
      </option-widget>


    </template>
  </BasePreview>


</template>

<style scoped>

</style>