<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {ref, watch} from "vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import ColorWidget from "../../widgets/utils/ColorWidget.vue";
import ContainerPaddingWidget from "../../widgets/utils/ContainerPaddingWidget.vue";
import AcordionWidget from "../../widgets/AcordionWidget.vue";

interface Props {
  blockInfo: ColumnBlock
}

const props = defineProps<Props>()
watch(() => props.blockInfo.options.columns, (newColumnNumber, oldColumnNumber) => {
      if (newColumnNumber === oldColumnNumber) return;
      const columnStyles = props.blockInfo.options.columnStyles;

      if (newColumnNumber > oldColumnNumber) {
        Array.from({length: newColumnNumber - oldColumnNumber}, (_, i) => oldColumnNumber + 1 + i)
            .forEach((index) => {
              columnStyles[index] = {
                cssClasses: '',
                backgroundColor: '',
                backgroundImage: '',
                styles: 'padding: 10px'
              };
            });
      }

      if (newColumnNumber < oldColumnNumber) {
        Array.from({length: oldColumnNumber - newColumnNumber}, (_, i) => oldColumnNumber - i)
            .forEach((index) => {
              delete columnStyles[index];
            });
      }
    }
);

const selectedColumn = ref(1);
const onSelectColumn = (columnIndex: number) => {
  selectedColumn.value = columnIndex
}

</script>

<template>
  <BaseOption title="Column">

    <acordion-widget title="Container">
      <option-widget title="Has Container">
        <input v-model="blockInfo.options.hasContainer" type="checkbox" class="bc-checkbox">
      </option-widget>

      <color-widget title="Background Color" v-model="blockInfo.options.backgroundColor"/>

      <option-widget title="Background image" align="vertical">
        <input type="url" v-model="blockInfo.options.backgroundImage" class="bc-form-control"
               placeholder="Apply Image URL">
      </option-widget>

    </acordion-widget>
    <acordion-widget title="Padding">
      <container-padding-widget v-model="blockInfo.options.padding"/>
    </acordion-widget>

    <acordion-widget title="Style">
      <option-widget title="Column Gap" align="vertical">
          <select v-model="blockInfo.options.gapClass" class="bc-form-control">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
      </option-widget>

      <option-widget title="CSS Class" align="vertical">
        <textarea v-model="blockInfo.options.cssClasses" class="bc-form-control"/>
      </option-widget>

      <option-widget title="Styles" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.styles"/>
      </option-widget>

    </acordion-widget>


    <acordion-widget title="Columns">
      <option-widget title="Columns">
        <input type="number" v-model="blockInfo.options.columns" min="1" max="12" class="bc-form-control">
      </option-widget>
    </acordion-widget>


    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li v-for="(column) of blockInfo.options.columns"
          class="nav-item" role="presentation">
        <button :class="{'active': selectedColumn == column}"
                @click="onSelectColumn(column)" class="nav-link" :id="`column-item-${column}-tab`" data-bs-toggle="pill"
                :data-bs-target="`#column-item-${column}`" type="button" role="tab"
                :aria-controls="`column-item-${column}`"
                aria-selected="true">
          Col {{ column }}
        </button>
      </li>
    </ul>

    <div class="tab-content" id="myTabContent">
      <div v-for="(columnIndex) of blockInfo.options.columns" class="tab-pane fade show"
           :class="{'active': selectedColumn == columnIndex}" :id="`column-item-${columnIndex}`" role="tabpanel"
           :aria-labelledby="`column-item-${columnIndex}-tab`"
           tabindex="0">
        <option-widget title="CSS Class" align="vertical">
          <textarea
              v-model="blockInfo.options.columnStyles[columnIndex].cssClasses"
              class="form-control"></textarea>
        </option-widget>
        <color-widget title="Background Color" v-model="blockInfo.options.columnStyles[columnIndex].backgroundColor"/>
        <option-widget title="Background Image" align="vertical">
          <input type="url" v-model="blockInfo.options.columnStyles[columnIndex].backgroundImage" class="form-control"
                 placeholder="Apply Image URL">
        </option-widget>
        <option-widget title="Style" align="vertical" :is-expandable="true">
          <CodeMirrorEditor v-model="blockInfo.options.columnStyles[columnIndex].styles"/>
        </option-widget>
      </div>
    </div>

  </BaseOption>
</template>

<style scoped lang="scss">

</style>