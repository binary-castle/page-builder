<script setup lang="ts">
import {Block, PageBuilder} from "./lib";
import {onMounted, ref, Ref} from "vue";
// import RichTextEditor from "./lib/editors/RichTextEditor.vue";
// import {registerBlock} from "./lib/utils/blocks/registry.ts";

// registerBlock()

const onSave = (value: any) => {
  console.log(JSON.stringify(value));
}


const value = '{"renderList":[{"name":"columns","component":{"__name":"ColumnComponent","props":{"blockInfo":{"required":true},"inEditor":{"required":false}},"emits":["onSelectChildElement","onDragOverChildElement","onDropChildElement"],"__hmrId":"4d396f49","__scopeId":"data-v-4d396f49","__file":"/Users/rifat/Programming/BinaryCastle/bc-page-builder/src/lib/block-components/columns/ColumnComponent.vue"},"optionComponent":{"__name":"ColumnOptionComponent","props":{"blockInfo":{"required":true}},"__hmrId":"4fb6ea75","__scopeId":"data-v-4fb6ea75","__file":"/Users/rifat/Programming/BinaryCastle/bc-page-builder/src/lib/block-components/columns/ColumnOptionComponent.vue"},"options":{"columns":3,"styleClass":"","styles":"","columnStyles":{"0":{"cssClasses":"","backgroundColor":"","backgroundImage":"","styles":"padding: 10px"},"1":{"cssClasses":"","backgroundColor":"","backgroundImage":"","styles":"padding: 10px"},"2":{"cssClasses":"","backgroundColor":"","backgroundImage":"","styles":"padding: 10px"}}},"children":{"1":[{"name":"button","component":{"__name":"ButtonComponent","props":{"blockInfo":{"required":true},"inEditor":{"required":false}},"__hmrId":"a1cbf95d","__file":"/Users/rifat/Programming/BinaryCastle/bc-page-builder/src/lib/block-components/button/ButtonComponent.vue"},"optionComponent":{"__name":"ButtonOptionComponent","props":{"blockInfo":{"required":true}},"__hmrId":"e8da91cc","__file":"/Users/rifat/Programming/BinaryCastle/bc-page-builder/src/lib/block-components/button/ButtonOptionComponent.vue"},"options":{"style":"","text":"Button","styleClass":"btn btn-primary","styles":"font-size: 50px;","endPoint":""},"description":"This is a button","icon":"<svg viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" aria-hidden=\\"true\\" focusable=\\"false\\"><path d=\\"M8 12.5h8V11H8v1.5Z M19 6.5H5a2 2 0 0 0-2 2V15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2ZM5 8h14a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8.5A.5.5 0 0 1 5 8Z\\"></path></svg>","title":"Button","type":"element","id":"68aea8ec-9963-4ba6-b391-975e615a27b8"}]},"description":"","icon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" fill=\\"currentColor\\" class=\\"bi bi-layout-three-columns\\" viewBox=\\"0 0 16 16\\">\\n  <path d=\\"M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z\\"/>\\n</svg>","title":"Columns","type":"element","id":"c03b5641-ef25-4f3a-a6d9-cd43a82d966d"}],"meta":[{"property":"taw","content":"asdf"}]}';

const renderList: Ref<Block[]> = ref([])
const metaR: Ref<Array<Record<string, any>>> = ref([])

onMounted(() => {
  renderList.value = JSON.parse(value).renderList
  metaR.value = JSON.parse(value).meta
})


</script>

<template>
  <!--  <RichTextEditor></RichTextEditor>-->
  <PageBuilder css-url="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
               page-title="dd"
               @onSave="onSave"></PageBuilder>
</template>

<style scoped>

</style>
