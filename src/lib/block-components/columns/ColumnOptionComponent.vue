<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {onMounted, ref, watch} from "vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import SliderToggle from "../../controls/SliderToggle.vue";
import ColorInput from "../../controls/ColorInput.vue";

interface Props {
  blockInfo: ColumnBlock
}

const props = defineProps<Props>()

const selectedColumn = ref(1);

const onSelectColumn = (columnIndex: number) => {
  selectedColumn.value = columnIndex
}

onMounted(() => {

})

watch(
    () => props.blockInfo.options.columns,
    (newColumnNumber, oldColumnNumber) => {
      if (newColumnNumber === oldColumnNumber) return;

      const columnStyles = props.blockInfo.options.columnStyles;

      if (newColumnNumber > oldColumnNumber) {
        for (let i = oldColumnNumber + 1; i <= newColumnNumber; i++) {
          if (!columnStyles[i]) {
            columnStyles[i] = {
              styleClass: 'col',
              backgroundColor: '#ffffff',
              backgroundImage: '',
              styles: 'padding: 10px'
            };
          }
        }
      }

      // Remove extra columns
      if (newColumnNumber < oldColumnNumber) {
        for (let i = oldColumnNumber; i > newColumnNumber; i--) {
          delete columnStyles[i];
        }
      }
    }
);


</script>

<template>
  <BaseOption title="Column">
    <option-widget title="Has Container">
      <SliderToggle v-model="blockInfo.options.hasContainer"></SliderToggle>
    </option-widget>
    <option-widget title="Background Color">
      <ColorInput v-model="blockInfo.options.backgroundColor"></ColorInput>
    </option-widget>
    <option-widget title="Background image" align="vertical">
      <input type="url" placeholder="Apply Image URL" v-model="blockInfo.options.backgroundImage">
    </option-widget>


    <option-widget title="Columns">
      <input type="number" v-model="blockInfo.options.columns" min="1" max="12">
    </option-widget>

    <option-widget title="Styles" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.styles"></CodeMirrorEditor>
    </option-widget>


    <div class="columns-tab">
      <div v-for="column of blockInfo.options.columns" class="tab"
           :class="{'selected': selectedColumn === column}"
           @click="onSelectColumn(column)"
      >
        <p>Column {{ column }}</p>
      </div>
    </div>

    <div class="column-content">
      <option-widget title="CSS Class" align="vertical">
        <textarea v-model="blockInfo.options.columnStyles[selectedColumn].styleClass"></textarea>
      </option-widget>
      <option-widget title="Background Color">
        <ColorInput v-model="blockInfo.options.columnStyles[selectedColumn].backgroundColor"></ColorInput>
      </option-widget>
      <option-widget title="Background Image" align="vertical">
        <input type="url" placeholder="Apply Image URL"
               v-model="blockInfo.options.columnStyles[selectedColumn].backgroundImage">
      </option-widget>
      <option-widget title="Style" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.columnStyles[selectedColumn].styles"></CodeMirrorEditor>
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