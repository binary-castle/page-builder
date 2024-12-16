import {Block, BlockType, VueComponent} from "../types.ts";
import {markRaw} from "vue";
import ColumnComponent from "../../block-components/columns/ColumnComponent.vue";
import {registerBlock} from "../registry.ts";
import ColumnOptionComponent from "../../block-components/columns/ColumnOptionComponent.vue";

export class ColumnBlock implements Block {
    name: string = 'columns';
    component: VueComponent = markRaw(ColumnComponent);
    optionComponent: VueComponent = markRaw(ColumnOptionComponent);
    options: Record<string, any> = {
        columns: 3,
        cssClasses: '',
        styles: '',
        hasContainer: false,
        bgColor: '',
        gapClass: 1,
        columnStyles: {
            1: {
                cssClasses: '',
                backgroundColor: '',
                backgroundImage: '',
                styles: 'padding: 10px'
            },
            2: {
                cssClasses: '',
                backgroundColor: '',
                backgroundImage: '',
                styles: 'padding: 10px'
            },
            3: {
                cssClasses: '',
                backgroundColor: '',
                backgroundImage: '',
                styles: 'padding: 10px'
            }
        }
    }
    children: { [key: string | number]: Block[] } = {};
    description: string = '';
    icon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-three-columns" viewBox="0 0 16 16">
  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z"/>
</svg>`;
    title: string = 'Columns';
    type: BlockType = 'element';

}

registerBlock(new ColumnBlock());