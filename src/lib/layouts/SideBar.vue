<script setup lang="ts">
import MetaComponent from "../components/MetaComponent.vue";
import BuilderComponent from "../components/BuilderComponent.vue";
import {usePageBuilder} from "../PageBuilder.ts";
import {ref} from "vue";

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

const sideItems = ref({
  'tags': false,
  'blocks': true,
  'components': false
})

const toggleSideItem = (key: keyof typeof sideItems.value): void => {
  // Reset all items to false
  for (const k in sideItems.value) {
    sideItems.value[k as keyof typeof sideItems.value] = false;
  }

  // Enable the clicked item
  sideItems.value[key] = true;
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

    <!--    <div class="bc-page-builder&#45;&#45;main-sidebar&#45;&#45;item" :class="{ 'active': sideItems.tags }" role="button"
             @click="toggleSideItem('tags')">
          <span class="icon-tags"></span>
        </div>
        <div class="bc-page-builder&#45;&#45;main-sidebar&#45;&#45;item" :class="{ 'active': sideItems.blocks }" role="button"
             @click="toggleSideItem('blocks')">
          <span class="icon-box"></span>
        </div>
        <div class="bc-page-builder&#45;&#45;main-sidebar&#45;&#45;item" :class="{ 'active': sideItems.components }" role="button"
             @click="toggleSideItem('components')">
          <span class="icon-boxes"></span>
        </div>-->
  </div>

  <div class="bc-page-builder--blocks-sidebar">

    <!--    <div class="bc-page-builder&#45;&#45;blocks-sidebar&#45;&#45;blocks" v-if="sideItems.tags">
          tags
        </div>

        <div class="bc-page-builder&#45;&#45;blocks-sidebar&#45;&#45;blocks" v-if="sideItems.blocks">
          <div v-for="(item, index) of blockRegistry.filter(el => el.type == 'element')" draggable="true"
               class="block"
               @dragstart="startDrag($event, item)"
               :key="`item_${index}`">
            <div class="icon" v-html="item.icon"></div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>

        <div class="bc-page-builder&#45;&#45;blocks-sidebar&#45;&#45;blocks" v-if="sideItems.components">
          <div v-for="(item, index) of blockRegistry.filter(el => el.type === 'ui-component')" draggable="true"
               class="block"
               @dragstart="startDrag($event, item)"
               :key="`item_${index}`">
            asd
            <div class="icon" v-html="item.icon"></div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>-->
    <component :is="getComponent(activeComponent)"/>
  </div>
</template>

<style scoped>

</style>