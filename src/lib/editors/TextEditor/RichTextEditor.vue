<script setup lang="ts">

import {BubbleMenu, Editor, EditorContent} from "@tiptap/vue-3";
import {StarterKit} from "@tiptap/starter-kit";
import {Placeholder} from "@tiptap/extension-placeholder";
import {onBeforeUnmount} from "vue";
import {TextStyle} from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import EditorMenu from "./EditorMenu.vue";

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
  }), TextStyle, Color],
  onUpdate: ({editor}) => {
    model.value = editor.getHTML()
  }
})

onBeforeUnmount(() => {
  editor.destroy()
})

</script>

<template>

  <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="bubbleMenu">
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

</style>