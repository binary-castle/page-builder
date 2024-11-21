export type VueComponent = {
    new(): import("vue").Component;
}

export interface Block {
    component: VueComponent;
    optionComponent?: VueComponent;
    options?: Record<string, any>;
    title: string;
    description: string;
    icon: string;
    previewImg?: string;
}
