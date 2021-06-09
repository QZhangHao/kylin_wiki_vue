import { MutationTree} from 'vuex'
import { State } from './state'
import {RouteRecordRaw} from 'vue-router'

export enum MutationType {
    SetRouters = 'SET_ROUTERS',
    SetKeepAliveComponents = 'SET_KEEP_ALIVE_COMPONENTS',
}
export type Mutations<S = State> = {
    [MutationType.SetRouters](state: S, routers: RouteRecordRaw[]): void;
    [MutationType.SetKeepAliveComponents](state: S, compNames: string[]): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetRouters]: (state, routers) => { // 设置动态路由
        state.menus = routers
    },
    [MutationType.SetKeepAliveComponents]: (state, compNames) => { // 设置需要缓存的组件
        state.keepAliveComponents = compNames
    },
}
