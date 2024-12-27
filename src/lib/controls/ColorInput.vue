<script setup lang="ts">
const model = defineModel()

const onReset = ($event: Event) => {
  $event.preventDefault()
  model.value = 'transparent'
}
</script>

<template>
  <div class="color-control-wrapper">
    <button class="btn-reset" title="Reset Color" @click="onReset">↺</button>
    <input type="color" v-model="model">
  </div>
</template>

<style scoped lang="scss">

</style>