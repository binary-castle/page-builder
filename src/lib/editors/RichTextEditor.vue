<script setup lang="ts">

import {BubbleMenu, Editor, EditorContent} from "@tiptap/vue-3";
import {StarterKit} from "@tiptap/starter-kit";
import {Placeholder} from "@tiptap/extension-placeholder";
import {onBeforeUnmount} from "vue";

const model = defineModel()


const editor = new Editor({
  content: model.value || "",
  extensions: [StarterKit, Placeholder.configure({
    placeholder: "Write something ...",
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'my-custom-is-empty-class',
  })],
  onUpdate: ({editor}) => {
    model.value = editor.getHTML()
  }
})

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<template>

  <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }">
    <div class="bubble-menu">

      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <span class="icon-type-bold"></span>
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <span class="icon-type-italic"></span>
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <span class="icon-type-strikethrough"></span>
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }">
        <span class="icon-list-task"></span>
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'is-active': editor.isActive('orderedList') }">
        <span class="icon-list-ol"></span>
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{ 'is-active': editor.isActive('blockquote') }">
        <span class="icon-blockquote-left"></span>
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
              :class="{ 'is-active': editor.isActive('codeBlock') }">
        <span class="icon-braces"></span>
      </button>
    </div>
  </bubble-menu>
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

.bubble-menu {
  border-radius: 4px;
  padding: 3px;
  background-color: #ffffff;
  box-shadow: 3px 3px 16px -7px rgba(0, 0, 0, 0.75);
  display: flex;

  button {
    border: none;
    background: none;
    transition: all 0.3s;
    outline: none;
    padding: 3px 10px 0 10px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;

    span {
      margin: 0;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.28);
    }

    &.is-active {
      background-color: rgba(0, 0, 0, 0.28);
    }


  }
}


</style>