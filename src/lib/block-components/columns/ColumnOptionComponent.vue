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
    <div>
      <div v-for="column of blockInfo.options.columns">
        Column {{ column }}
        <option-widget title="Style Class">
          <input type="text" value="col">
        </option-widget>
      </div>
    </div>
  </BaseOption>
</template>

<style scoped>

</style>