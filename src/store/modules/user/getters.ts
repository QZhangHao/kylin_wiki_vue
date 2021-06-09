import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';

export type Getters = {
    token(state: State): string;
    avatar(state: State): string;
    nickname(state: State): string;
    roles(state: State): any[];
    userInfo(state: State): any;
}

export const getters: GetterTree<State, RootState> & Getters = {
    token: (state) => state.token,
    avatar: (state) => state.avatar,
    nickname: (state) => state.name,
    roles: (state) => state.roles,
    userInfo: (state) => state.info,
};
