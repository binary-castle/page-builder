<script setup lang="ts">
import {defineProps} from "vue";
import type {Editor} from "@tiptap/vue-3";

defineProps<{
  editor: Editor;
  bubbleMenu: boolean;
}>();
</script>

<template>
  <div class="bubble-menu" :class="{'fixed-menu': !bubbleMenu}">
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

    <input
        type="color"
        @input="(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()"
        :value="editor.getAttributes('textStyle').color"
    >
  </div>
</template>

<style scoped lang="scss">
.bubble-menu {
  border-radius: 4px;
  padding: 3px;
  background-color: #ffffff;
  box-shadow: 3px 3px 16px -7px rgba(0, 0, 0, 0.75);
  display: flex;

  &.fixed-menu {
    box-shadow: none;
    border-bottom: 1px solid #dfdede;
    border-radius: 0;
  }

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