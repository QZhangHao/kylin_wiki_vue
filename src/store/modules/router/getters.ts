import { GetterTree } from 'vuex'
import { State } from './state'
import {RouteRecordRaw} from "vue-router";
import {RootState} from "@/store";

export type Getters = {
    menus(state: State): RouteRecordRaw[];
}

export const getters: GetterTree<State, RootState> & Getters = {
    menus(state) {
        return state.menus
    },
}
