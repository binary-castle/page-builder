export type VueComponent = {
    new(): import("vue").Component;
}

export type BlockType = 'block' | 'component';

export interface Block {
    /**
     *  ID is not required for creating a draggable block,
     *  it will be generated by system on drop, and it's need to be tracked and remove
     *  If you are creating a droppablele component in that case you will need to add uuid on drop.
     */
    id?: string;

    /**
     * Name needs to be unique, it's a key identifier for draggable block.
     * Name must be alphanumeric and unique
     */
    name: string;

    /**
     * Just a basic vue component and the component accept blockInfo as props
     */
    component: VueComponent;

    /**
     * Just a basic vue component adn the component accept blockInfo as props
     */
    optionComponent: VueComponent;

    /**
     * Options accept Record<string, any> use to modify design, text and other ui staff from options to preview
     */
    options: Record<string, any>;

    children?: Block[] | { [key: string | number]: Block[] };

    /**
     * Title will appear in the block section
     */
    title: string;

    /**
     * Description will appear in the block tooltip
     */
    description: string;

    /**
     * Icon will appear in the block section
     */
    icon: string;

    /**
     * Preview will appear on hover on block
     */
    previewImg?: string;

    type: BlockType
}
