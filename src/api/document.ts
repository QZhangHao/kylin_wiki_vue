import request from '@/utils/request'

export function getDocumentList(){
    return request('/api/Document','get')
}