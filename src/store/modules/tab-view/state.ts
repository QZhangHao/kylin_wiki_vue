import {RouteLocationNormalized} from 'vue-router'

export type RouteItem = Partial<RouteLocationNormalized> & {
    fullPath: string;
    name: string;
}

export type State = {
    tabsList: RouteItem[]; // 标签页
};

export const state: State = {
    tabsList: [],
};
