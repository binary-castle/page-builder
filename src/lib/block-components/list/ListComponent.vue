<script setup lang="ts">
import {ListBlock} from "../../utils/blocks/ListBlock.ts";
import BasePreview from "../BasePreview.vue";

interface Props {
  blockInfo: ListBlock
  inEditor?: boolean
}

defineProps<Props>()
</script>

<template>
  <BasePreview :inEditor="inEditor">
    <div class="container">
      <ol>
        <li>One</li>
        <li>Two</li>
      </ol>
    </div>
  </BasePreview>

</template>

<style scoped>

</style>