<script setup lang="ts">
import BasePreview from "../BasePreview.vue";
import {HtmlBlock} from "../../utils/blocks/HtmlBlock.ts";
import {onBeforeUnmount, onMounted, ref, watchEffect} from "vue";
import {VHtmlEditor} from "@binarycastle/vue-html-editor"

import '@binarycastle/vue-html-editor/dist/vue-html-editor.css'

interface Props {
  blockInfo: HtmlBlock;
  inEditor?: boolean;
}

const props = defineProps<Props>();

// Unique identifier for each instance
const instanceId = `html-component-${Math.random().toString(36).substr(2, 9)}`;
const styleElement = ref<HTMLStyleElement | null>(null);

// Function to update styles dynamically
const updateStyleElement = (css: string) => {
  // Scope the user-provided CSS by adding the unique instanceId class to all selectors
  const scopedCss = `.${instanceId} { ${css} }`;

  if (!styleElement.value) {
    // Create a new style element only once for this component instance
    styleElement.value = document.createElement('style');
    styleElement.value.type = 'text/css';
    styleElement.value.id = instanceId; // Assign unique ID to the style element
    document.head.appendChild(styleElement.value);
  }
  // Update the content of the style element with the scoped CSS
  styleElement.value.textContent = scopedCss;
};

// On mount, inject styles for the component
onMounted(() => {
  updateStyleElement(props.blockInfo.options.css || '');
});

// Cleanup style element on unmount
onBeforeUnmount(() => {
  if (styleElement.value) {
    document.head.removeChild(styleElement.value);
  }
});

// Watch for changes in CSS and update styles
watchEffect(() => {
  updateStyleElement(props.blockInfo.options.css);
});
</script>

<template>
  <BasePreview :inEditor="inEditor">
    <VHtmlEditor v-if="inEditor" v-model="props.blockInfo.options.html"
                 :css="props.blockInfo.options.css"></VHtmlEditor>
    <div v-else :class="instanceId" v-html="props.blockInfo.options.html"></div>
  </BasePreview>
</template>

<style scoped>
</style>
