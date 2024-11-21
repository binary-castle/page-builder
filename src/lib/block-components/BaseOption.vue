<script setup lang="ts">

defineProps<{title: string}>()

const emit = defineEmits<{
  (event: 'onClose', state: boolean): void
}>()

const closeOptionDrawer = ($event: Event) => {
  $event.preventDefault()
  emit('onClose', true)
}

</script>

<template>
  <div>
    <div class="bc-page-builder--preview--builder--options--title-bar">
      <h3 class="bc-page-builder--preview--builder--options--title-bar--title">{{title}}</h3>
      <div class="bc-page-builder--preview--builder--options--title-bar--buttons bc-button-group">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up"
               viewBox="0 0 16 16">
            <path
                d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down"
               viewBox="0 0 16 16">
            <path
                d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
          </svg>
        </button>
        <button @click="closeOptionDrawer($event)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
               viewBox="0 0 16 16">
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>