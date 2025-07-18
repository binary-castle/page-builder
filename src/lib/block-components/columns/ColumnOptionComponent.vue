<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {onMounted, ref, watch} from "vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import SliderToggle from "../../controls/SliderToggle.vue";
import ColorInput from "../../controls/ColorInput.vue";
import ResponsiveWidthControl from "../../controls/ResponsiveWidthControl.vue";
import SpacingControl from "../../controls/SpacingControl.vue";

interface Props {
  blockInfo: ColumnBlock
}

const props = defineProps<Props>()

const selectedColumn = ref(1);

const onSelectColumn = (columnIndex: number) => {
  selectedColumn.value = columnIndex
}

onMounted(() => {

})

watch(
    () => props.blockInfo.options.columns,
    (newColumnNumber, oldColumnNumber) => {
      if (newColumnNumber === oldColumnNumber) return;

      const columnStyles = props.blockInfo.options.columnStyles;

      if (newColumnNumber > oldColumnNumber) {
        for (let i = oldColumnNumber + 1; i <= newColumnNumber; i++) {
          if (!columnStyles[i]) {
            columnStyles[i] = {
              styleClass: 'bc-page-builder-col',
              backgroundColor: '#ffffff',
              backgroundImage: '',
              styles: 'padding: 10px',
              width: {
                mobile: 'width-100',
                tablet: 'width-100',
                desktop: 'width-33'
              }
            };
          }
        }
      }

      // Remove extra columns
      if (newColumnNumber < oldColumnNumber) {
        for (let i = oldColumnNumber; i > newColumnNumber; i--) {
          delete columnStyles[i];
        }
      }
    }
);
</script>

