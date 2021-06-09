/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { constantRouterMap } from '@/config/router.config'
import {Store as VuexStore, CommitOptions, DispatchOptions, Module} from 'vuex';

import {RootState} from '@/store';
import {state} from './state';
import {getters, Getters} from './getters';
import {mutations, Mutations} from './mutation';
import {actions, Actions} from './actions';

import type {State} from './state';

export {State};

export type UserStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
    & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload?: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    };
};

export const store: Module<State, RootState> = {
    state,
    mutations,
    actions,
    getters,
};

