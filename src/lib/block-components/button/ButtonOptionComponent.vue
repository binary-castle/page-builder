<script setup lang="ts">
import {ButtonBlock} from "../../utils/blocks/ButtonBlock.ts";
import OptionWidget from "../widgets/OptionWidget.vue";
import BaseOption from "../BaseOption.vue";

interface Props {
  blockInfo: ButtonBlock
}

const props = defineProps<Props>()

</script>

<template>
  <BaseOption title="Button">
    <div class="options">
      <option-widget title="Text">
        <input type="text" class="" v-model="blockInfo.options.text">
      </option-widget>

      <option-widget title="Style Class">
        <textarea class="form-control" v-model="blockInfo.options.styleClass">

        </textarea>
      </option-widget>

      <option-widget title="Align">

      </option-widget>

      <option-widget title="Styles" align="vertical">
        <textarea class="form-control" v-model="blockInfo.options.styles"></textarea>
      </option-widget>

      <option-widget title="Has Container">
        <div style="text-align: left">
          <input type="checkbox">
        </div>
      </option-widget>
    </div>
  </BaseOption>


</template>

<style scoped>

</style>