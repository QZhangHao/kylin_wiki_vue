import request from '@/utils/request'

//获取路由
export function getMenus(){
    return request('/api/Menu','get')
}

export function getList(){
    return request('/api/Menu/GetList','get')
}

export function getListByRoleID(params){
    return request('/api/Menu/GetListByRID','get',params)
}

export function getListByPage(params){
    return request('/api/Menu/GetListByPage','get',params)
}

export function createMenu(params){
    return request('/api/Menu','post',params)
}

export function updateMenu(params){
    return request('/api/Menu','put',params)
}

export function deleteMenu(params){
    return request(['/api/Menu', params].join('/'),'delete')
}