import {ref, Ref} from "vue";
import {ButtonBlock} from "./utils/blocks/ButtonBlock.ts";
import {ParagraphBlock} from "./utils/blocks/ParagraphBlock.ts";
import {ColumnBlock} from "./utils/blocks/ColumnBlock.ts";
import {ListBlock} from "./utils/blocks/ListBlock.ts";
import {ButtonGroupBlock} from "./utils/blocks/ButtonGroupBlock.ts";
import {Block} from "./utils/types.ts";


export function usePageBuilder() {

    const draggedItem: Ref<Block | null> = ref(null)
    const renderList: Ref<Array<Block>> = ref([])
    const dragOverIndex: Ref<number | null> = ref(null)
    const dragOverDropZone: Ref<boolean> = ref(false)
    const innerDragElement: Ref<Block | null> = ref(null)
    const innerDragElementIndex: Ref<number | null> = ref(null)

    const blocks: Ref<Array<Block>> = ref([
        new ButtonBlock(),
        new ParagraphBlock(),
        new ColumnBlock(),
        new ListBlock(),
        new ButtonGroupBlock()
    ])

    const startDrag = ($event: DragEvent, item: Block) => {
        $event.dataTransfer?.setData('text/plain', JSON.stringify(item));
    }

    const onDrop = (event: DragEvent) => {
        event.preventDefault();
        dragOverDropZone.value = false;
        if (innerDragElement.value) {
            if (innerDragElementIndex.value !== null) {
                renderList.value.splice(innerDragElementIndex.value, 1)
            }

            if (dragOverIndex.value === null) {
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

    const onDragLeave = ($event: DragEvent) => {
        // console.log('onDragLeave', $event)
        // dragOverIndex.value = null;
        dragOverDropZone.value = false;
        dragOverIndex.value = null;
    }

    const startDragItem = (item: Block, index: number) => {
        innerDragElement.value = item
        innerDragElementIndex.value = index
        // renderList.value.splice(index, 1)
        // console.log(item);
        // console.log(index)
    }

    const onDragOverItem = ($event: DragEvent, index: number) => {
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


    return {
        blocks,
        renderList,
        draggedItem,
        dragOverIndex,
        dragOverDropZone,
        startDrag,
        onDrop,
        startDragItem,
        onDragOverItem,
        onDragOver,
        onDragLeave
    }
}