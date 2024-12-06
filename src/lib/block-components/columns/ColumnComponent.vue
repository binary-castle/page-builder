<script setup lang="ts">
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {previewComponentMap} from "../../utils/registry.ts";
import {Block} from "../../utils/types.ts";
import BasePreview from "../BasePreview.vue";
import {v4 as uuidv4} from "uuid";

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


const onDrop = ($event: DragEvent, index: number): void => {
  $event.preventDefault();
  $event.stopPropagation();
  console.log('Dropped on child component', $event)
  const droppedItem = $event.dataTransfer?.getData('text/plain')
  if (droppedItem) {
    const parsedItem: Block = JSON.parse(droppedItem);
    if (parsedItem.children) {
      return
    }
    parsedItem.id = uuidv4()
    if (!props.blockInfo.children[index]) {
      props.blockInfo.children[index] = [];
    }
    props.blockInfo.children[index].push(parsedItem);
  }
  emit('onDropChildElement', true)
  emit('onDragOverChildElement', false)
}

const onDragOver = (): void => {
  emit('onDragOverChildElement', true)
}

const onDragLeave = (): void => {
  emit('onDragOverChildElement', false)
}

const onRenderItemClick = ($event: Event, block: Block): void => {
  $event.stopPropagation();
  // const parentIndex = props.parentIndex
  emit('onSelectChildElement', block)
}

const onDragStart = ($event: DragEvent, block: Block): void => {
  $event.stopPropagation();
  if (block) {
    console.log('drag start inner element')
    $event.dataTransfer?.setData('text/plain', JSON.stringify(block))
  }
}
</script>

<template>
  <BasePreview :inEditor="inEditor">
    <div class="row" style="min-height: 200px; margin: 20px 0">
      <div v-for="(index) in blockInfo.options.columns" class="col"
           :class="{'column-item': inEditor}"
           @drop="onDrop($event, index)"
           @dragenter.prevent
           @dragleave="onDragLeave"
           @dragover="onDragOver">

        <template v-for="item of blockInfo.children[index]">
          <component :is="previewComponentMap[item.name]"
                     :blockInfo="item"
                     :inEditor="inEditor"
                     draggable="true"
                     @dragstart="onDragStart($event, item)"
                     @click="onRenderItemClick($event, item)"></component>
        </template>

      </div>
    </div>
  </BasePreview>

</template>

<style scoped lang="scss">
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
</style>