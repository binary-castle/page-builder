import {Block, VueComponent} from "../types.ts";
import {markRaw} from "vue";
import ButtonGroupComponent from "../../block-components/ButtonGroupComponent.vue";
import {registerBlock} from "../registry.ts";

export class ButtonGroupBlock implements Block {
    component: VueComponent = markRaw(ButtonGroupComponent);
    description: string = '';
    icon: string = '';
    title: string = 'Button Group';

}

registerBlock(new ButtonGroupBlock());