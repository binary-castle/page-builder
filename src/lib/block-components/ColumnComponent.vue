<script setup lang="ts">
import {ColumnBlock} from "../utils/blocks/ColumnBlock.ts";
import {Ref, ref} from "vue";
import {previewComponentMap} from "../utils/registry.ts";
import {Block} from "../utils/types.ts";

interface Props {
  blockInfo: ColumnBlock
}

defineProps<Props>()

const renderList: Ref<Array<Block>> = ref([])

const onDrop = ($event: DragEvent): void => {
  $event.stopPropagation();
  const droppedItem = $event.dataTransfer?.getData('text/plain')
  if (droppedItem) {
    console.log(JSON.parse(droppedItem))
    renderList.value.push(JSON.parse(droppedItem))
  }
  console.log('drop', droppedItem);
}

const onDragOver = ($event: DragEvent): void => {
  console.log("Drag over", $event)
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        column one

        <div v-for="item of renderList">
          <component :is="previewComponentMap[item.title]" :blockInfo="item"></component>
        </div>

        <div @drop="onDrop($event)" @dragenter.prevent @dragleave.prevent @dragover="onDragOver($event)"
             style="height: 20px; border: 1px dashed blue">
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>