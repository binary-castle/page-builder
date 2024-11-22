<script setup lang="ts">
import {ListBlock} from "../../utils/blocks/ListBlock.ts";

interface Props {
  blockInfo: ListBlock
}

defineProps<Props>()
</script>

<template>
  <div class="container">
    <ol>
      <li>One</li>
      <li>Two</li>
    </ol>
  </div>
</template>

<style scoped>

</style>