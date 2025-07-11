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
</script>

<template>
  <div class="bcpb:bg-white bcpb:border bcpb:border-gray-200 bcpb:rounded-lg bcpb:overflow-hidden bcpb:shadow-sm">
    <!-- Editor Header -->
    <div class="bcpb:flex bcpb:items-center bcpb:justify-between bcpb:px-3 bcpb:py-2 bcpb:bg-gray-50 bcpb:border-b bcpb:border-gray-200">
      <div class="bcpb:flex bcpb:items-center bcpb:gap-2">
        <div class="bcpb:flex bcpb:gap-1">
          <div class="bcpb:w-3 bcpb:h-3 bcpb:bg-red-400 bcpb:rounded-full"></div>
          <div class="bcpb:w-3 bcpb:h-3 bcpb:bg-yellow-400 bcpb:rounded-full"></div>
          <div class="bcpb:w-3 bcpb:h-3 bcpb:bg-green-400 bcpb:rounded-full"></div>
        </div>
        <span class="tbcpb:ext-xs bcpb:font-medium bcpb:text-gray-600 bcpb:ml-2">
          {{ getLanguageDisplay(language) }}
        </span>
      </div>
      <div class="bcpb:text-xs bcpb:text-gray-500">
        {{ theme }}
      </div>
    </div>
    
    <!-- Editor Content -->
    <div class="relative">
      <Codemirror 
        v-model:value="model" 
        :options="{ 
          mode: language, 
          theme: theme,
          lineNumbers: true,
          lineWrapping: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          indentUnit: 2,
          tabSize: 2
        }"
        class="editor-container"
      />
    </div>
  </div>
</template>

<style scoped>
/* CodeMirror custom styling */
:deep(.CodeMirror) {
  height: auto;
  min-height: 120px;
  max-height: 400px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.4;
}

:deep(.CodeMirror-scroll) {
  min-height: 120px;
  max-height: 400px;
}

:deep(.CodeMirror-gutters) {
  border-right: 1px solid #3a3a3a;
}

:deep(.CodeMirror-linenumber) {
  color: #6b7280;
  padding: 0 8px;
}

/* Focus state */
:deep(.CodeMirror-focused) {
  outline: none;
}

.editor-container {
  border-radius: 0 0 0.5rem 0.5rem;
  overflow: hidden;
}
</style>