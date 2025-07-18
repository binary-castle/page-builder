<script setup lang="ts">
import Codemirror from "codemirror-editor-vue3";
import "codemirror/theme/dracula.css";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

// Import hint/autocomplete addons
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/hint/html-hint.js";

// Import code folding addons
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/xml-fold.js";

// Import additional editing features
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/matchtags.js";

// Import scrollbar addons
import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/scroll/simplescrollbars.css";
import {inject, computed, Ref, ref} from "vue";

interface Props {
  language?: string;
  theme?: string;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'text/css',
  theme: 'dracula',
  fullHeight: false
})

// Inject the fullHeight context from OptionWidget
const optionWidgetFullHeight = inject<Ref<boolean>>('optionWidgetFullHeight', ref(false))

// Compute the actual fullHeight value
const actualFullHeight = computed(() => {
  return props.fullHeight || (optionWidgetFullHeight?.value ?? false)
})

const model = defineModel()

// Get display name for language
const getLanguageDisplay = (lang: string) => {
  const langMap: Record<string, string> = {
    'text/css': 'CSS',
    'text/html': 'HTML',
    'htmlmixed': 'HTML',
    'javascript': 'JavaScript',
    'text/javascript': 'JavaScript'
  }
  return langMap[lang] || 'Code'
}

// Enhanced editor options with autocomplete and folding
const getEditorOptions = (language: string, theme: string) => {
  return {
    mode: language,
    theme: theme,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true,
    matchTags: { bothTags: true },
    indentUnit: 2,
    tabSize: 2,
    // Code folding options
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    // Hint/autocomplete options
    hintOptions: {
      completeSingle: false,
      closeOnUnfocus: false,
      alignWithWord: true,
      closeCharacters: /[\s()\[\]{};:>,]/,
    },
    // Additional options for better UX
    cursorBlinkRate: 530,
    workTime: 200,
    workDelay: 300,
    scrollbarStyle: "simple",
    viewportMargin: 10,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Ctrl-/": "toggleComment",
      "Ctrl-Q": (cm: any) => cm.foldCode(cm.getCursor()),
      "Ctrl-Alt-F": (cm: any) => cm.execCommand("selectAll")
    }
  }
}
</script>

<template>
  <div class="bcpb:bg-white bcpb:border bcpb:border-gray-200 bcpb:rounded-lg bcpb:overflow-hidden bcpb:shadow-sm" :class="{ 'full-height': actualFullHeight }">
    <!-- Editor Header -->
    <div class="bcpb:flex bcpb:items-center bcpb:justify-between bcpb:px-3 bcpb:py-2 bcpb:bg-gray-50 bcpb:border-b bcpb:border-gray-200">
      <div class="bcpb:flex bcpb:items-center bcpb:gap-2">
        <div class="bcpb:flex bcpb:gap-1">
          <div class="bcpb:w-3 bcpb:h-3 bcpb:bg-red-400 bcpb:rounded-full"></div>
          <div class="bcpb:w-3 bcpb:h-3 bcpb:bg-yellow-400 bcpb:rounded-full"></div>
          <div class="bcpb:w-3 bcpb:h-3 bcpb:bg-green-400 bcpb:rounded-full"></div>
        </div>
        <span class="bcpb:text-xs bcpb:font-medium bcpb:text-gray-600 bcpb:ml-2">
          {{ getLanguageDisplay(language) }}
        </span>
      </div>
      <div class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:text-xs bcpb:text-gray-500">
        <span class="bcpb:px-2 bcpb:py-1 bcpb:bg-gray-100 bcpb:rounded bcpb:text-gray-600">
          Ctrl+Space for autocomplete
        </span>
        <span>{{ theme }}</span>
      </div>
    </div>
    
    <!-- Editor Content -->
    <div class="relative" :class="{ 'full-height': actualFullHeight }">
      <Codemirror 
        v-model:value="model" 
        :options="getEditorOptions(language, theme)"
        class="editor-container"
        :class="{ 'full-height': actualFullHeight }"
      />
    </div>
  </div>
</template>

<style scoped>
/* CodeMirror custom styling with improved fonts */
:deep(.CodeMirror) {
  height: auto;
  min-height: 120px;
  max-height: 400px;
  /* Enhanced font stack for better readability */
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Menlo', 'DejaVu Sans Mono', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  /* Better text rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  /* Better cursor visibility */
  caret-color: #61dafb;
}

/* Full height mode - remove height constraints */
.full-height :deep(.CodeMirror) {
  height: 100% !important;
  min-height: 100% !important;
  max-height: none !important;
}

.full-height :deep(.CodeMirror-scroll) {
  min-height: 100% !important;
  max-height: none !important;
}

:deep(.CodeMirror-scroll) {
  min-height: 120px;
  max-height: 400px;
}

:deep(.CodeMirror-gutters) {
  border-right: 1px solid #3a3a3a;
  background-color: #21222c;
}

:deep(.CodeMirror-linenumber) {
  color: #6b7280;
  padding: 0 8px;
  font-size: 12px;
}

/* Enhanced fold gutter styling */
:deep(.CodeMirror-foldgutter) {
  width: 16px;
}

:deep(.CodeMirror-foldgutter-open),
:deep(.CodeMirror-foldgutter-folded) {
  cursor: pointer;
  height: 1.1em;
  text-align: center;
  color: #6b7280;
  font-size: 12px;
}

:deep(.CodeMirror-foldgutter-open:hover),
:deep(.CodeMirror-foldgutter-folded:hover) {
  color: #9ca3af;
}

/* Autocomplete hint styling */
:deep(.CodeMirror-hints) {
  position: absolute;
  z-index: 10;
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 2px;
  border-radius: 6px;
  border: 1px solid #44475a;
  background: #282a36;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  max-height: 20em;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:deep(.CodeMirror-hint) {
  margin: 0;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: pre;
  color: #f8f8f2;
  cursor: pointer;
}

:deep(.CodeMirror-hint-active) {
  background: #44475a;
  color: #50fa7b;
}

/* Focus state */
:deep(.CodeMirror-focused) {
  outline: none;
}

/* Improved selection styling */
:deep(.CodeMirror-selected) {
  background: #44475a;
}

:deep(.CodeMirror-focused .CodeMirror-selected) {
  background: #44475a;
}

/* Better cursor styling */
:deep(.CodeMirror-cursor) {
  border-left: 2px solid #61dafb;
  border-right: none;
  width: 0;
}

/* Matching bracket highlight */
:deep(.CodeMirror-matchingbracket) {
  color: #50fa7b !important;
  background-color: rgba(80, 250, 123, 0.2);
  border-radius: 2px;
}

.editor-container {
  border-radius: 0 0 0.5rem 0.5rem;
  overflow: hidden;
}

.full-height .editor-container {
  height: 100%;
}
</style>