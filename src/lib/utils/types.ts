export type VueComponent = {
    new(): import("vue").Component;
}

export interface Block {
    component: VueComponent;
    title: string;
    description: string;
    icon: string;
    previewImg?: string;
}

export interface Widget {
}