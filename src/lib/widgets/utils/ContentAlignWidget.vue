<script setup lang="ts">
import OptionWidget from "../OptionWidget.vue";

const model = defineModel();

const updateModel = (alignment: 'start' | 'end' | 'center' | 'between') => {
  model.value = alignment;
}
</script>

<template>
  <option-widget title="Text Align" align="vertical">
    <div class="bc-btn-group">
      <div @click="updateModel('start')"
           :class="{'active' : model === 'start'}">
        Left
      </div>
      <div @click="updateModel('center')"
           :class="{'active' : model === 'center'}">
        Center
      </div>
      <div @click="updateModel('end')"
           :class="{'active' : model === 'end'}">
        Right
      </div>
    </div>
  </option-widget>
</template>

<style scoped>
.bc-btn-group {
  display               : grid;
  grid-template-columns : repeat(3, minmax(0, 1fr));
  border-radius         : 6px;

  div {
    cursor     : pointer;
    background : #cccccca1;
    text-align : center;
    font-size  : 13px;
    height : 34px;
    line-height: 34px;
    &.active {
      background : #ff4500;
      color      : white;
    }

  }
}
</style>