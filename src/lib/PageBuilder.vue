<script setup lang="ts">

import {usePageBuilder} from "./PageBuilder.ts";
import {previewComponentMap, previewOptionMap} from "./utils/registry.ts";
import {onMounted, ref, Ref, watchEffect} from "vue";
import {useLoadCSS} from "./useLoadCSS.ts";
import SideBar from "./layouts/SideBar.vue";
import PagePreview from "./PagePreview.vue";
import {Block} from "./utils/types.ts";

interface Props {
  cssUrl?: string;
  renderList?: Block[],
  meta?: Array<Record<string, string>>,
  pageTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  cssUrl: '',
})

const emit = defineEmits<{
  (event: 'onSave', value: any): void,
}>()

const {
  meta,
  renderList,
  dragOverIndex,
  dragOverDropZone,
  selectedOptionComponent,
  dragOverChildElement,
  onDrop,
  onDropChildElement,
  onDragLeave,
  onDragOver,
  startDragItem,
  onDragOverItem,
  onDragOverChildElement,
  onItemSelect,
  onSelectFormChildElement,
  onDelete
} = usePageBuilder()

const {loadCSS} = useLoadCSS()


onMounted(() => {
  loadCSS(props.cssUrl)
})

watchEffect(() => {
  renderList.value = props.renderList ? [...props.renderList] : []
  meta.value = props.meta ? [...props.meta] : []
})

const exportPage = ($event: Event) => {
  $event.preventDefault();
  emit('onSave', {'renderList': renderList.value, 'meta': meta.value})
}

const isPreview: Ref<boolean> = ref(false);


</script>

<template>
  <div class="bc-page-builder">
    <div class="bc-page-builder--content">
      <SideBar></SideBar>

      <div class="bc-page-builder--preview">

        <div class="bc-page-builder--preview--header">
          <div class="main-title" style="text-align: left">
            <span class="icon-binary-castle-icon" title="BinaryCastle">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </span> - Page builder

            <span v-if="pageTitle">
              - [{{ pageTitle }}]
            </span>
          </div>

          <div class="item">
            <!--            <div class="devices bc-button-group">-->
            <!--              <button>-->
            <!--                <span class="icon-laptop"></span>-->
            <!--              </button>-->
            <!--              <button>-->
            <!--                <span class="icon-tablet"></span>-->
            <!--              </button>-->
            <!--              <button>-->
            <!--                <span class="icon-phone"></span>-->
            <!--              </button>-->
            <!--            </div>-->
          </div>

          <div class="item" style="text-align: right">
            <button class="bc-button" style="margin-right: 10px" @click="isPreview = true">
              <span class="icon-eye"></span>
            </button>
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
                         :inEditor="true"
                         @onSelectChildElement="onSelectFormChildElement"
                         @onDragOverChildElement="onDragOverChildElement"
                         @onDropChildElement="onDropChildElement"
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

  <div v-if="isPreview" class="preview-popup">
    <button class="bc-button bg-white close-button" @click="isPreview = false">
      <span class="icon-x-lg"></span>
    </button>
    <PagePreview :renderList="renderList"></PagePreview>
  </div>
</template>

<style scoped lang="scss">
.preview-popup {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 1000;

  .close-button {
    position: absolute;
    right: 10px;
    top: 10px;
    transition: all 0.3s ease-in-out;
    z-index: 9999999999;

    &:hover {
      box-shadow: -7px 3px 28px -10px rgba(0, 0, 0, 0.75);
    }
  }
}
</style>