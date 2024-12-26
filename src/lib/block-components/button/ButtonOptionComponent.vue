<script setup lang="ts">
import {ButtonBlock} from "../../utils/blocks/ButtonBlock.ts";
import OptionWidget from "../../widgets/OptionWidget.vue";
import BaseOption from "../BaseOption.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import SliderToggle from "../../controls/SliderToggle.vue";

interface Props {
  blockInfo: ButtonBlock
}

defineProps<Props>()

</script>

<template>
  <BaseOption title="Button">
    <option-widget title="Has Container">
      <SliderToggle v-model="blockInfo.options.hasContainer"></SliderToggle>
    </option-widget>

    <option-widget title="Background Color">
      <input type="color" v-model="blockInfo.options.backgroundColor">
    </option-widget>

    <option-widget title="Background Image" align="vertical">
      <input type="url" v-model="blockInfo.options.backgroundImage" placeholder="Apply Image URL">
    </option-widget>

    <option-widget title="Align">
      <div class="bc-button-group">
        <button @click="blockInfo.options.buttonAlign = 'left'" class="bc-button"
                :class="{'active' : blockInfo.options.buttonAlign == 'left'}">
          <span class="icon-text-left"></span>
        </button>
        <button @click="blockInfo.options.buttonAlign = 'center'" class="bc-button"
                :class="{'active' : blockInfo.options.buttonAlign == 'center'}">
          <span class="icon-text-center"></span>
        </button>
        <button @click="blockInfo.options.buttonAlign = 'right'" class="bc-button"
                :class="{'active' : blockInfo.options.buttonAlign == 'right'}">
          <span class="icon-text-right"></span>
        </button>
      </div>
    </option-widget>


    <div class="options">
      <option-widget title="Text">
        <input type="text" v-model="blockInfo.options.text">
      </option-widget>

      <option-widget title="Style Class" align="vertical">
        <textarea v-model="blockInfo.options.styleClass">

        </textarea>
      </option-widget>


      <option-widget title="Styles" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.styles" language="text/css"></CodeMirrorEditor>
      </option-widget>
    </div>
  </BaseOption>


</template>

<style scoped>

</style>