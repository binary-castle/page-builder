<script setup lang="ts">
import Codemirror from "codemirror-editor-vue3";
import "codemirror/theme/dracula.css";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

interface Props {
  language?: string;
  theme?: string;
}

withDefaults(defineProps<Props>(), {
  language: 'text/css',
  theme: 'dracula'
})

const model = defineModel()

</script>

<template>
  <Codemirror v-model:value="model" :options="{ mode: language, theme: theme }"></Codemirror>
</template>

<style scoped lang="scss">

</style>