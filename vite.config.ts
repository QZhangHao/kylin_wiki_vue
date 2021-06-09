import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path' 
import vitePluginImp from 'vite-plugin-imp'
const CWD = process.cwd()


//环境变量
const BASE_ENV = loadEnv('', CWD)
const DEV_ENV = loadEnv('development', CWD)
const PROD_ENV = loadEnv('production', CWD)
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  //根据不同Mode加载配置
  const { VITE_BASE_URL, VITE_DROP_CONSOLE,VITE_APP_API,VITE_PORT } = loadEnv(mode, CWD)

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        }
      ]
    },
    define: {
      'process.env.TEST_IE': 'false'
    },
    plugins: [
      vue(),
      vitePluginImp({
        libList: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            }
          } 
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {//更改主题色
            'primary-color': '#3C6CFE',
            'layout-sider-background':'#304156',
            'menu-dark-bg':'#304156',
            'menu-dark-submenu-bg':'#1f2d3d',
            'menu-dark-item-hover-bg':'#2D3D51'
          },
          javascriptEnabled: true
        },
        scss: {
          //additionalData: `@import "src/styles/global.scss";`,
        }
      }
    },
    server:{
      port:VITE_PORT,
      proxy:{
        '/api':{
          target:VITE_APP_API,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/, '/api/v1')
        }
      }
    },
    optimizeDeps:{
      include:[
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ]
    },
    build:{
      terserOptions:{
        compress:{
          keep_infinity:true, 
          drop_console: VITE_DROP_CONSOLE,
        }
      }
    }

  }
}