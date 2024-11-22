export type VueComponent = {
    new(): import("vue").Component;
}

export interface Block {
    name: string; // Must be alphanumeric and unique
    component: VueComponent; 
    optionComponent: VueComponent;
    options: Record<string, any>;
    title: string;
    description: string;
    icon: string;
    previewImg?: string;
}
