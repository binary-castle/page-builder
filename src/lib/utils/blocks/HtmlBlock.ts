import {Block, BlockType, VueComponent} from "../types.ts";
import {markRaw} from "vue";
import HtmlComponent from "../../block-components/html/HtmlComponent.vue";
import {registerBlock} from "../registry.ts";
import HtmlOptionComponent from "../../block-components/html/HtmlOptionComponent.vue";

export class HtmlBlock implements Block {
    name: string = 'html';
    component: VueComponent = markRaw(HtmlComponent);
    optionComponent: VueComponent = markRaw(HtmlOptionComponent);
    options: Record<string, any> = {
        html: `
<div class="parent">
<h3 class="child">This is a html text</h3>
</div>
`,
        css: `
 .parent {
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 align-items: center;
 justify-content: center;
 width: 100%;
 height: 100%;
 }

 .child {
    color: blue;
 }

`
    }
    description: string = "Html Block";
    icon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-html" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/>
</svg>`;
    title: string = "Html";
    type: BlockType = 'element';
}

registerBlock(new HtmlBlock());