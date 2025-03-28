import {Block, BlockType, VueComponent} from "../types.ts";
import {markRaw} from "vue";
import {registerBlock} from "../registry.ts";
import TextComponent from "../../block-components/text/TextComponent.vue";
import TextOptionComponent from "../../block-components/text/TextOptionComponent.vue";

export class TextBlock implements Block {
    name: string = 'text';
    component: VueComponent = markRaw(TextComponent);
    optionComponent: VueComponent = markRaw(TextOptionComponent);
    options: Record<string, any> = {
        text: "",
        hasContainer: false,
        backgroundColor: "#ffffff",
        backgroundImage: "",
        cssClasses: "",
        styles: ""
    }
    description: string = 'Paragraph Block';
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fonts" viewBox="0 0 16 16">\n' +
        '  <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479z"/>\n' +
        '</svg>';
    title: string = 'Text';
    type: BlockType = 'element';

}

registerBlock(new TextBlock());