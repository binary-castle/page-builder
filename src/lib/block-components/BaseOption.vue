<script setup lang="ts">

import {ref, Ref} from "vue";

defineProps<{ title: string, hasContainer?: boolean, backgroundColor?: string, backgroundImage?: string }>()

const emit = defineEmits<{
  (event: 'onClose', state: boolean): void,
  (event: 'onDelete', state: boolean): void,
}>()

const showDeletePopup: Ref<boolean> = ref(false)

const closeOptionDrawer = ($event: Event) => {
  $event.preventDefault()
  emit('onClose', true)
}

const onDeleteItem = ($event: Event) => {
  $event.preventDefault()

  emit('onDelete', true)
}

</script>

<template>
  <div>
    <div class="bc-page-builder--preview--builder--options--title-bar">
      <h3 class="bc-page-builder--preview--builder--options--title-bar--title">{{ title }}</h3>
      <div class="bc-page-builder--preview--builder--options--title-bar--buttons bc-button-group">
        <button @click="showDeletePopup = true">
          <span class="icon-trash"></span>
        </button>
<!--        <button>
          <span class="icon-chevron-up"></span>
        </button>
        <button>
          <span class="icon-chevron-down"></span>
        </button>-->
        <button @click="closeOptionDrawer($event)">
          <span class="icon-x-lg"></span>
        </button>
      </div>
    </div>
    <slot></slot>
  </div>

  <div class="confirm-dialog" v-if="showDeletePopup">
    <div class="content">
      <div class="title">Are you sure ?</div>
      Once you delete this item you cannot revert it back anymore. all your changes of the block will be gone
      permanently
      <div class="button-bar">
        <button class="danger" @click="onDeleteItem($event)">Yes</button>
        <button class="safe" @click="showDeletePopup = false">No</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.confirm-dialog {
  background-color: rgba(128, 128, 128, 0.39);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .content {
    position: relative;
    width: 500px;
    background-color: #ffffff;
    top: 35%;
    left: calc(50% - 250px);
    padding: 20px;
    border-radius: 4px;
    font-size: 14px;
    text-align: justify;

    .title {
      font-size: 18px;
    }

    .button-bar {
      margin-top: 20px;
      display: flex;
      justify-content: end;
      gap: 10px;

      button {
        background: none;
        padding: 5px 15px;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid gray;
        border-radius: 4px;
        transition: all 0.3s;

        &.danger {
          background-color: red;
          border-color: red;
          color: white;

          &:hover {
            background-color: darken(red, 10%);
          }
        }

        &.safe {
          background-color: green;
          border-color: green;
          color: white;

          &:hover {
            background-color: darken(green, 10%);
          }
        }
      }
    }
  }
}

</style>