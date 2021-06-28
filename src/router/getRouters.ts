import { RouteRecordRaw } from 'vue-router';
import { getMenus } from '@/api/menu'
import router from '@/router/index'

import {constantRouterComponents} from './constantRouterComponents'

// 获取目录下的 .vue 全部文件，参考 vite：import.meta.glob
const dynamicViewsModules = import.meta.glob('../view/**/*.{vue,tsx}');
// 定义404界面
const pathMatch = {
    path: '/:path(.*)*',
    redirect: '/404',
};



export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/home',
        component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
        meta: {
            title: '首页'
        }
    },

]

// 后端控制路由，后端路由 component 转换
export function backEndRouter(data: any) {
    if (!data) return;
    return data.map((item: any) => {
        const { menuID, menuName, pid, orderNum, path, childList, component, meta } = item
      
          // 路由对应的组件
        //const component1 = (constantRouterComponents[path]) || (() => import('@/views/shared/error/404.vue'))
        const component1 = (constantRouterComponents[path])
        // 路由对应的组件 
        return {
            path: path,
            // 路由名称，建议唯一
            name: path.slice(1),
            children: childList && backEndRouter(childList),
            // 该路由对应页面的 组件 (动态加载)
            component: component1,
            props: true,
            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: meta?.title||menuName,
                icon: meta.icon || 'ic:baseline-home',
                isLink: meta.isLink,
                isKeepAlive: meta.isKeepAlive || false,
                auth: meta.auth || [],
                isHide:meta.isHide || false,
            }
        }  
    });
}
 
/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => { 
    return new Promise((resolve, reject) => {
        getMenus().then(result => { 
            const routeList = backEndRouter(result.data)   
            // routeList.forEach(item => {
            //     // 设置模块重定向到菜单
            //     if (item.children?.length > 0 && !item.redirect) {
            //         item.redirect = {name: item.children[0].name}
            //     }
            // })  
            const layout = routes.find(item => item.name == 'Layout')!
            layout.children = [
                ...routeList
            ]   
            router.addRoute(layout)  
            //router.addRoute(pathMatch)  
            resolve(layout.children)
        }).catch(err => {
            reject(err)
        })
    })
}