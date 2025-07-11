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

const closeDropdowns = () => {
  dropDownMenus.value.paragraph = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (!(event.target as Element).closest('.dropdown-container')) {
    closeDropdowns()
  }
}

// Add event listener for click outside
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<template>
  <div class="editor-menu" :class="{'bubble-menu': bubbleMenu, 'fixed-menu': !bubbleMenu}">
    
    <!-- Text Format Dropdown -->
    <div class="dropdown-container bcpb:relative">
      <button 
        @click.stop="dropDownMenus.paragraph = !dropDownMenus.paragraph"
        class="editor-menu-button dropdown-trigger"
        :class="{'active': dropDownMenus.paragraph}"
      >
        <span class="icon-paragraph bcpb:text-sm"></span>
        <svg class="bcpb:w-3 bcpb:h-3 bcpb:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <!-- Dropdown Menu -->
      <div 
        v-show="dropDownMenus.paragraph" 
        class="editor-dropdown-menu"
      >
        <button 
          @click="editor.chain().focus().setParagraph().run(); closeDropdowns()"
          class="editor-dropdown-item"
          :class="{ 'active': editor.isActive('paragraph') }"
        >
          <span class="bcpb:text-sm">Paragraph</span>
        </button>
        <button 
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run(); closeDropdowns()"
          class="editor-dropdown-item"
          :class="{ 'active': editor.isActive('heading', { level: 1 }) }"
        >
          <span class="bcpb:text-lg bcpb:font-bold">Heading 1</span>
        </button>
        <button 
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run(); closeDropdowns()"
          class="editor-dropdown-item"
          :class="{ 'active': editor.isActive('heading', { level: 2 }) }"
        >
          <span class="bcpb:text-base bcpb:font-semibold">Heading 2</span>
        </button>
        <button 
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run(); closeDropdowns()"
          class="editor-dropdown-item"
          :class="{ 'active': editor.isActive('heading', { level: 3 }) }"
        >
          <span class="bcpb:text-sm bcpb:font-medium">Heading 3</span>
        </button>
      </div>
    </div>

    <!-- Separator -->
    <div class="editor-separator"></div>

    <!-- Text Formatting -->
    <div class="editor-button-group">
      <button 
        @click="editor.chain().focus().toggleBold().run()" 
        class="editor-menu-button"
        :class="{ 'active': editor.isActive('bold') }"
        title="Bold"
      >
        <span class="icon-type-bold"></span>
      </button>
      
      <button 
        @click="editor.chain().focus().toggleItalic().run()" 
        class="editor-menu-button"
        :class="{ 'active': editor.isActive('italic') }"
        title="Italic"
      >
        <span class="icon-type-italic"></span>
      </button>
      
      <button 
        @click="editor.chain().focus().toggleStrike().run()" 
        class="editor-menu-button"
        :class="{ 'active': editor.isActive('strike') }"
        title="Strikethrough"
      >
        <span class="icon-type-strikethrough"></span>
      </button>
    </div>

    <!-- Separator -->
    <div class="editor-separator"></div>

    <!-- Lists & Blocks -->
    <div class="editor-button-group">
      <button 
        @click="editor.chain().focus().toggleBulletList().run()"
        class="editor-menu-button"
        :class="{ 'active': editor.isActive('bulletList') }"
        title="Bullet List"
      >
        <span class="icon-list-task"></span>
      </button>
      
      <button 
        @click="editor.chain().focus().toggleOrderedList().run()"
        class="editor-menu-button"
        :class="{ 'active': editor.isActive('orderedList') }"
        title="Numbered List"
      >
        <span class="icon-list-ol"></span>
      </button>
      
      <button 
        @click="editor.chain().focus().toggleBlockquote().run()"
        class="editor-menu-button"
        :class="{ 'active': editor.isActive('blockquote') }"
        title="Blockquote"
      >
        <span class="icon-blockquote-left"></span>
      </button>
      
      <button 
        @click="editor.chain().focus().toggleCodeBlock().run()"
        class="editor-menu-button"
        :class="{ 'active': editor.isActive('codeBlock') }"
        title="Code Block"
      >
        <span class="icon-braces"></span>
      </button>
    </div>

    <!-- Separator -->
    <div class="editor-separator"></div>

    <!-- Color Picker -->
    <div class="editor-color-picker-container">
      <div class="bcpb:relative">
        <input
          type="color"
          @input="(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()"
          :value="editor.getAttributes('textStyle').color || '#000000'"
          class="editor-color-input"
          title="Text Color"
        >
        <div class="editor-color-preview" :style="{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }"></div>
      </div>
    </div>

    <!-- Separator -->
    <div class="editor-separator"></div>

    <!-- Text Alignment -->
    <div class="editor-button-group">
      <button 
        @click="editor.chain().focus().setTextAlign('left').run()"
        class="editor-menu-button"
        :class="{ 'active': editor.isActive({ textAlign: 'left' }) }"
        title="Align Left"
      >
        <span class="icon-text-left"></span>
      </button>
      
      <button 
        @click="editor.chain().focus().setTextAlign('center').run()"
        class="editor-menu-button"
        :class="{ 'active': editor.isActive({ textAlign: 'center' }) }"
        title="Align Center"
      >
        <span class="icon-text-center"></span>
      </button>
      
      <button 
        @click="editor.chain().focus().setTextAlign('right').run()"
        class="editor-menu-button"
        :class="{ 'active': editor.isActive({ textAlign: 'right' }) }"
        title="Align Right"
      >
        <span class="icon-text-right"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Pure CSS only - no Tailwind utilities */
.dropdown-container {
  position: relative;
}

/* Icon adjustments */
.editor-menu-button span {
  font-size: 14px;
}
</style>