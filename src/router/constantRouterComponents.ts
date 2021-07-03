import { RouterView } from 'vue-router'
import { markRaw } from "vue";
import { RouterTransition } from "@/components/transition";

export const constantRouterComponents = {
    '/system': markRaw(RouterTransition), // 系统管理
    '/home': import(/* webpackChunkName: "system-user" */ '@/view/index.vue'),
    '/system/user': () => import(/* webpackChunkName: "system-user" */ '@/view/user/index.vue'), // 账号管理
    '/system/role': () => import(/* webpackChunkName: "system-role" */ '@/view/role/index.vue'), // 角色管理
    '/system/dept': () => import(/* webpackChunkName: "system-dept" */ '@/view/dept/index.vue'), // 部门管理
    '/system/menu': () => import(/* webpackChunkName: "system-menu" */ '@/view/menu/index.vue'), // 菜单管理
    '/wiki': () => import('@/view/wiki/index.vue'),//Wiki首页
    //'/wiki/:wikiID': () => import('@/view/wiki/viewer.vue')
}
