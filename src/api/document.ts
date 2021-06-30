import request from '@/utils/request'

export function getDocumentList(){
    return request('/api/Document/GetList','get')
}

export function createDocument(params){
    return request('/api/Document','post',params)
}

export function getDocument(params){
    return request('/api/Document','get',params)
}

export function updateDocument(params){
    return request('/api/Document','put',params)
}