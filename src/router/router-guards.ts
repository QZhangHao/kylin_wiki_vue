import {isNavigationFailure, Router} from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {storage} from '@/utils/Storage'
import {AsyncRouteActionTypes} from '@/store/modules/router/actions'
import {MutationType} from '@/store/modules/router/mutation'
import {debounce} from '@/utils/lodash'

NProgress.configure({showSpinner: false}) // NProgress Configuration

//白名单
const whiteList = ['login', '/auth-redirect', '/bind', '/register']
//默认登录页
const loginRoutePath = '/login'
//默认首页
const defaultRoutePath = '/home'

// 是否需要从后端获取菜单
const isGetMenus = debounce(({to, from, next, hasRoute}) => {
    store.dispatch(AsyncRouteActionTypes.GenerateRoutes).then(() => {
        // 根据roles权限生成可访问的路由表
        // 动态添加可访问路由表
        if (whiteList.includes(to.name as string)) return

        if (!hasRoute) {
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent((from.query.redirect || '') as string)
            if (to.path === redirect) {
                next({...to, replace: true})
            } else {
                // 跳转到目的路由
                next({...to, replace: true})
            }
        }

    }).catch(() => next({path: defaultRoutePath}))
}, 1800, {leading: true})

export function createRouterGuards(router: Router) {
    router.beforeEach((to, from, next) => {
        NProgress.start() // start progress bar
        const token = storage.get(ACCESS_TOKEN)
        if (token) {
            if (to.name === 'login') {
                next({path: defaultRoutePath})
                NProgress.done()
            } else {
                const hasRoute = router.hasRoute(to.name!)
                // 如果不需要每次切换路由获取最新的动态路由，可把下面注释放开
                // if (store.getters.menus.length === 0) {
                // generate dynamic router
                // 防抖获取菜单
                isGetMenus({to, from, next, hasRoute})

                if (whiteList.includes(to.name as string) || hasRoute) {
                    // 在免登录名单，直接进入
                    next()
                }
                // } else {
                //     next()
                // }
            }
        } else {
            // not login
            if (whiteList.includes(to.name as string)) {
                // 在免登录名单，直接进入
                next()
            } else {
                next({path: loginRoutePath, query: {redirect: to.fullPath}, replace: true})
                NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
            }
        }
    })

    router.afterEach((to, from, failure) => {
        document.title = to?.meta?.title as string || document.title 
        // 在这里设置需要缓存的组件名称
        const keepAliveComponents = store.state.asyncRoute.keepAliveComponents
        const currentComName = to.matched.find(item => item.name == to.name)?.components?.default.name; 
        if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.isKeepAlive) { // 需要缓存的组件
            keepAliveComponents.push(currentComName);
        } else if (!to.meta?.isKeepAlive || to.name == "Redirect") { // 不需要缓存的组件
            const index = store.state.asyncRoute.keepAliveComponents.findIndex(name => name == currentComName);
            if (index != -1) {
                keepAliveComponents.splice(index, 1);
            }
        }
        store.commit(MutationType.SetKeepAliveComponents, keepAliveComponents)
        NProgress.done() // finish progress bar
    })

    router.onError(error => {
        console.log(error, '路由错误')
    })

}
