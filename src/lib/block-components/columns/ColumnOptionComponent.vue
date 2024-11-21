<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../widgets/OptionWidget.vue";
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";

interface Props {
  blockInfo: ColumnBlock
}

const props = defineProps<Props>()
</script>

<template>
  <BaseOption title="Column">
    <option-widget title="Columns">
      <input type="number" v-model="blockInfo.options.columns" min="1" max="12" width="100%">
    </option-widget>
  </BaseOption>
</template>

<style scoped>

</style>