import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutation'
import { State } from './state'
import {RootState} from "@/store";
import {getUserInfo, login} from "@/api/user";
import {ACCESS_TOKEN, CURRENT_USER, IS_LOCKSCREEN} from "@/store/mutation-types";
import {storage} from "@/utils/Storage"; 
import store from "@/store";

export enum UserActionTypes {
    Login = 'LOGIN',
    GetInfo = 'GET_INFO',
    Logout = 'LOGOUT',
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}

export type Actions = {
    [UserActionTypes.Login](context: ActionAugments, userInfo: any): Promise<any>;
    [UserActionTypes.GetInfo](context: ActionAugments): Promise<any>;
    [UserActionTypes.Logout](context: ActionAugments): Promise<any>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    // 登录
    async [UserActionTypes.Login]({commit}, userInfo) {
        try {
            const res = await login(userInfo)  
            if (res.data) { 
                storage.set(ACCESS_TOKEN, res.data, 7 * 24 * 60 * 60 * 1000)
                commit(MutationType.SetToken, res.data)
                // todo
                commit(MutationType.SetInfo, res) 
            }
            return Promise.resolve(res)
        } catch (e) {
            return Promise.reject(e)
        }
    },

    // 获取用户信息
    [UserActionTypes.GetInfo]({commit}) {
        return new Promise((resolve, reject) => { 
            getUserInfo().then(res => {
                const result = res.data 
                if (result.roles.length>0 && result.auth.length > 0) {
                    result.auth=result.auth.filter((x,index,self)=>{
                        return self.indexOf(x)===index
                    })
                    commit(MutationType.SetRoles, result.role)
                    commit(MutationType.SetInfo, result)
                    storage.set(CURRENT_USER,result)
                } else {
                    reject(new Error('getInfo: roles must be a non-null array !'))
                }

                // commit('SET_NAME', { name: result.name, welcome: welcome() })
                commit(MutationType.SetAvatar, result.avatar)

                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 登出
    async [UserActionTypes.Logout]({commit, state}) {
            commit(MutationType.SetRoles, [])
            commit(MutationType.SetInfo, '')
            storage.remove(ACCESS_TOKEN)
            storage.remove(CURRENT_USER)
            return Promise.resolve('')
    }
}
