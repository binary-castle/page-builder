import {Ref, ref} from 'vue';
import {Block, VueComponent} from "./types.ts";

// Registry to store registered blocks
export const blockRegistry: Ref<Block[]> = ref<Block[]>([]);

export const previewComponentMap: Ref<Record<string, VueComponent>> = ref({});
export const previewOptionMap: Ref<Record<string, VueComponent | null>> = ref({});

// Function to register a new block
export function registerBlock(block: Block) {
    blockRegistry.value.push(block);
    previewComponentMap.value[block.title] = block.component;
    previewOptionMap.value[block.title] = block.optionComponent || null
}
