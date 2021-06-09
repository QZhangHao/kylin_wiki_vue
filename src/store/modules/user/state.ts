import {createStorage} from '@/utils/Storage'
import {ACCESS_TOKEN, CURRENT_USER} from "@/store/mutation-types";
const Storage = createStorage({storage: localStorage})

export type State = {
    token: string;
    name: string;
    welcome: string;
    avatar: string;
    roles: any[];
    info: any;
};

export const state: State = {
    token: Storage.get(ACCESS_TOKEN, ''),
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: Storage.get(CURRENT_USER, {})
};
