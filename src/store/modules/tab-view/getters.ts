import { GetterTree } from 'vuex'
import { State, RouteItem } from './state'
import {RootState} from "@/store";

export type Getters = {
    tabsList(state: State): RouteItem[];
}

export const getters: GetterTree<State, RootState> & Getters = {
    tabsList(state) {
        return state.tabsList
    },
}
