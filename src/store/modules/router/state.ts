import {RouteRecordRaw} from 'vue-router'

export type State = {
    menus: RouteRecordRaw[];
    keepAliveComponents: string[];
};

export const state: State = {
    menus: [],
    keepAliveComponents: [],
};
