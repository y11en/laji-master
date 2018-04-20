import ax from './axios'
import querystring from 'querystring'

/**
 * 
 * 
 * @export  获取敏感词、敏感词、警告词
 * @returns res.data
 */
export function getSensitiveWords() {
    return ax.get('/admin/getSensitiveWords')
            .then(res => res.data)
}

/**
 * 
 * 
 * @export  增删敏感词、敏感词、警告词
 * @param {obj} { type:1-6, world: world }
 * @returns 状态码200
 */
export function changeSensitiveWords(data) {
    return ax.get('/admin/addSensitiveWords', {params: data})
            .then(res => res.data)
}

/**
 * 
 * 
 * @export  获得章节敏感词字段
 * @returns 
 */
export function getChapterSensitiveWords() {
    return ax.get('/admin/getChapterSensitiveWords')
            .then(res => res.data)
}

/**
 * 
 * 
 * @export  请求作品分类、书籍标签列表
 * @returns 
 */
export function book_EditBookEcho() {
    return ax.get('/book-EditBookEcho')
            .then(res => res.data)
}


export function book_showBookInfo(data) {
    return ax.post('/book-showBookInfo', {data:data})
            .then(res => res.data)
}

export function getBookDataView(data) {
    return ax.post('/admin/getBookDataView', {data:data})
            .then(res => res.data)
}

export function sysBookUpdate(data) {
    return ax.post('/admin/sysbookupdate', {data:data})
            .then(res => res.data)
}


export function getDataPosition() {
    return ax.get('/sys-getDataPosition')
            .then(res => res.data)
}