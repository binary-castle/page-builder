import {Block, VueComponent} from "../types.ts";
import {markRaw} from "vue";
import ColumnComponent from "../../block-components/columns/ColumnComponent.vue";
import {registerBlock} from "../registry.ts";
import ColumnOptionComponent from "../../block-components/columns/ColumnOptionComponent.vue";

export class ColumnBlock implements Block {
    component: VueComponent = markRaw(ColumnComponent);
    optionComponent: VueComponent = markRaw(ColumnOptionComponent);
    options: Record<string, any> = {
        columns: 3
    }
    description: string = '';
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-columns" viewBox="0 0 16 16">\n' +
        '  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z"/>\n' +
        '</svg>';
    title: string = 'Columns';

}

registerBlock(new ColumnBlock());