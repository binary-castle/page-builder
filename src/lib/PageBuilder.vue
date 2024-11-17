<script setup lang="ts">

import {usePageBuilder} from "./PageBuilder.ts";
import {blockRegistry, previewComponentMap} from "./utils/registry.ts";
import {onMounted} from "vue";

const {
  renderList,
  draggedItem,
  dragOverIndex,
  dragOverDropZone,
  startDrag,
  onDrop,
  onDragLeave,
  onDragOver,
  startDragItem,
  onDragOverItem,
} = usePageBuilder()

const props = defineProps({
  cssUrl: {
    type: String,
    default: '',
  }
})

const loadCSS = (url: string) => {
  if (!url) return;
  const linkTag = document.createElement("link");
  linkTag.rel = "stylesheet";
  linkTag.href = url;
  linkTag.onload = () => console.log(`CSS loaded: ${url}`);
  document.head.appendChild(linkTag);
};

onMounted(() => {
  loadCSS(props.cssUrl)
})
</script>

<template>
  <div class="page-builder">
    <div class="content">
      <div class="main-sidebar">
        <div class="item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-tags"
               viewBox="0 0 16 16">
            <path
                d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
            <path
                d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/>
          </svg>
        </div>
        <div class="item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box"
               viewBox="0 0 16 16">
            <path
                d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
          </svg>
        </div>
        <div class="item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-boxes"
               viewBox="0 0 16 16">
            <path
                d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
          </svg>
        </div>
      </div>
      <div class="blocks-sidebar"
           style="height: 100vh; width: 300px;">
        <div class="blocks">
          <div v-for="(item, index) of blockRegistry" draggable="true"
               class="block"
               @dragstart="startDrag($event, item)"
               :key="`item_${index}`">
            <div v-html="item.icon"></div>
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>

      <div class="preview">

        <div class="header">
          <div class="item" style="text-align: left">
            Page builder
          </div>

          <div class="item">
            <div class="devices">
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
            <button class="save-btn">Save</button>
          </div>
        </div>


        <div class="drop-zone"
             :class="{'drag-over': dragOverDropZone}"
             @drop="onDrop($event)"
             @dragenter.prevent @dragleave.prevent="onDragLeave($event)"
             @dragover.prevent="onDragOver($event)">

          <div v-for="(block, index) of renderList" draggable="true" :key="`r_item_${index}`"
               @dragover="onDragOverItem($event, index)"
               @dragstart="startDragItem(block, index)">
            <div :class="{'drag-over': dragOverIndex == index}">
            </div>
            <component :is="previewComponentMap[block.title]" :blockInfo="block"></component>
          </div>


          <div v-if="renderList.length == 0" class="no-item">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor"
                   class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path
                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
              <br>
              There is nothing to preview,
              <br>
              Start dragging an item from the left block or component and drop here
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped lang="scss">

</style>