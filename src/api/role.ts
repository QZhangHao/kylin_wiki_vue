import request from '@/utils/request';

export function getRoleList(){
    return request("/api/Role/GetList",'get')
}

export function getListByPage(params){
    return request("/api/Role/GetListByPage",'get',params)
}

export function createRole(params){
    return request('/api/Role','post',params)
}

export function updateRole(params){
    return request('/api/Role','put',params)
}

export function deleteRole(params){
    return request(['/api/Role', params].join('/'),'delete')
}

