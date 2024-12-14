<script setup lang="ts">
import {usePageBuilder} from "../PageBuilder.ts";
import {reactive, ref, Ref} from "vue";

const singleMeta: Ref<Object<Record<string, string>>> = ref({})
const {meta} = usePageBuilder();

const editIndex = reactive({value: null}); // Track the index being edited

const addMoreMeta = () => {
  meta.value.push({...singleMeta.value});
  singleMeta.value = {};
}

const editMeta = (index: number) => {
  editIndex.value = index; // Set the index being edited
  singleMeta.value = {...meta.value[index]}; // Populate `singleMeta` with the data to edit
};

const deleteMeta = (index: number) => {
  meta.value.splice(index, 1); // Remove the item from the meta array
  if (editIndex.value === index) {
    editIndex.value = null;
    singleMeta.value = {};
  }
};

const handleSubmit = () => {
  if (editIndex.value !== null) {
    meta.value[editIndex.value] = {...singleMeta.value};
    singleMeta.value = {};
    return editIndex.value = null; // Reset the edit index
  }

  addMoreMeta();
};
</script>

<template>
  <div>
    <!-- List existing meta -->
    <div v-for="(metaData, index) in meta" :key="index" class="card mb-1 ps-2 pt-1">
      <h6>{{ metaData.property }}</h6>
      <p>{{ metaData.content }}</p>
      <div>
        <span role="button" @click="editMeta(index)" class="icon-highlighter"></span>
        <span role="button" @click="deleteMeta(index)" class="icon-trash"></span>
      </div>
    </div>

    <!-- Form to add/edit meta -->
    <div class="mt-2">
      <form @submit.prevent="handleSubmit">
        <input
            required
            v-model="singleMeta.property"
            type="text"
            class="form-control"
            placeholder="Meta Property"
        />
        <textarea
            required
            v-model="singleMeta.content"
            class="form-control my-1"
            placeholder="Content here"
            rows="2"
        />
        <div class="d-flex justify-content-between">
          <button class="btn btn-sm btn-success" type="submit">
            {{ editIndex.value !== null ? "Update" : "Submit" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.icon-highlighter {
  cursor: pointer;
  margin-right: 10px;
  color: blue;
}

.icon-trash {
  cursor: pointer;
  color: red;
}
</style>
