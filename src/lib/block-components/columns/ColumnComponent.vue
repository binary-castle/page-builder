<script setup lang="ts">
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {previewComponentMap} from "../../utils/registry.ts";
import {Block} from "../../utils/types.ts";
import BasePreview from "../BasePreview.vue";

interface Props {
  blockInfo: ColumnBlock
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'onSelectChildElement', value: Block): void;
  (event: 'onDragOverChildElement', value: boolean): void;
  (event: 'onDropChildElement', value: boolean): void;
}>();

// const renderList: Ref<Record<number, Array<Block>>> = ref({})

const onDrop = ($event: DragEvent, index: number): void => {
  $event.preventDefault();
  $event.stopPropagation();
  console.log('Dropped on child component', $event)
  const droppedItem = $event.dataTransfer?.getData('text/plain')
  if (droppedItem) {
    const parsedItem: Block = JSON.parse(droppedItem);
    if (!props.blockInfo.options.renderList[index]) {
      props.blockInfo.options.renderList[index] = [];
    }
    props.blockInfo.options.renderList[index].push(parsedItem);
  }
  emit('onDropChildElement', true)
}

const onDragOver = ($event: DragEvent): void => {
  // $event.stopPropagation();
  console.log('onDragOver child', $event)
  emit('onDragOverChildElement', true)
}

const onRenderItemClick = ($event: Event, block: Block): void => {
  $event.stopPropagation();
  emit('onSelectChildElement', block)
}

const onDragStart = ($event: DragEvent, block: Block): void => {
  $event.stopPropagation();
  $event.preventDefault();
}
</script>

<template>
  <BasePreview>
    <div class="row" style="height: 200px; margin: 20px 0">
      <div v-for="(index) in blockInfo.options.columns" class="col column-item"
           @drop="onDrop($event, index)"
           @dragenter.prevent
           @dragleave.prevent
           @dragover="onDragOver($event)">

        <template v-for="item of blockInfo.options.renderList[index]">
          <component :is="previewComponentMap[item.name]" :blockInfo="item"
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