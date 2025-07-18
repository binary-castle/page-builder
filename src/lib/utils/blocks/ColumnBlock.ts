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
        hasContainer: false,
        backgroundColor: "#ffffff",
        backgroundImage: '',
        styleClass: '',
        styles: '',
        // Container width controls - using pure CSS
        containerWidth: {
            mobile: 'width-100',
            tablet: 'width-100',
            desktop: 'max-width-1200'
        },
        containerAlignment: {
            mobile: 'margin-auto',
            tablet: 'margin-auto', 
            desktop: 'margin-auto'
        },
        // Row spacing controls - using pure CSS
        rowSpacing: {
            mobile: 'gap-16',
            tablet: 'gap-16',
            desktop: 'gap-16'
        },
        // Column responsive settings
        columnResponsive: {
            mobile: {
                behavior: 'stack' // 'stack' or 'grid'
            },
            tablet: {
                behavior: 'grid'
            },
            desktop: {
                behavior: 'grid'
            }
        },
        columnStyles: {
            1: {
                styleClass: 'col',
                backgroundColor: '#ffffff',
                backgroundImage: '',
                styles: 'padding: 10px',
                // Individual column width controls - using pure CSS
                width: {
                    mobile: 'width-100',
                    tablet: 'width-100',
                    desktop: 'width-33'
                }
            },
            2: {
                styleClass: 'col',
                backgroundColor: '#ffffff',
                backgroundImage: '',
                styles: 'padding: 10px',
                width: {
                    mobile: 'width-100',
                    tablet: 'width-100', 
                    desktop: 'width-33'
                }
            },
            3: {
                styleClass: 'col',
                backgroundColor: '#ffffff',
                backgroundImage: '',
                styles: 'padding: 10px',
                width: {
                    mobile: 'width-100',
                    tablet: 'width-100',
                    desktop: 'width-33'
                }
            }
        }
    }
    children: { [key: string | number]: Block[] } = {};
    description: string = 'Grid Layout';
    icon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-three-columns" viewBox="0 0 16 16">
  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z"/>
</svg>`;
    title: string = 'Columns';
    type: BlockType = 'layout';

}

registerBlock(new ColumnBlock());