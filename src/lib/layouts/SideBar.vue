<script setup lang="ts">

import {blockRegistry} from "../utils/registry.ts";
import {usePageBuilder} from "../PageBuilder.ts";

const {startDrag, onSidebarCompActive, sidebarActiveComp, meta, singleMeta, addMeta} = usePageBuilder()
</script>

<template>
  <div class="bc-page-builder--main-sidebar">
    <div class="bc-page-builder--main-sidebar--item" @click="onSidebarCompActive('meta')" :class="{'active': sidebarActiveComp=='meta'}" role="button">
      <span class="icon-tags"></span>
    </div>
    <div class="bc-page-builder--main-sidebar--item" @click="onSidebarCompActive('box')" :class="{'active': sidebarActiveComp=='box'}" role="button">
      <span class="icon-box"></span>
    </div>
    <div class="bc-page-builder--main-sidebar--item" role="button">
      <span class="icon-boxes"></span>
    </div>
  </div>

  <div class="bc-page-builder--blocks-sidebar">
    <div v-if="sidebarActiveComp=='meta'" class="">
      <div v-for="metaData in meta" class="card mb-1 ps-2 pt-1">
        <h6>{{ metaData.property }}</h6>
        <p>{{ metaData.content }}</p>
      </div>

      <div class="card">
        <form @submit.prevent="addMeta">
          <input required v-model="singleMeta.property" type="text" class="form-control" placeholder="Meta Property">
          <textarea required v-model="singleMeta.content" class="form-control my-1" placeholder="Content here"
                    rows="2"/>
          <div class="d-flex justify-content-between">
            <button class="btn btn-sm btn-success" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="sidebarActiveComp=='box'" class="bc-page-builder--blocks-sidebar--blocks">
      <div v-for="(item, index) of blockRegistry" draggable="true"
           class="block"
           @dragstart="startDrag($event, item)"
           :key="`item_${index}`">
        <div class="icon" v-html="item.icon"></div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>