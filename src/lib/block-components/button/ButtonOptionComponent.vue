<script setup lang="ts">
import {ButtonBlock} from "../../utils/blocks/ButtonBlock.ts";
import OptionWidget from "../../widgets/OptionWidget.vue";
import BaseOption from "../BaseOption.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import AccordionWidget from "../../widgets/AccordionWidget.vue";
import ContentAlignWidget from "../../widgets/utils/ContentAlignWidget.vue";

interface Props {
  blockInfo: ButtonBlock
}

defineProps<Props>()

</script>

<template>
  <BaseOption title="Button">
    <accordion-widget title="Button">
      <option-widget title="Text" align="vertical">
        <input type="text" v-model="blockInfo.options.text" class="bc-form-control">
      </option-widget>

      <option-widget title="Style Class" align="vertical">
        <textarea v-model="blockInfo.options.styleClass" class="bc-form-control">

        </textarea>
      </option-widget>

      <content-align-widget v-model="blockInfo.options.contentAlign"/>

<!--      <option-widget title="Has Container">
          <input type="checkbox" class="bc-checkbox">
      </option-widget>-->

      <option-widget title="Styles" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.styles" language="text/css"></CodeMirrorEditor>
      </option-widget>


    </accordion-widget>
  </BaseOption>


</template>

<style scoped>

</style>