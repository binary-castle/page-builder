import {ref, Ref} from "vue";
import {v4 as uuidv4} from 'uuid';
import {ButtonBlock} from "./utils/blocks/ButtonBlock.ts";
import {ColumnBlock} from "./utils/blocks/ColumnBlock.ts";
import {ListBlock} from "./utils/blocks/ListBlock.ts";
import {Block} from "./utils/types.ts";
import {HtmlBlock} from "./utils/blocks/HtmlBlock.ts";
import {TextBlock} from "./utils/blocks/TextBlock.ts";


export function usePageBuilder() {

    const draggedItem: Ref<Block | null> = ref(null)
    const renderList: Ref<Array<Block>> = ref([])
    const dragOverIndex: Ref<number | null> = ref(null)
    const dragOverDropZone: Ref<boolean> = ref(false)
    const innerDragElement: Ref<Block | null> = ref(null)
    const innerDragElementIndex: Ref<number | null> = ref(null)
    const selectedOptionComponent: Ref<Block | null> = ref(null)

    const blocks: Ref<Array<Block>> = ref([
        new ButtonBlock(),
        new TextBlock(),
        new ColumnBlock(),
        new ListBlock(),
        new HtmlBlock()
    ])

    const startDrag = ($event: DragEvent, item: Block) => {
        $event.dataTransfer?.setData('text/plain', JSON.stringify(item));
    }

    const onDrop = (event: DragEvent) => {
        console.log('on drop', event)
        event.preventDefault();
        dragOverDropZone.value = false;
        if (innerDragElement.value) {
            if (innerDragElementIndex.value !== null) {
                renderList.value.splice(innerDragElementIndex.value, 1)
            }

            if (dragOverIndex.value === null) {
                innerDragElement.value.id = uuidv4()
                renderList.value.push(innerDragElement.value)
            } else {
                renderList.value.splice(dragOverIndex.value, 0, innerDragElement.value);
            }

            innerDragElement.value = null;
            dragOverIndex.value = null;
        } else {
            const droppedItem = event.dataTransfer?.getData('text/plain');
            if (droppedItem) {
                const _droppedItem = JSON.parse(droppedItem);
                _droppedItem.id = uuidv4();
                if (dragOverIndex.value === null) {
                    renderList.value.push(_droppedItem)
                } else {
                    renderList.value.splice(dragOverIndex.value, 0, _droppedItem);
                }
            }
            draggedItem.value = null;
            dragOverIndex.value = null;
        }

    }


    const onDragLeave = () => {
        // console.log('onDragLeave', $event)
        // dragOverIndex.value = null;
        dragOverDropZone.value = false;
        dragOverIndex.value = null;
    }

    const startDragItem = ($event: DragEvent, item: Block, index: number) => {
        innerDragElement.value = item
        innerDragElementIndex.value = index
        // renderList.value.splice(index, 1)
        // console.log(item);
        // console.log(index)
        $event.dataTransfer?.setData('text/plain', JSON.stringify(item));
    }

    const onDragOverItem = ($event: DragEvent, index: number) => {
        console.log('on drag over parent')
        $event.preventDefault();
        $event.stopPropagation();
        // console.log('onDragOverItem', $event)
        dragOverIndex.value = index;
    }

    const onDragOver = ($event: DragEvent) => {
        dragOverIndex.value = null;
        dragOverDropZone.value = true;
        // console.log("on drag over");
        $event.stopPropagation();
    }

    const onItemSelect = (block: Block) => {
        selectedOptionComponent.value = block
    }

    const onSelectFormChildElement = (block: Block) => {
        if (block) {
            selectedOptionComponent.value = block
        }
    }

    const onDelete = ($event: boolean) => {
        if (selectedOptionComponent.value?.id && $event) {
            const index = renderList.value.findIndex((block) => block.id === selectedOptionComponent.value?.id);
            if (index !== -1) {
                renderList.value.splice(index, 1);
                selectedOptionComponent.value = null
                return
            }

            renderList.value.forEach((block: Block) => {
                if (block.children) {
                    if (Array.isArray(block.children)) {
                        const childIndex = block.children.findIndex((block) => block.id === selectedOptionComponent.value?.id);
                        if (childIndex !== -1) {
                            block.children.splice(childIndex, 1); // Remove the block
                            selectedOptionComponent.value = null
                            return true;
                        }
                    } else if (typeof block.children === 'object') {
                        for (const key in block.children) {
                            const childIndex = block.children[key].findIndex((block) => block.id === selectedOptionComponent.value?.id);
                            if (childIndex !== -1) {
                                block.children[key].splice(childIndex, 1); // Remove the block
                                selectedOptionComponent.value = null
                                return true;
                            }
                        }
                    }
                }
            })
        }
    }


    return {
        blocks,
        renderList,
        draggedItem,
        dragOverIndex,
        dragOverDropZone,
        selectedOptionComponent,
        startDrag,
        onDrop,
        startDragItem,
        onDragOverItem,
        onDragOver,
        onDragLeave,
        onItemSelect,
        onSelectFormChildElement,
        onDelete
    }
}