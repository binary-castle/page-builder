<script setup lang="ts">
import {ButtonBlock} from "../utils/blocks/ButtonBlock.ts";

interface Props {
  blockInfo: ButtonBlock
}

defineProps<Props>()
</script>

<template>
  <div class="container">
    <button class="btn btn-primary">Edit Your Text</button>
  </div>
</template>

<style scoped>

</style>