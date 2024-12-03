<script setup lang="ts">

import {BubbleMenu, Editor, EditorContent} from "@tiptap/vue-3";
import {StarterKit} from "@tiptap/starter-kit";

const model = defineModel()


const editor = new Editor({
  content: model.value || "",
  extensions: [StarterKit],
  onUpdate: ({editor}) => {
    model.value = editor.getHTML()
  }
})
</script>

<template>
  <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }">
    <div class="bubble-menu">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-bold"
             viewBox="0 0 16 16">
          <path
              d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
        </svg>
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-italic"
             viewBox="0 0 16 16">
          <path
              d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
        </svg>
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-type-strikethrough" viewBox="0 0 16 16">
          <path
              d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.8 2.8 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967"/>
        </svg>
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('strike') }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul"
             viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        </svg>
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'is-active': editor.isActive('strike') }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ol"
             viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
          <path
              d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z"/>
        </svg>
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{ 'is-active': editor.isActive('strike') }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-blockquote-left"
             viewBox="0 0 16 16">
          <path
              d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm.79-5.373q.168-.117.444-.275L3.524 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562Q2 7.587 2 7.969q0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282q.036-.305.123-.498a1.4 1.4 0 0 1 .252-.37 2 2 0 0 1 .346-.298zm2.167 0q.17-.117.445-.275L5.692 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562q-.165.31-.164.692 0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282a1.8 1.8 0 0 1 .118-.492q.087-.194.257-.375a2 2 0 0 1 .346-.3z"/>
        </svg>
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
              :class="{ 'is-active': editor.isActive('strike') }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-braces"
             viewBox="0 0 16 16">
          <path
              d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6M13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6"/>
        </svg>
      </button>
    </div>
  </bubble-menu>
  <editor-content :editor="editor"/>
</template>

<style scoped lang="scss">
.bubble-menu {
  border-radius: 15px;
  padding: 3px;
  background-color: #ffffff;
  box-shadow: 3px 3px 16px -7px rgba(0, 0, 0, 0.75);

  button {
    border: none;
    background: none;
    transition: all 0.3s;
    outline: none;
    padding: 1px 10px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.28);
    }

    &.is-active {
      background-color: rgba(0, 0, 0, 0.28);
    }

    &:last-child {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }

    &:first-child {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }
  }
}

.rich-text-editor .ProseMirror:focus-visible {
  outline: none;
}

.rich-text-editor .ProseMirror:focus {
  outline: none;
}

</style>