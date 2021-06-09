import { createApp } from 'vue' 
import App from './App.vue' 
import { setupStore } from '@/store'
import { setupAntd } from '@/config'
import router  from '@/router'
import {setupRouter} from '@/router'
import '@/assets/css/index.less';
import { setupPermissionDirective } from '@/directives/permission'



const app = createApp(App)
// 注册全局ant-design-vue组件
setupAntd(app)
setupStore(app)
setupRouter(app)
// 注册全局自定义指令，如：v-permission权限指令
setupPermissionDirective(app)
 
//init(router) 
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
//app.mount('#app')