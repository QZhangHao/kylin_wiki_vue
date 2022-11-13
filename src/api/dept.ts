import  request  from '@/utils/request';

/*
* 获取部门列表
*/
export function getDeptList(){
    return request('/api/Dept/GetList','get')
}

/*
* 分页获取部分列表
*/
export function getListByPage(params){
    return request('/api/Dept/GetListByPage','get',params)
}


//创建部门
export function createDept(params){
    return request('/api/Dept','post',params)
}

//更新部门
export function updateDept(params){
    return request('/api/Dept','put',params)
}

//删除部分
export function deleteDept(params){
    return request(['/api/Dept', params].join('/'),'delete')
}