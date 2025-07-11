<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import {TextBlock} from "../../utils/blocks/TextBlock.ts";
import SliderToggle from "../../controls/SliderToggle.vue";
import ColorInput from "../../controls/ColorInput.vue";

interface Props {
  blockInfo: TextBlock
}

defineProps<Props>()

</script>

<template>
  <BaseOption title="Text">

    <option-widget title="Has Container">
      <SliderToggle v-model="blockInfo.options.hasContainer"></SliderToggle>
    </option-widget>

    <option-widget title="Background Color">
      <ColorInput v-model="blockInfo.options.backgroundColor"></ColorInput>
    </option-widget>

    <option-widget title="Background Image" align="vertical">
      <input type="url" class="bg-page-builder-input" v-model="blockInfo.options.backgroundImage"
             placeholder="Apply Image URL">
    </option-widget>

    <option-widget title="CSS Class" align="vertical" :is-expandable="true">
      <textarea class="bg-page-builder-input" v-model="blockInfo.options.cssClasses"></textarea>
    </option-widget>

    <option-widget title="Style" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.styles"></CodeMirrorEditor>
    </option-widget>
  </BaseOption>
</template>

<style scoped>

</style>