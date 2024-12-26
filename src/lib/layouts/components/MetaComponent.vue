<script setup lang="ts">
import {usePageBuilder} from "../../PageBuilder.ts";
import {ref, Ref} from "vue";

const singleMeta: Ref<Record<string, string>> = ref({})
const {meta} = usePageBuilder();

const editIndex: Ref<number | null> = ref(null);
const addMoreMeta = () => {
  meta.value.push({...singleMeta.value});
  singleMeta.value = {};
}

const editMeta = (index: number) => {
  editIndex.value = index;
  singleMeta.value = {...meta.value[index]};
};

const deleteMeta = (index: number) => {
  meta.value.splice(index, 1);
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
  <div class="meta-control-wrap">
    <!-- List existing meta -->
    <div class="meta-list">
      <div v-for="(metaData, index) in meta" :key="index" class="meta-item">
        <h6>{{ metaData.property }}</h6>
        <p>{{ metaData.content }}</p>
        <div class="actions">
          <span role="button" @click="editMeta(index)" class="icon-highlighter"></span>
          <span role="button" @click="deleteMeta(index)" class="icon-trash"></span>
        </div>
      </div>
    </div>


    <!-- Form to add/edit meta -->
    <div class="meta-form">
      <form @submit.prevent="handleSubmit">
        <input
            required
            v-model="singleMeta.property"
            type="text"

            placeholder="Meta Property"
        />
        <textarea
            required
            v-model="singleMeta.content"
            class=""
            placeholder="Content here"
            rows="2"
        />

        <button class="bc-button" type="submit">
          <span class="icon-floppy" style="margin-right: 8px"></span> {{ editIndex !== null ? "Update" : "Submit" }}
        </button>

      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

.meta-control-wrap {
  height: 100vh;
  overflow-y: scroll;
}

.meta-list {
  margin-bottom: 10px;


  .meta-item {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 5px;

    .actions {
      position: absolute;
      bottom: 0;
      right: 10px;
    }
  }

}

.meta-form {
  margin-bottom: 60px;

  input {
    margin-bottom: 10px;
  }
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
