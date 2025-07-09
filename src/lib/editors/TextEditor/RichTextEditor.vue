<script setup lang="ts">

import {BubbleMenu, Editor, EditorContent} from "@tiptap/vue-3";
import {StarterKit} from "@tiptap/starter-kit";
import {Placeholder} from "@tiptap/extension-placeholder";
import {onBeforeUnmount, onMounted} from "vue";
import {TextStyle} from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import EditorMenu from "./EditorMenu.vue";
import {TextAlign} from "@tiptap/extension-text-align";

interface Props {
  bubbleMenu?: boolean
}

const model = defineModel()


withDefaults(defineProps<Props>(), {
  bubbleMenu: true
})


const editor = new Editor({
  content: model.value || "",
  extensions: [StarterKit, Placeholder.configure({
    placeholder: "Write something ...",
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'my-custom-is-empty-class',
  }), TextStyle, Color,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    })],
  onUpdate: ({editor}) => {
    model.value = editor.getHTML()
  }
})

onBeforeUnmount(() => {
  editor.destroy()
})

// Tippy options to prevent bubble menu from being clipped
const bubbleMenuOptions = {
  duration: 100,
  appendTo: () => document.body, // Append to body to avoid overflow clipping
  interactive: true, // Keep menu interactive
  hideOnClick: false, // Don't hide on click inside menu
  placement: 'top' as const,
  offset: [0, 10] as [number, number],
  zIndex: 9999, // High z-index to ensure visibility
  boundary: 'viewport' as const, // Use viewport as boundary
  flip: true, // Flip if no space
  preventOverflow: true, // Prevent overflow
}


</script>

<template>

  <bubble-menu :editor="editor" :tippy-options="bubbleMenuOptions" v-if="bubbleMenu">
    <EditorMenu :editor="editor" :bubble-menu="bubbleMenu"/>
  </bubble-menu>

  <div v-else>
    <EditorMenu :editor="editor" :bubble-menu="bubbleMenu"/>
  </div>


  <editor-content :editor="editor"/>
</template>

<style scoped lang="scss">
.bc-page-builder-dropdown {
  position: relative;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.28);
  }

  &.is-active {
    background-color: rgba(0, 0, 0, 0.28);
  }

  .dropdown-title {
    padding: 3px 10px 0 10px;
    font-size: 15px;
  }

  .dropdown-items {
    position: absolute;
    background-color: red;
    z-index: 1;
    display: none;


  }
}

/* Global override */
::v-deep(.tippy-box .tippy-content) {
  padding: 3px !important;
  background-color: white !important;
}
</style>