<script setup lang="ts">
import {ColumnBlock} from "../../utils/blocks/ColumnBlock.ts";
import {Ref, ref} from "vue";
import {previewComponentMap} from "../../utils/registry.ts";
import {Block} from "../../utils/types.ts";
import BasePreview from "../BasePreview.vue";

interface Props {
  blockInfo: ColumnBlock
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'blockSelectFromChildElement', value: Block): void;
}>();

// const renderList: Ref<Record<number, Array<Block>>> = ref({})

const onDrop = ($event: DragEvent, index: number): void => {
  $event.stopPropagation();
  const droppedItem = $event.dataTransfer?.getData('text/plain')
  if (droppedItem) {
    const parsedItem: Block = JSON.parse(droppedItem);
    if (!props.blockInfo.options.renderList[index]) {
      props.blockInfo.options.renderList[index] = [];
    }
    props.blockInfo.options.renderList[index].push(parsedItem);
  }
}

const onDragOver = ($event: DragEvent): void => {
  console.log("Drag over", $event)
}

const onRenderItemClick = ($event: Event, block: Block): void => {
  emit('blockSelectFromChildElement', $event, block)
}
</script>

<template>
  <BasePreview>
    <div class="row">
      <div v-for="(index) in blockInfo.options.columns" class="col column-item" @drop="onDrop($event, index)"
           @dragenter.prevent @dragleave.prevent @dragover="onDragOver($event)">

        <template v-for="item of blockInfo.options.renderList[index]">
          <component :is="previewComponentMap[item.name]" :blockInfo="item"
                     @click="onRenderItemClick($event,item)"></component>
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

  &:not(:last-child) {
    border-right: 1px dashed blue;
  }

}
</style>