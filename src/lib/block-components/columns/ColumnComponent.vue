<script setup lang="ts">
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {previewComponentMap} from "../../utils/registry.ts";
import {Block} from "../../utils/types.ts";
import BasePreview from "../BasePreview.vue";
import {v4 as uuidv4} from "uuid";
import {ref, Ref} from "vue";

interface Props {
  blockInfo: ColumnBlock
  inEditor?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'onSelectChildElement', value: Block): void;
  (event: 'onDragOverChildElement', value: boolean): void;
  (event: 'onDropChildElement', value: boolean): void;
}>();

const dragOverRow: Ref<number | null> = ref(null)
const dragOverColumn: Ref<number | null> = ref(null)
const innerDragElement: Ref<Block | null> = ref(null)
const innerDragColumn: Ref<number | null> = ref(null)
const innerDragElementInbox: Ref<number | null> = ref(null)

// Helper function to get responsive classes based on behavior settings
const getResponsiveClasses = () => {
  const classes = [];
  
  // Get the actual number of columns from the options
  const totalColumns = props.blockInfo.options.columns;
  
  // Mobile behavior
  if (props.blockInfo.options.columnResponsive.mobile.behavior === 'stack') {
    classes.push('mobile-stack');
  } else {
    classes.push('mobile-grid', `mobile-grid-cols-${totalColumns}`);
  }
  
  // Tablet behavior
  if (props.blockInfo.options.columnResponsive.tablet.behavior === 'stack') {
    classes.push('tablet-stack');
  } else {
    classes.push('tablet-grid', `tablet-grid-cols-${totalColumns}`);
  }
  
  // Desktop behavior
  if (props.blockInfo.options.columnResponsive.desktop.behavior === 'stack') {
    classes.push('desktop-stack');
  } else {
    classes.push('desktop-grid', `desktop-grid-cols-${totalColumns}`);
  }
  
  console.log('Total columns:', totalColumns);
  console.log('Responsive classes:', classes);
  return classes.join(' ');
};

const onDrop = ($event: DragEvent, index: number): void => {
  $event.preventDefault();
  $event.stopPropagation();

  console.log('Dropped on child component', $event);
  const droppedItem = $event.dataTransfer?.getData('text/plain');

  if (!droppedItem) return;

  const parsedItem: Block = JSON.parse(droppedItem);

  // If the dropped item has children, exit early
  if (parsedItem.children) return;

  const {value: innerElement} = innerDragElement;
  const {value: innerColumn} = innerDragColumn;
  const {value: innerElementInbox} = innerDragElementInbox;

  // Handle inner drag item
  if (innerElement && innerColumn != null && innerElementInbox != null) {
    console.log("it's an inner drag item dropped");

    props.blockInfo.children[index] = props.blockInfo.children[index] || [];
    const targetColumn = props.blockInfo.children[index];

    // Remove the dragged item from its original location
    props.blockInfo.children[innerColumn].splice(innerElementInbox, 1);

    // Insert the dragged item into the new location
    if (dragOverColumn.value === null) {
      targetColumn.push(parsedItem);
    } else {
      targetColumn.splice(dragOverColumn.value, 0, parsedItem);
    }

    // Reset drag states
    resetInnerDragState();
    return;
  }

  // Handle external drag item
  parsedItem.id = uuidv4();
  props.blockInfo.children[index] = props.blockInfo.children[index] || [];
  const targetColumn = props.blockInfo.children[index];

  if (dragOverColumn.value === null) {
    targetColumn.push(parsedItem);
  } else {
    targetColumn.splice(dragOverColumn.value, 0, parsedItem);
  }

  // Reset drag states
  resetDragStates();

  emit('onDropChildElement', true);
  emit('onDragOverChildElement', false);
};

const resetInnerDragState = () => {
  innerDragElement.value = null;
  innerDragColumn.value = null;
  innerDragElementInbox.value = null;
};

const resetDragStates = () => {
  dragOverRow.value = null;
  dragOverColumn.value = null;
};

const onDragOverRow = (index: number): void => {
  dragOverRow.value = index
  emit('onDragOverChildElement', true)
}

const onDragOverColumn = ($event: DragEvent, index: number): void => {
  console.log('onDragOverColumn', $event)
  console.log('onDragOverColumn', index)
  dragOverColumn.value = index
}

