<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {ref, watch} from "vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import ColorWidget from "../../widgets/utils/ColorWidget.vue";
import ContainerPaddingWidget from "../../widgets/utils/ContainerPaddingWidget.vue";
import AccordionWidget from "../../widgets/AccordionWidget.vue";

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

    <accordion-widget title="Container">
      <option-widget title="Has Container">
        <input v-model="blockInfo.options.hasContainer" type="checkbox" class="bc-checkbox">
      </option-widget>

      <color-widget title="Background Color" v-model="blockInfo.options.backgroundColor"/>

      <option-widget title="Background image" align="vertical">
        <input type="url" v-model="blockInfo.options.backgroundImage" class="bc-form-control"
               placeholder="Apply Image URL">
      </option-widget>

    </accordion-widget>
    <accordion-widget title="Padding">
      <container-padding-widget v-model="blockInfo.options.padding"/>
    </accordion-widget>

    <accordion-widget title="Style">
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

    </accordion-widget>


    <accordion-widget title="Columns">
      <option-widget title="Columns">
        <input type="number" v-model="blockInfo.options.columns" min="1" max="12" class="bc-form-control">
      </option-widget>

      <div class="bc-nav-tabs">
        <div v-for="(column) of blockInfo.options.columns"
             @click="onSelectColumn(column)"
             class="bc-nav-item"
             :class="{'active': selectedColumn == column}">
          Col {{ column }}
        </div>
      </div>

      <div class="bc-tab-content">
          <div v-for="(columnIndex) of blockInfo.options.columns"
               class="bc-tab-pane"
               :class="{'active': selectedColumn == columnIndex}">

            <div>
              <div>
                <option-widget title="CSS Class" align="vertical">
          <textarea
              v-model="blockInfo.options.columnStyles[columnIndex].cssClasses"
              class="bc-form-control"></textarea>
                </option-widget>

                <color-widget title="Background Color" v-model="blockInfo.options.columnStyles[columnIndex].backgroundColor"/>

                <option-widget title="Background Image" align="vertical">
                  <input type="url" v-model="blockInfo.options.columnStyles[columnIndex].backgroundImage" class="bc-form-control"
                         placeholder="Apply Image URL">
                </option-widget>

                <option-widget title="Style" align="vertical" :is-expandable="true">
                  <CodeMirrorEditor v-model="blockInfo.options.columnStyles[columnIndex].styles"/>
                </option-widget>
              </div>
            </div>
        </div>
      </div>

    </accordion-widget>

  </BaseOption>
</template>

<style scoped lang="scss">
.bc-nav-tabs{
  display : grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  text-align: center;
  gap:8px;
  flex-wrap: wrap;
  padding-left : 8px;
  margin-top : 8px;
  margin-bottom : 8px;
  .bc-nav-item{
    cursor: pointer;
    border:1px solid rgba(0, 0, 0, 0.35);;
    border-radius: 6px;
    padding : 8px 0;
    font-size: 13px;
    &.active,&:hover{
      background : #ff4500;
      border-color: #ff4500;
      color: #ffffff;
    }
  }
}

.bc-tab-content{
  .bc-tab-pane{
    display:grid;
    grid-template-rows: 0fr;
    opacity: 1;
    transition: all .3s;
    &.active{
      grid-template-rows: 1fr;
      opacity: 1;
    }
    :first-child{
      overflow: hidden;
    }
  }
}
</style>