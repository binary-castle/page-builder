import {Ref, ref} from 'vue';
import {Block, VueComponent} from "./types.ts";

// Registry to store registered blocks
export const blockRegistry: Ref<Block[]> = ref<Block[]>([]);

export const previewComponentMap: Ref<Record<string, VueComponent>> = ref({});
export const previewOptionMap: Ref<Record<string, VueComponent | null>> = ref({});

// Function to register a new block
export function registerBlock(block: Block) {
    const isBlockRegistered = blockRegistry.value.some((registeredBlock) => registeredBlock.name === block.name);

    if (isBlockRegistered) {
        console.warn(`Block "${block.name}" is already registered.`);
        return; // Exit early to prevent duplicate registration
    }
    blockRegistry.value.push(block);
    previewComponentMap.value[block.name] = block.component;
    previewOptionMap.value[block.name] = block.optionComponent || null
}