const onDragLeave = (): void => {
  dragOverRow.value = null
  emit('onDragOverChildElement', false)
}

const onRenderItemClick = ($event: Event, block: Block): void => {
  $event.stopPropagation();
  // const parentIndex = props.parentIndex
  emit('onSelectChildElement', block)
}

const onDragStart = ($event: DragEvent, block: Block, columnIndex: number, blockIndex: number): void => {
  $event.stopPropagation();
  if (block) {
    innerDragElement.value = block
    innerDragColumn.value = columnIndex
    innerDragElementInbox.value = blockIndex
    $event.dataTransfer?.setData('text/plain', JSON.stringify(block))
  }
}
</script>

<template>
  <BasePreview :inEditor="inEditor" :has-container="blockInfo.options.hasContainer"
               :background-image="blockInfo.options.backgroundImage"
               :background-color="blockInfo.options.backgroundColor">
    <div class="bc--page-builder-row" 
         :class="[
           // Container width and alignment
           blockInfo.options.containerWidth.desktop,
           blockInfo.options.containerAlignment.desktop,
           // Responsive spacing
           blockInfo.options.rowSpacing.desktop,
           // Responsive behavior classes
           getResponsiveClasses(),
           inEditor ? 'min-h-[200px] my-5' : ''
         ]"
         :style="inEditor ? { minHeight: '200px', margin: '20px 0' } : {}">
      
      <!-- Debug info (only in editor) -->
      <div v-if="inEditor" class="bcpb:mb-2 bcpb:text-xs bcpb:text-gray-500" style="position: absolute; left: 0; top: 0;">
        Mobile: {{ blockInfo.options.columnResponsive.mobile.behavior }} ({{ blockInfo.options.columnResponsive.mobile.columns }} cols) |
        Tablet: {{ blockInfo.options.columnResponsive.tablet.behavior }} ({{ blockInfo.options.columnResponsive.tablet.columns }} cols) |
        Desktop: {{ blockInfo.options.columnResponsive.desktop.behavior }} ({{ blockInfo.options.columnResponsive.desktop.columns }} cols)
      </div>
      
      <div v-for="(index) in blockInfo.options.columns"
           :style="[
               blockInfo.options.columnStyles[index]?.styles,
               {'background-color': blockInfo.options.columnStyles[index]?.backgroundColor},
               {'background-image': 'url(' + blockInfo.options.columnStyles[index]?.backgroundImage + ')'},
               ]"
           :class="[
             blockInfo.options.columnStyles[index]?.styleClass,
             // Responsive column widths
             blockInfo.options.columnStyles[index]?.width?.mobile,
             blockInfo.options.columnStyles[index]?.width?.tablet,
             blockInfo.options.columnStyles[index]?.width?.desktop,
             {'column-item': inEditor, 'column-dragged-over':  dragOverRow === index && inEditor}
           ]"
           @drop="onDrop($event, index)"
           @dragenter.prevent
           @dragleave="onDragLeave"
           @dragover="onDragOverRow(index)">

        <template v-for="(item, columnIndex) of blockInfo.children[index]">
          <div :style="inEditor ? {height: '10px', width: '100%'} : {}"
               :class="{'bg-secondary': dragOverRow === index && dragOverColumn === columnIndex}"></div>
          <component :is="previewComponentMap[item.name]"
                     :blockInfo="item"
                     :inEditor="inEditor"
                     :draggable="!!inEditor"
                     @dragover="onDragOverColumn($event, columnIndex)"
                     @dragstart="onDragStart($event, item, index, columnIndex)"
                     @click="onRenderItemClick($event, item)"></component>
        </template>

      </div>
    </div>
  </BasePreview>

</template>

<style scoped lang="scss">

