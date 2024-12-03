<script setup lang="ts">

import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
</script>

<template>
  <BaseOption title="Text">

    <option-widget title="Has Container">
      <input type="checkbox">
    </option-widget>

    <option-widget title="Background Color">
      <input type="color">
    </option-widget>

    <option-widget title="Background Image">
      <input type="url" class="form-control" placeholder="Apply Image URL">
    </option-widget>

    <option-widget title="CSS Class" align="vertical" :is-expandable="true">
      <textarea class="form-control"></textarea>
    </option-widget>

    <option-widget title="Style" align="vertical" :is-expandable="true">
      <CodeMirrorEditor></CodeMirrorEditor>
    </option-widget>
  </BaseOption>
</template>

<style scoped>

</style>