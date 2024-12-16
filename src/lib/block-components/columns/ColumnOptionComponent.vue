<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {ref, watch} from "vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";

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
                cssClasses: "",
                backgroundColor: "",
                backgroundImage: "",
                styles: "padding: 10px",
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
    <option-widget title="Has Container">
      <input v-model="blockInfo.options.hasContainer" type="checkbox">
    </option-widget>
    <option-widget title="Background Color" align="vertical">
      <div
          class="d-flex justify-content-between align-items-center gap-2"
      >
        <input
            v-model="blockInfo.options.bgColor"
            type="color"
            class="form-control"
        />
        <div
            class="fs-12"
            type="button"
            @click="blockInfo.options.bgColor = ''"
        >
          Reset
        </div>
      </div>
    </option-widget>
    <option-widget title="CSS Class" align="vertical">
          <textarea
              v-model="blockInfo.options.cssClasses"
              class="form-control"></textarea>
    </option-widget>
    <option-widget title="Column Gap" align="vertical">
      <div
          class="d-flex justify-content-between align-items-center gap-2"
      >
        <select v-model="blockInfo.options.gapClass">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </option-widget>
    <option-widget title="Background image" align="vertical">
      <input type="url" class="form-control" placeholder="Apply Image URL">
    </option-widget>


    <option-widget title="Columns">
      <input type="number" v-model="blockInfo.options.columns" min="1" max="12" class="form-control">
    </option-widget>

    <option-widget title="Styles" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.styles"/>
    </option-widget>

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
        <option-widget title="Background Color" align="vertical">
          <div
              class="d-flex justify-content-between align-items-center gap-2"
          >
            <input
                v-model="blockInfo.options.columnStyles[columnIndex].backgroundColor"
                type="color"
                class="form-control"
            />
            <div
                class="fs-12"
                type="button"
                @click="blockInfo.options.columnStyles[columnIndex].backgroundColor = ''"
            >
              Reset
            </div>
          </div>
        </option-widget>
        <option-widget title="Background Image" align="vertical">
          <input type="url" class="form-control" placeholder="Apply Image URL">
        </option-widget>
        <option-widget title="Style" align="vertical" :is-expandable="true">
          <CodeMirrorEditor v-model="blockInfo.options.columnStyles[columnIndex].styles"/>
        </option-widget>
      </div>
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