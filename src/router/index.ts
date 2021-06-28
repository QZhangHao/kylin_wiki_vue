import { App } from "vue";
import { createRouter, createWebHashHistory, Router, RouteRecordRaw,createWebHistory } from "vue-router";
import { createRouterGuards } from './router-guards';

//定义静态路由
export const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "layout" */ '@/view/login/index.vue'),
	
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import(/* webpackChunkName: "layout" */ '@/view/login/index.vue'),
		meta: {
			title: '找不到此页面',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import(/* webpackChunkName: "layout" */ '@/view/login/index.vue'),
		meta: {
			title: '没有权限',
		}
	}
]
 

// 添加静态路由
const router = createRouter({
	history: createWebHistory(''),
	routes,
});


// 删除/重置路由
export function resetRouter() {
	router.getRoutes().forEach((route) => {
		const { name } = route;
		if (name) {
			router.hasRoute(name) && router.removeRoute(name);
		}
	});
}


export  function setupRouter(app: App) {  

	app.use(router)
	createRouterGuards(router)
	
}
 
// 导出路由
export default router;