<script setup lang="ts">
import {usePageBuilder} from "../PageBuilder.ts";

const {meta, singleMeta, addMoreMeta, editMeta, deleteMeta} = usePageBuilder()
</script>

<template>
  <div class="">
    <div v-for="metaData in meta" class="card mb-1 ps-2 pt-1">
      <h6>{{ metaData.property }}</h6>
      <p>{{ metaData.content }}</p>
      <div>
        <span @click="editMeta(index)" class="icon-highlighter"></span>
        <span @click="deleteMeta(index)" class="icon-trash"></span>
      </div>
    </div>

    <div class="card">
      <form @submit.prevent="addMoreMeta">
        <input required v-model="singleMeta.property" type="text" class="form-control" placeholder="Meta Property">
        <textarea required v-model="singleMeta.content" class="form-control my-1" placeholder="Content here"
                  rows="2"/>
        <div class="d-flex justify-content-between">
          <button class="btn btn-sm btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>