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

export function deleteDocument(params){
    return request(['/api/Document', params].join('/'),'delete')
}

export function getDocumentUserList(params){
    return request('/api/DocumentUser','get',params)
}

export function updateDocumentUser(params){
    return request('/api/DocumentUser','put',params)
}

export function createDocumentUser(params){
    return request('/api/DocumentUser','post',params)
}

export function deleteDocumentUser(params){
    return request(['/api/DocumentUser', params].join('/'),'delete')
}