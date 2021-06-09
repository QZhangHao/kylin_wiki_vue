import  request  from '@/utils/request';

export function getDeptList(){
    return request('/api/Dept/GetList','get')
}

export function getListByPage(params){
    return request('/api/Dept/GetListByPage','get',params)
}

export function createDept(params){
    return request('/api/Dept','post',params)
}

export function updateDept(params){
    return request('/api/Dept','put',params)
}

export function deleteDept(params){
    return request(['/api/Dept', params].join('/'),'delete')
}