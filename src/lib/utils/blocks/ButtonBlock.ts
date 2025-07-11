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
        styles: `
font-size: 16px;
font-weight: 600;
border: none;
border-radius: 8px;
padding: 12px 24px;
cursor: pointer;
transition: all 0.2s ease;
color: white;
text-decoration: none;
display: inline-block;
text-align: center;
line-height: 1.5;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          
&:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

/* Active state */
&:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

/* Focus state for accessibility */
&:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5);
}
        `,
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