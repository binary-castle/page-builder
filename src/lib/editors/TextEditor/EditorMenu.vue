<script setup lang="ts">
import {defineProps, ref} from "vue";
import type {Editor} from "@tiptap/vue-3";

defineProps<{
  editor: Editor;
  bubbleMenu: boolean;
}>();

const dropDownMenus = ref({
  paragraph: false
})
</script>

<template>
  <div class="bubble-menu" :class="{'fixed-menu': !bubbleMenu}">

    <div role="button" class="bc-dropdown-button" @click="dropDownMenus.paragraph = !dropDownMenus.paragraph">
      <span class="icon-paragraph" style="font-size: 14px"></span>
      <div class="bc-pg-dropdown-items" :class="{'open' : dropDownMenus.paragraph}">
        <div role="button" class="bc-pg-dropdown-item" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
             :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">Paragraph
        </div>
        <div role="button" class="bc-pg-dropdown-item" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
             :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">Heading 1
        </div>
        <div role="button" class="bc-pg-dropdown-item" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
             :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">Heading 2
        </div>
        <div role="button" class="bc-pg-dropdown-item" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
             :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">Heading 3
        </div>
      </div>
    </div>

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

    <button @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
      <span class="icon-text-left"></span>
    </button>
    <button @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
      <span class="icon-text-center"></span>
    </button>
    <button @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
      <span class="icon-text-right"></span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.bubble-menu {
  border-radius: 4px;
  padding: 3px;
  background-color: #ffffff;
  box-shadow: 3px 3px 16px -7px rgba(0, 0, 0, 0.75);
  display: flex;
  z-index: 10;

  &.fixed-menu {
    box-shadow: none;
    border-bottom: 1px solid #dfdede;
    border-radius: 0;
  }

  .bc-dropdown-button {
    position: relative;
    padding: 7px 10px 0 10px;

    .bc-pg-dropdown-items {
      position: absolute;
      top: 30px;
      left: 0;
      background-color: #ffffff;
      border: 1px solid #dfdede;
      z-index: 1;
      padding: 0;
      box-shadow: 1px 6px 9px 1px #8080805e;
      display: none;

      &.open {
        display: block;
      }

      .bc-pg-dropdown-item {
        padding: 7px 10px;
        text-align: left;
        width: 150px;
        border-bottom: 1px solid #dfdede;
        border-radius: 0;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }


  button, div {
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