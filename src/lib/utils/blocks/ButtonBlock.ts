import {Block, BlockType, VueComponent} from "../types.ts";
import {markRaw} from "vue";
import ButtonComponent from "../../block-components/button/ButtonComponent.vue";
import {registerBlock} from "../registry.ts";
import ButtonOptionComponent from "../../block-components/button/ButtonOptionComponent.vue";

export class ButtonBlock implements Block {
    name: string = 'button';
    component: VueComponent = markRaw(ButtonComponent);
    optionComponent: VueComponent = markRaw(ButtonOptionComponent);
    options: Record<string, any> = {
        style: "",
        text: "Button",
        hasContainer: false,
        backgroundColor: "#ffffff",
        backgroundImage: "",
        styleClass: "btn btn-primary",
        styles: "font-size: 50px;",
        buttonAlign: "left",
        buttonAction: {
            type: null,
            url: ""
        }
    }
    description: string = 'This is a button';
    icon: string = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M8 12.5h8V11H8v1.5Z M19 6.5H5a2 2 0 0 0-2 2V15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2ZM5 8h14a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8.5A.5.5 0 0 1 5 8Z"></path></svg>';
    title: string = 'Button';
    type: BlockType = 'element';
}

registerBlock(new ButtonBlock());