import request from '@/utils/request';

export function getUserInfo() {
    return request("/api/User/GetUserInfo",'get')
}

export function login(params) {
    return request("/api/Auth/Login",'post',params)
}

export function getList(params){
    return request("/api/User/GetList","get",params)
}

export function createUser(params){
    return request('/api/User/Create','post',params)
}

export function deleteUser(params){
    return request(['/api/User', params].join('/'),'delete',params)
}
export function updateUser(params){
    return request('/api/User/Update','post',params)
}