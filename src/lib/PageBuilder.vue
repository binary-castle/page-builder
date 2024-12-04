<script setup lang="ts">

import {usePageBuilder} from "./PageBuilder.ts";
import {previewComponentMap, previewOptionMap} from "./utils/registry.ts";
import {onMounted, ref, Ref} from "vue";
import {useLoadCSS} from "./useLoadCSS.ts";
import SideBar from "./layouts/SideBar.vue";

const props = defineProps({
  cssUrl: {
    type: String,
    default: '',
  }
})

const {
  renderList,
  dragOverIndex,
  dragOverDropZone,
  selectedOptionComponent,
  onDrop,
  onDragLeave,
  onDragOver,
  startDragItem,
  onDragOverItem,
  onItemSelect,
  onSelectFormChildElement,
  onDelete
} = usePageBuilder()

const {loadCSS} = useLoadCSS()


onMounted(() => {
  loadCSS(props.cssUrl)
})

const exportPage = ($event: Event) => {
  $event.preventDefault();
  console.log(renderList.value)
}

const dragOverChildElement: Ref<boolean> = ref(false)

const onDragOverChildElement = (value: boolean) => {
  dragOverChildElement.value = value
}
</script>

<template>
  <div class="bc-page-builder">
    <div class="bc-page-builder--content">
      <SideBar></SideBar>

      <div class="bc-page-builder--preview">

        <div class="bc-page-builder--preview--header">
          <div class="main-title" style="text-align: left">
            BC - Page builder
          </div>

          <div class="item">
            <div class="devices bc-button-group">
              <button>
                <span class="icon-laptop"></span>
              </button>
              <button>
                <span class="icon-tablet"></span>
              </button>
              <button>
                <span class="icon-phone"></span>
              </button>
            </div>
          </div>

          <div class="item" style="text-align: right">
            <button class="save-btn bc-button" @click="exportPage($event)">
              <span class="icon-floppy"></span> &nbsp; Save
            </button>
          </div>
        </div>

        <div class="bc-page-builder--preview--builder">
          <div class="bc-page-builder--preview--builder--drop-zone"
               :class="{'drag-over': dragOverDropZone && !dragOverChildElement}"
               @drop="onDrop($event)"
               @dragenter.prevent
               @dragleave.prevent="onDragLeave()"
               @dragover.prevent="onDragOver($event)">

            <div v-for="(block, index) of renderList" draggable="true" :key="`r_item_${index}`"
                 @dragover="onDragOverItem($event, index)"
                 @dragstart="startDragItem($event, block, index)">
              <div :class="{'drag-over': dragOverIndex == index && !dragOverChildElement}">
              </div>
              <component :is="previewComponentMap[block.name]"
                         :blockInfo="block"
                         @onSelectChildElement="onSelectFormChildElement"
                         @onDragOverChildElement="onDragOverChildElement"
                         @click="onItemSelect(block)"></component>
            </div>


            <div v-if="renderList.length == 0" class="no-item">
              <div>
                <span class="icon-info" style="font-size: 120px"></span>
                <br>
                There is nothing to preview,
                <br>
                Start dragging an item from the left block or component and drop here
              </div>
            </div>

          </div>
          <div class="bc-page-builder--preview--builder--options" :class="{'open': selectedOptionComponent}">
            <component v-if="selectedOptionComponent"
                       :is="previewOptionMap[selectedOptionComponent.name]"
                       :blockInfo="selectedOptionComponent"
                       @onClose="selectedOptionComponent = null"
                       @onDelete="onDelete"
            ></component>
          </div>
        </div>


      </div>


    </div>
  </div>
</template>

<style scoped lang="scss">

</style>