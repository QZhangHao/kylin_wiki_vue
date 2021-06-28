import { loadEnv } from 'vite';
import axios, { AxiosRequestConfig } from 'axios'
import router from '@/router'
import store from '@/store'
import qs from 'qs';
import {useRouter, useRoute} from 'vue-router'
import { Modal, message as MessageX, notification } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, createVNode } from 'vue';
import { isString } from '@/utils/is';
import {UserActionTypes} from "@/store/modules/user/actions";
import {TABS_ROUTES} from "@/store/mutation-types";


//配置axios
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API?.toString(),
    timeout: 50000,
    headers: { 'Content-Type': 'application/json' }
})

//添加请求拦截器
service.interceptors.request.use(
    (config) => {
        const isToken = (config.headers || {}).isToken === false
        const token = store.state.user.token
        if (token && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    }

)

//添加响应拦截器
service.interceptors.response.use(
    (res) => {
        const code = res.data.code || 200
        //获取错误信息
        const msg = res.data.message || '错误'

        if (code === 401) {
            Modal.confirm(
                {
                    title: '系统提示',
                    icon: createVNode(ExclamationCircleOutlined),
                    content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
                    cancelText: '取消',
                    okText: '重新登录',
                    onOk() {
                        store.dispatch(UserActionTypes.Logout).then(res => { 
                            // 移除标签页
                            localStorage.removeItem(TABS_ROUTES)
                            router.replace({
                                name: 'login',
                                query: {
                                    redirect: useRoute().fullPath
                                }
                            }).finally(() => location.reload())
                        })
                        location.href = '/login';
                    }
                }
            )
        } else if (code === 500) {
            notification.error({
                message: '系统错误：',
                description: msg
            })
            return Promise.reject(service.interceptors.response);
        } else if (code !== 200) {
            notification.err({
                message: '系统错误：',
                description: msg
            })
            return Promise.reject(new Error(msg))
        } else {
            return res.data
        }
    },
    (error) => {
        console.log('err' + error)
        const err: string = error.toString()
        MessageX.error(err)
        return Promise.reject(error)

    }

)

export default function request(
    url: string,
    method = 'post',
    data = {},
    timeout = 50000,
    headers = {},
    dataType = 'json'
) {
    headers = Object.assign(method === 'get' ? {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    } : {
        'Content-Type': 'application/json;charset=UTF-8'
    }, headers);

    const defaultConfig = {
        baseURL: import.meta.env.VITE_APP_API?.toString(),
        url,
        method,
        params: data,
        data,
        timeout,
        headers,
        responseType: dataType
    };

    if (method === 'get') {

        const now = new Date().getTime();
        if (!isString(defaultConfig.params)) {
            defaultConfig.data = {
                // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                params: Object.assign(defaultConfig.params || {}, {
                    _t: now,
                }),
            };
        } else {
            // 兼容restful风格
            defaultConfig.url = defaultConfig.url + defaultConfig.params + `?_t=${now}`;
            defaultConfig.params = {};
        }

    } else {
        const contentType = headers['Content-Type'];
        defaultConfig.params = {}

        if (typeof contentType !== 'undefined') {
            if (contentType.indexOf('multipart') !== -1) {
                // 类型 `multipart/form-data;`
                defaultConfig.data = data;
            } else if (contentType.indexOf('json') !== -1) {
                // 类型 `application/json`
                // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
                defaultConfig.data = JSON.stringify(data);
            } else {
                // 类型 `application/x-www-form-urlencoded`
                // 服务器收到的raw body(原始数据) name=homeway&key=nokey
                defaultConfig.data = qs.stringify(data, { arrayFormat: 'brackets' });
            }
        }
    }

    return service(defaultConfig as AxiosRequestConfig);


}