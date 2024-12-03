<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {ref} from "vue";

interface Props {
  blockInfo: ColumnBlock
}

defineProps<Props>()

const selectedColumn = ref(1);

</script>

<template>
  <BaseOption title="Column">
    <option-widget title="Has Container">
      <input type="checkbox">
    </option-widget>
    <option-widget title="Background Color">
      <input type="color">
    </option-widget>
    <option-widget title="Background image" align="vertical">
      <input type="url" class="form-control" placeholder="Apply Image URL">
    </option-widget>


    <option-widget title="Columns">
      <input type="number" v-model="blockInfo.options.columns" min="1" max="12" class="form-control">
    </option-widget>


    <div class="columns-tab">
      <div v-for="column of blockInfo.options.columns" class="tab"
           :class="{'selected': selectedColumn === column}"
           @click="selectedColumn = column"
      >
        <p>Column {{ column }}</p>
      </div>
    </div>

    <div class="column-content">
      <option-widget title="CSS Class" align="vertical">
        <textarea class="form-control"></textarea>
      </option-widget>
      <option-widget title="Background Color">
        <input type="color">
      </option-widget>
    </div>


  </BaseOption>
</template>

<style scoped lang="scss">
.columns-tab {
  display: flex;
  overflow-x: auto;
  padding: 0;
  gap: 0;
  border-bottom: 1px solid #ddd;

  .tab {
    flex: 0 0 auto;
    padding: 10px 20px;
    background-color: #ffffff;

    border-radius: 0;
    text-align: center;
    border-bottom: 1px solid transparent;
    cursor: pointer;

    &.selected {
      border-bottom: 2px solid #ddd;
    }

    &:hover {
      border-bottom: 2px solid #ddd;
    }

    p {
      font-size: 14px;
      margin-bottom: 0;
    }
  }
}
</style>