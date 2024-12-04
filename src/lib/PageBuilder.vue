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
  console.log('Parent index', block)
  if (block) {
    console.log(block)
    optionsComponent.value = block
  }
}


const onItemClick = (block: Block): void => {
  optionsComponent.value = block
}

onMounted(() => {
  loadCSS(props.cssUrl)
})

const onDelete = ($event: boolean) => {
  if (optionsComponent.value?.id && $event) {
    const index = renderList.value.findIndex((block) => block.id === optionsComponent.value?.id);
    if (index !== -1) {
      renderList.value.splice(index, 1);
      optionsComponent.value = null
      return
    }

    renderList.value.forEach((block: Block) => {
      if (block.children) {
        if (Array.isArray(block.children)) {
          const childIndex = block.children.findIndex((block) => block.id === optionsComponent.value?.id);
          if (childIndex !== -1) {
            block.children.splice(childIndex, 1); // Remove the block
            optionsComponent.value = null
            return true;
          }
        } else if (typeof block.children === 'object') {
          for (const key in block.children) {
            const childIndex = block.children[key].findIndex((block) => block.id === optionsComponent.value?.id);
            if (childIndex !== -1) {
              block.children[key].splice(childIndex, 1); // Remove the block
              optionsComponent.value = null
              return true;
            }
          }
        }
      }
    })
  }
}

const exportPage = ($event: Event) => {
  $event.preventDefault();
  console.log(renderList.value)
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
              <component :is="previewComponentMap[block.name]"
                         :blockInfo="block"
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