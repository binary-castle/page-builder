<script setup lang="ts">

import MetaComponent from "../components/MetaComponent.vue";
import BuilderComponent from "../components/BuilderComponent.vue";
import {usePageBuilder} from "../PageBuilder.ts";

const {setActiveComponent, activeComponent} = usePageBuilder()

const sidebarItems = [
  {name: "MetaComponent", icon: "icon-tags", component: MetaComponent},
  {name: "BuilderComponent", icon: "icon-box", component: BuilderComponent},
  {name: "OtherComponent", icon: "icon-boxes", component: null}
];

const getComponent = (name: string) => {
  const activeItem = sidebarItems.find(item => item.name === name);
  return activeItem?.component || null;
};

</script>

<template>
  <div class="bc-page-builder--main-sidebar">
    <div
        v-for="item in sidebarItems"
        :key="item.name"
        class="bc-page-builder--main-sidebar--item"
        :class="{ active: activeComponent === item.name }"
        @click="setActiveComponent(item.name)"
        role="button"
    >
      <span :class="item.icon"></span>
    </div>
  </div>

  <div class="bc-page-builder--blocks-sidebar">
    <component :is="getComponent(activeComponent)"/>
  </div>
</template>

<style scoped>

</style>