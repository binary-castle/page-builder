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
    <div class="bc--page-builder-row" :style="inEditor ? { minHeight: '200px', margin: '20px 0' } : {}">
      <div v-for="(index) in blockInfo.options.columns"
           :style="[
               blockInfo.options.columnStyles[index]?.styles,
               {'background-color': blockInfo.options.columnStyles[index]?.backgroundColor},
               {'background-image': 'url(' + blockInfo.options.columnStyles[index]?.backgroundImage + ')'},
               ]"
           :class="[{'column-item': inEditor, 'column-dragged-over':  dragOverRow === index && inEditor}, blockInfo.options.columnStyles[index]?.styleClass]"
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
}

.bc--page-builder-row div {
  width: 100%;
}


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
</style>