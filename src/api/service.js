import ax from './axios'

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
export function book_EditBookEcho(data) {
    return ax.get('/book-EditBookEcho', data)
            .then(res => res.data)
}


export function book_showBookInfo(data) {
    return ax.post('/book-showBookInfo', data)
            .then(res => res.data)
}

export function getBookDataView(data) {
    return ax.post('/admin/getBookDataView', data)
            .then(res => res.data)
}

export function sysBookUpdate(data) {
    return ax.post('/admin/sysbookupdate', data)
            .then(res => res.data)
}


export function getDataPosition() {
    return ax.get('/sys-getDataPosition')
            .then(res => res.data)
}

export function generateMonthlyreport(data) {
    return ax.post('/generateMonthlyreport', data)
            .then(res => res.data)
}

/**
 * 获取用户私信
 */
export function getPersonMmessage() {
    return ax.get('/person-message')
            .then(res => res)
}

/**
 * 
 * 
 * @export
 * @returns 
 */
export function isLogin(data) {
    return ax.post('/admin-isLogin', data)
            .then(res => res.data)
}

/**
 * 当日数据统计
 */
export function getControlPanel() {
    return ax.post('/admin/getControlPanel')
            .then(res => res.data)
}

/**
 * 获取访问日志
 */
export function getSiteaccessrecordsInfo() {
    return ax.get('/admin/getSiteaccessrecordsInfo')
            .then(res => res.data)
}

/**
 * 用户列表
 */
export function getUserList(data) {
    return ax.post('/admin/getUserList', data)
            .then(res => res.data)
}

/**
 * 模糊搜索书籍
 */
export function stacksSearch(data) {
    return ax.post('/stacks-search', data)
            .then(res => res.data)
}

/**
 * 书籍列表
 */
export function getbookInfoList(data) {
    return ax.post('/admin/getBookInfoList', data)
            .then(res => res.data)
}

/**
 * 书籍导出
 */
export function chapterZipDownload(data) {
    return ax.post('/ChapterZipDownload', data)
            .then(res => res.data)
}

/**
 * 书籍导出生成
 */
export function chapterContentImport(data) {
    return ax.post('/admin/chapterContentImport', data)
            .then(res => res.data)
}