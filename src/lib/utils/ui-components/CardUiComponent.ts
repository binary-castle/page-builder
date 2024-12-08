import {Block, BlockType, VueComponent} from "../types.ts";
import CardOptionComponent from "../../ui-components/card/CardOptionComponent.vue";
import CardComponent from "../../ui-components/card/CardComponent.vue";
import {registerBlock} from "../registry.ts";

export class CardUiComponent implements Block {
    component: VueComponent = CardComponent;
    description: string = '';
    icon: string = 'icon';
    name: string = 'card';
    optionComponent: VueComponent = CardOptionComponent;
    options: Record<string, any> = {};
    title: string = 'card';
    type: BlockType = 'ui-component';

}

registerBlock(new CardUiComponent());