.bc--page-builder-row {
  display: flex;
  flex-wrap: wrap;
  
  // Default mobile behavior (stack)
  flex-direction: column;
  
  // Container width classes
  &.width-100 { width: 100%; }
  &.width-90 { width: 90%; }
  &.width-80 { width: 80%; }
  &.width-75 { width: 75%; }
  &.width-66 { width: 66.666667%; }
  &.width-60 { width: 60%; }
  &.width-50 { width: 50%; }
  &.width-40 { width: 40%; }
  &.width-33 { width: 33.333333%; }
  &.width-25 { width: 25%; }
  &.width-20 { width: 20%; }
  &.width-10 { width: 10%; }
  
  // Max width classes
  &.max-width-320 { max-width: 320px; }
  &.max-width-480 { max-width: 480px; }
  &.max-width-640 { max-width: 640px; }
  &.max-width-768 { max-width: 768px; }
  &.max-width-1024 { max-width: 1024px; }
  &.max-width-1200 { max-width: 1200px; }
  &.max-width-1400 { max-width: 1400px; }
  &.max-width-1600 { max-width: 1600px; }
  &.max-width-1920 { max-width: 1920px; }
  &.max-width-100 { max-width: 100%; }
  
  // Alignment classes
  &.margin-auto { margin-left: auto; margin-right: auto; }
  &.margin-left-auto { margin-left: auto; }
  &.margin-right-auto { margin-right: auto; }
  
  // Spacing classes
  &.gap-0 { gap: 0; }
  &.gap-4 { gap: 4px; }
  &.gap-8 { gap: 8px; }
  &.gap-12 { gap: 12px; }
  &.gap-16 { gap: 16px; }
  &.gap-20 { gap: 20px; }
  &.gap-24 { gap: 24px; }
  &.gap-32 { gap: 32px; }
  &.gap-40 { gap: 40px; }
  &.gap-48 { gap: 48px; }
  &.gap-56 { gap: 56px; }
  &.gap-64 { gap: 64px; }
  &.gap-80 { gap: 80px; }
  &.gap-96 { gap: 96px; }
  &.gap-112 { gap: 112px; }
  &.gap-128 { gap: 128px; }
  
  // Mobile responsive behavior
  &.mobile-stack {
    flex-direction: column;
  }
  
  &.mobile-grid {
    display: grid;
    flex-direction: unset;
  }
  
  // Mobile grid columns (1-12)
  &.mobile-grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  &.mobile-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  &.mobile-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  &.mobile-grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  &.mobile-grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  &.mobile-grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  &.mobile-grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
  &.mobile-grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
  &.mobile-grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
  &.mobile-grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
  &.mobile-grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
  &.mobile-grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  
  // Tablet responsive behavior (768px and up)
  @media (min-width: 768px) {
    &.tablet-stack {
      flex-direction: column;
    }
    
    &.tablet-grid {
      display: grid;
      flex-direction: unset;
    }
    
    // Tablet grid columns (1-12)
    &.tablet-grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    &.tablet-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    &.tablet-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    &.tablet-grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    &.tablet-grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    &.tablet-grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
    &.tablet-grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
    &.tablet-grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
    &.tablet-grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
    &.tablet-grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
    &.tablet-grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
    &.tablet-grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  }
  
  // Desktop responsive behavior (1024px and up)
  @media (min-width: 1024px) {
    &.desktop-stack {
      flex-direction: column;
    }
    
    &.desktop-grid {
      display: grid;
      flex-direction: unset;
    }
    
    // Desktop grid columns (1-12)
    &.desktop-grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    &.desktop-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    &.desktop-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    &.desktop-grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    &.desktop-grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    &.desktop-grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
    &.desktop-grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
    &.desktop-grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
    &.desktop-grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
    &.desktop-grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
    &.desktop-grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
    &.desktop-grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  }
}

.bc--page-builder-row div {
  width: 100%;
}

// Column width classes
.width-100 { width: 100%; }
.width-90 { width: 90%; }
.width-80 { width: 80%; }
.width-75 { width: 75%; }
.width-66 { width: 66.666667%; }
.width-60 { width: 60%; }
.width-50 { width: 50%; }
.width-40 { width: 40%; }
.width-33 { width: 33.333333%; }
.width-25 { width: 25%; }
.width-20 { width: 20%; }
.width-10 { width: 10%; }

.column-item {
  min-height: 40px;
  border: none;
  padding: 10px 0;
  position: relative;
  z-index: 10;

  &:not(:last-child) {
    border-right: 1px dashed blue;
  }
}

.column-dragged-over {
  border: 1px dashed blue;
}

// Responsive column widths
@media (max-width: 767px) {
  .column-item {
    width: 100% !important;
    border-right: none !important;
    border-bottom: 1px dashed blue;
    
    &:last-child {
      border-bottom: none;
    }
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .column-item {
    &:not(:last-child) {
      border-right: 1px dashed blue;
    }
  }
}
</style>