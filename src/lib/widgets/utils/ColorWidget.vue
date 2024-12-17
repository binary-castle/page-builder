<script setup lang="ts">
import OptionWidget from "../OptionWidget.vue";

interface Props {
  title: string;
  align?: 'vertical' | 'horizontal';
}

withDefaults(defineProps<Props>(), {
  title: 'Color'
})

const model = defineModel()
</script>

<template>
  <option-widget :title="title" :align="align">
    <div class="d-flex justify-content-between align-items-center gap-2">
      <input v-model="model" type="color" class="form-control form-control-color" value="#ffffff"/>
      <div class="fs-12" type="button" @click="model = '#ffffff'">
        Reset
      </div>
    </div>
  </option-widget>
</template>

<style scoped>

</style>