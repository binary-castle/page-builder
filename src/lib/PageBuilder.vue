<script setup lang="ts">

import {usePageBuilder} from "./PageBuilder.ts";
import {previewComponentMap, previewOptionMap} from "./utils/registry.ts";
import {onMounted, ref, Ref} from "vue";
import {Block} from "./utils/types.ts";
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
  onDrop,
  onDragLeave,
  onDragOver,
  startDragItem,
  onDragOverItem,
} = usePageBuilder()

const {loadCSS} = useLoadCSS()

const optionsComponent: Ref<Block | null> = ref(null)

const onSelectFormChildElement = (block: Block) => {
  if (block) {
    console.log(block)
    optionsComponent.value = block
  }
}

// const dragOverChildElement: Ref<boolean> = ref(false)
//
// const onDragOverFromChildElement = (value: boolean) => {
//   dragOverChildElement.value = true
//   console.log('drag over at child', value)
// }
//
// const onDropChildElement = (value: boolean) => {
//   console.log('dropped over at child', value)
// }

const onItemClick = (block: Block): void => {
  optionsComponent.value = block
}

onMounted(() => {
  loadCSS(props.cssUrl)
})

const onDelete = ($event: Event) => {
  // $event.preventDefault();
  if (optionsComponent.value) {
    const indexToRemove = renderList.value.indexOf(optionsComponent.value);
    if (indexToRemove != -1) {
      renderList.value.splice(indexToRemove, 1);
      optionsComponent.value = null
    }
  }


}
</script>

<template>
  <div class="bc-page-builder">
    <div class="bc-page-builder--content">
      <SideBar></SideBar>

      <div class="bc-page-builder--preview">

        <div class="bc-page-builder--preview--header">
          <div class="main-title" style="text-align: left">
            Page builder
          </div>

          <div class="item">
            <div class="devices bc-button-group">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-laptop"
                     viewBox="0 0 16 16">
                  <path
                      d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/>
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tablet"
                     viewBox="0 0 16 16">
                  <path
                      d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone"
                     viewBox="0 0 16 16">
                  <path
                      d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="item" style="text-align: right">
            <button class="save-btn bc-button">Save</button>
          </div>
        </div>

        <div class="bc-page-builder--preview--builder">
          <div class="bc-page-builder--preview--builder--drop-zone"
               :class="{'drag-over': dragOverDropZone}"
               @drop="onDrop($event)"
               @dragenter.prevent
               @dragleave.prevent="onDragLeave()"
               @dragover.prevent="onDragOver($event)">

            <div v-for="(block, index) of renderList" draggable="true" :key="`r_item_${index}`"
                 @dragover="onDragOverItem($event, index)"
                 @dragstart="startDragItem($event, block, index)">
              <div :class="{'drag-over': dragOverIndex == index}">
              </div>
              <component :is="previewComponentMap[block.name]" :blockInfo="block"
                         @onSelectChildElement="onSelectFormChildElement"
                         @click="onItemClick(block)"></component>
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
          <div class="bc-page-builder--preview--builder--options" :class="{'open': optionsComponent}">
            <component v-if="optionsComponent"
                       :is="previewOptionMap[optionsComponent.name]"
                       :blockInfo="optionsComponent"
                       @onClose="optionsComponent = null"
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