<template>
  <BaseOption title="Column">
    <!-- Main Column Settings -->
    <div class="bcpb:space-y-1">
      <option-widget title="Has Container">
        <SliderToggle v-model="blockInfo.options.hasContainer"></SliderToggle>
      </option-widget>
      
      <option-widget title="Background Color">
        <ColorInput v-model="blockInfo.options.backgroundColor"></ColorInput>
      </option-widget>
      
      <option-widget title="Background Image" align="vertical">
        <input 
          type="url" 
          placeholder="Apply Image URL" 
          v-model="blockInfo.options.backgroundImage"
          class="bg-page-builder-input"
        >
      </option-widget>

      <option-widget title="Columns">
        <div class="bcpb:flex bcpb:flex-wrap bcpb:gap-2">
          <button
            v-for="colNum in 6"
            :key="colNum"
            @click="blockInfo.options.columns = colNum"
            class="bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:rounded-md bcpb:border bcpb:transition-colors bcpb:duration-200 bcpb:min-w-[60px]"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white bcpb:border-blue-600': blockInfo.options.columns === colNum,
              'bcpb:bg-white bcpb:text-gray-700 bcpb:border-gray-300 hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400': blockInfo.options.columns !== colNum
            }"
          >
            {{ colNum }} Col
          </button>
        </div>
      </option-widget>

      <option-widget title="Container Width" align="vertical">
        <ResponsiveWidthControl 
          v-model="blockInfo.options.containerWidth"
          title="Container Width"
        />
      </option-widget>

      <option-widget title="Container Alignment" align="vertical">
        <div class="bcpb:space-y-3">
          <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
            <h4 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-700">Alignment</h4>
            
            <!-- Breakpoint Tabs -->
            <div class="bcpb:flex bcpb:bg-gray-100 bcpb:rounded-lg bcpb:p-1">
              <button
                v-for="breakpoint in (['mobile', 'tablet', 'desktop'] as const)"
                :key="breakpoint"
                class="bcpb:px-3 bcpb:py-1 bcpb:text-xs bcpb:font-medium bcpb:rounded-md bcpb:transition-colors bcpb:duration-200"
                :class="{
                  'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm': true,
                  'bcpb:text-gray-600 hover:bcpb:text-gray-900': false
                }"
              >
                {{ breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1) }}
              </button>
            </div>
          </div>

          <!-- Alignment Options -->
          <div class="bcpb:grid bcpb:grid-cols-3 bcpb:gap-2">
            <button
              v-for="alignment in ['margin-auto', 'margin-left-auto', 'margin-right-auto']"
              :key="alignment"
              @click="blockInfo.options.containerAlignment.desktop = alignment"
              class="bcpb:px-3 bcpb:py-2 bcpb:text-xs bcpb:font-medium bcpb:rounded-md bcpb:border bcpb:transition-colors bcpb:duration-200"
              :class="{
                'bcpb:bg-blue-600 bcpb:text-white bcpb:border-blue-600': blockInfo.options.containerAlignment.desktop === alignment,
                'bcpb:bg-white bcpb:text-gray-700 bcpb:border-gray-300 hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400': blockInfo.options.containerAlignment.desktop !== alignment
              }"
            >
              {{ alignment === 'margin-auto' ? 'Center' : alignment === 'margin-left-auto' ? 'Right' : 'Left' }}
            </button>
          </div>
        </div>
      </option-widget>

      <option-widget title="Row Spacing" align="vertical">
        <SpacingControl 
          v-model="blockInfo.options.rowSpacing"
          title="Row Spacing"
          type="space-x"
        />
      </option-widget>

      <option-widget title="Styles" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.styles"></CodeMirrorEditor>
      </option-widget>
    </div>

    <!-- Responsive Behavior Settings -->
    <div class="bcpb:mt-6 bcpb:border-t bcpb:border-gray-100 bcpb:pt-4">
      <h3 class="bcpb:text-lg bcpb:font-semibold bcpb:text-gray-900 bcpb:mb-4">Responsive Behavior</h3>
      
      <div class="bcpb:space-y-4">
        <!-- Mobile Settings -->
        <div class="bcpb:space-y-3">
          <h4 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-700">Mobile (Default: Stack)</h4>
          <div class="bcpb:grid bcpb:grid-cols-1 bcpb:gap-3">
            <div>
              <label class="bcpb:block bcpb:text-xs bcpb:font-medium bcpb:text-gray-600 bcpb:mb-1">Behavior</label>
              <select 
                v-model="blockInfo.options.columnResponsive.mobile.behavior"
                class="bcpb:w-full bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:border bcpb:border-gray-300 bcpb:rounded-md"
              >
                <option value="stack">Stack (Single Column)</option>
                <option value="grid">Grid ({{ blockInfo.options.columns }} Columns)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tablet Settings -->
        <div class="bcpb:space-y-3">
          <h4 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-700">Tablet</h4>
          <div class="bcpb:grid bcpb:grid-cols-1 bcpb:gap-3">
            <div>
              <label class="bcpb:block bcpb:text-xs bcpb:font-medium bcpb:text-gray-600 bcpb:mb-1">Behavior</label>
              <select 
                v-model="blockInfo.options.columnResponsive.tablet.behavior"
                class="bcpb:w-full bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:border bcpb:border-gray-300 bcpb:rounded-md"
              >
                <option value="stack">Stack (Single Column)</option>
                <option value="grid">Grid ({{ blockInfo.options.columns }} Columns)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Desktop Settings -->
        <div class="bcpb:space-y-3">
          <h4 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-700">Desktop</h4>
          <div class="bcpb:grid bcpb:grid-cols-1 bcpb:gap-3">
            <div>
              <label class="bcpb:block bcpb:text-xs bcpb:font-medium bcpb:text-gray-600 bcpb:mb-1">Behavior</label>
              <select 
                v-model="blockInfo.options.columnResponsive.desktop.behavior"
                class="bcpb:w-full bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:border bcpb:border-gray-300 bcpb:rounded-md"
              >
                <option value="stack">Stack (Single Column)</option>
                <option value="grid">Grid ({{ blockInfo.options.columns }} Columns)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Column Tabs -->
    <div class="bcpb:mt-6 bcpb:border-t bcpb:border-gray-100 bcpb:pt-4">
      <div class="bcpb:flex bcpb:overflow-x-auto scrollbar-hide bcpb:border-b bcpb:border-gray-200">
        <button
          v-for="column of blockInfo.options.columns" 
          :key="column"
          @click="onSelectColumn(column)"
          class="bcpb:flex-shrink-0 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:border-b-2 bcpb:whitespace-nowrap"
          :class="{
            'bcpb:text-blue-600 bcpb:border-blue-600 bcpb:bg-blue-50': selectedColumn === column,
            'bcpb:text-gray-500 bcpb:border-transparent hover:bcpb:text-gray-700 hover:bcpb:border-gray-300': selectedColumn !== column
          }"
        >
          Column {{ column }}
        </button>
      </div>
    </div>

    <!-- Individual Column Settings -->
    <div class="bcpb:mt-4 bcpb:space-y-1">
      <div class="bcpb:mb-3">
        <h4 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:mb-2">Column {{ selectedColumn }} Settings</h4>
      </div>
      
      <option-widget title="CSS Class" align="vertical">
        <textarea 
          v-model="blockInfo.options.columnStyles[selectedColumn].styleClass"
          rows="2"
          class="bg-page-builder-input bg-page-builder-textarea"
          placeholder="Enter CSS classes..."
        ></textarea>
      </option-widget>
      
      <option-widget title="Background Color">
        <ColorInput v-model="blockInfo.options.columnStyles[selectedColumn].backgroundColor"></ColorInput>
      </option-widget>
      
      <option-widget title="Background Image" align="vertical">
        <input 
          type="url" 
          placeholder="Apply Image URL"
          v-model="blockInfo.options.columnStyles[selectedColumn].backgroundImage"
          class="bg-page-builder-input"
        >
      </option-widget>

      <option-widget title="Column Width" align="vertical">
        <ResponsiveWidthControl 
          v-model="blockInfo.options.columnStyles[selectedColumn].width"
          title="Column Width"
        />
      </option-widget>
      
      <option-widget title="Style" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.columnStyles[selectedColumn].styles"></CodeMirrorEditor>
      </option-widget>
    </div>
  </BaseOption>
</template>

<style scoped>
/* Pure CSS only - no Tailwind utilities */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>