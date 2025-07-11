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
<div class="hero-section">
    <div class="hero-content">
        <h1 class="hero-title">Modern Web Design</h1>
        <p class="hero-subtitle">Creating beautiful, responsive interfaces with clean HTML and CSS</p>
        <div class="hero-buttons">
            <button class="btn btn-primary">Get Started</button>
            <button class="btn btn-secondary">Learn More</button>
        </div>
    </div>
    <div class="hero-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-square"></div>
    </div>
</div>
`,
        css: `
.hero-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 400px;
    padding: 60px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    overflow: hidden;
    color: white;
    font-family: 'Arial', sans-serif;
}

.hero-content {
    flex: 1;
    max-width: 600px;
    z-index: 2;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 20px 0;
    line-height: 1.2;
    background: linear-gradient(45deg, #ffffff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin: 0 0 30px 0;
    opacity: 0.9;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.btn {
    padding: 14px 28px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    text-align: center;
}

.btn-primary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
}

.hero-decoration {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 300px;
    z-index: 1;
}

.decoration-circle {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    top: 0;
    right: 0;
    animation: float 6s ease-in-out infinite;
}

.decoration-square {
    position: absolute;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    bottom: 20px;
    left: 20px;
    transform: rotate(45deg);
    animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}

/* Responsive design */
@media (max-width: 768px) {
    .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 40px 20px;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-decoration {
        position: relative;
        right: auto;
        top: auto;
        transform: none;
        margin-top: 40px;
        width: 200px;
        height: 200px;
    }
    
    .decoration-circle {
        width: 150px;
        height: 150px;
    }
    
    .decoration-square {
        width: 80px;
        height: 80px;
    }
}
`
    }
    description: string = "Modern HTML Block with CSS styling";
    icon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-html" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/>
</svg>`;
    title: string = "HTML Block";
    type: BlockType = 'element';
}

registerBlock(new HtmlBlock());