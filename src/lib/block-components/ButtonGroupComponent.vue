<script setup lang="ts">
import {ButtonGroupBlock} from "../utils/blocks/ButtonGroupBlock.ts";

interface Props {
  blockInfo: ButtonGroupBlock
}

defineProps<Props>()
</script>

<template>
  <div class="container">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary">Left</button>
      <button type="button" class="btn btn-primary">Middle</button>
      <button type="button" class="btn btn-primary">Right</button>
    </div>
  </div>
</template>

<style scoped>

</style>