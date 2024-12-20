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
    <div class="bc-item-center bc-gap-2">
      <input v-model="model" type="color" class="bc-form-control-color" value="#ffffff"/>
      <div class="bc-fs-12 bc-pointer" @click="model = '#ffffff'">
        Reset
      </div>
    </div>
  </option-widget>
</template>

<style scoped>

</style>