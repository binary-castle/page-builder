<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import {TextBlock} from "../../utils/blocks/TextBlock.ts";
import ColorWidget from "../../widgets/utils/ColorWidget.vue";
import AcordionWidget from "../../widgets/AcordionWidget.vue";

interface Props {
  blockInfo: TextBlock
}

defineProps<Props>()

</script>

<template>
  <BaseOption title="Text">
    <acordion-widget title="Text">
      <option-widget title="Has Container">
        <input v-model="blockInfo.options.hasContainer" type="checkbox" class="bc-checkbox">
      </option-widget>

      <color-widget title="Background Color" v-model="blockInfo.options.backgroundColor"/>

      <option-widget title="Background image" align="vertical">
        <input type="url" v-model="blockInfo.options.backgroundImage" class="bc-form-control"
               placeholder="Apply Image URL">
      </option-widget>

      <option-widget title="CSS Class" align="vertical" :is-expandable="true">
        <textarea v-model="blockInfo.options.cssClasses" class="bc-form-control"/>
      </option-widget>

      <option-widget title="Style" align="vertical" :is-expandable="true">
        <CodeMirrorEditor></CodeMirrorEditor>
      </option-widget>
    </acordion-widget>
  </BaseOption>
</template>

<style scoped>

</style>