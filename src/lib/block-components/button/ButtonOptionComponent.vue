<script setup lang="ts">
import {ButtonBlock} from "../../utils/blocks/ButtonBlock.ts";
import OptionWidget from "../../widgets/OptionWidget.vue";
import BaseOption from "../BaseOption.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import TextAlignWidget from "../../widgets/utils/TextAlignWidget.vue";

interface Props {
  blockInfo: ButtonBlock
}

defineProps<Props>()

</script>

<template>
  <BaseOption title="Button">
    <div class="options">
      <option-widget title="Text">
        <input type="text" v-model="blockInfo.options.text">
      </option-widget>

      <option-widget title="Style Class" align="vertical">
        <textarea v-model="blockInfo.options.styleClass">

        </textarea>
      </option-widget>

      <text-align-widget v-model="blockInfo.options.textAlign"/>

      <option-widget title="Has Container">
        <div style="text-align: left">
          <input type="checkbox">
        </div>
      </option-widget>

      <option-widget title="Styles" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.styles" language="text/css"></CodeMirrorEditor>
      </option-widget>


    </div>
  </BaseOption>


</template>

<style scoped>

</style>