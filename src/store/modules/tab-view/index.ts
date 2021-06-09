/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { constantRouterMap } from '@/config/router.config'
import {Store as VuexStore, CommitOptions, DispatchOptions, Module} from 'vuex';

import {RootState} from '@/store';
import {state} from './state';
import {mutations, Mutations} from './mutation';

import type {State} from './state';
import {Getters} from "@/store/modules/router/getters";

export {State};

export type TabsViewStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
    & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    };
};

export const store: Module<State, RootState> = {
    state,
    mutations,
};

