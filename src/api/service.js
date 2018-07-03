import ax from './axios'


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

/**
 * 修改书籍信息
 */
export function sysbookupdate(data) {
  return ax.post('/admin/sysbookupdate', data)
            .then(res => res.data)
}

/**
 * 检查发布的章节是否满足两章
 */
export function getChapterCount(data) {
  return ax.post('/admin/getChapterCount', data)
            .then(res => res.data)
}

/**
 * 作者业绩审核
 */
export function getAuthorPerformanceReview(data) {
  return ax.post('/admin/getAuthorPerformanceReview', data)
            .then(res => res.data)
}

/**
 * 某个时间段的章节更新详细信息
 */
export function getChapterInfoByTime(data) {
  return ax.post('/admin/getChapterInfoByTime', data)
            .then(res => res.data)
}

/**
 * 某个时间段的章节更新详细信息
 */
export function getRefreshTime() {
  return ax.post('/getRefreshTime')
            .then(res => res.data)
}


// ==============================================================================================================> 管理员权限相关管理
    // 判断是否登陆
    export function adminIsLogin() {
        return ax.post('/admin-isLogin')
                .then(res => res.data)
    }

    // 后端判断路由权限
    export function dominate(data) {
        return ax.get('/dominate' + data)
                .then(res => res.data)
    }

    // 管理员登陆
    export function adminLogins(data) {
        return ax.post('/admin-Logins', data)
                .then(res => res.data)
    }



// ==============================================================================================================> 用户相关管理


// 书籍管理
export function getBookInfoList(data) {
    return ax.post('/admin/getBookInfoList', data)
              .then(res => res.data)
}

// 书籍详情
export function bookShowBookInfo(data) {
    return ax.post('/book-showBookInfo', data)
              .then(res => res.data)
}

// 章节列表
// 书籍详情
export function chapterList(data) {
    return ax.get('/books-adminChapterList/' + data)
              .then(res => res.data)
}

// 用户管理
export function getUserList(data) {
    return ax.post('/admin/getUserList', data)
              .then(res => res.data)
}


// ==============================================================================================================> 系统管理


// 获取公告
export function getNotice(data) {
    return ax.get('/admin/sys-getNotice', { params: data })
              .then(res => res.data)
}

// 删除公告
export function deleteNotice(data) {
    return ax.post('/admin/sys-deleteNotice', data)
              .then(res => res.data)
}

// 获取敏感词、敏感词、警告词
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
    return ax.get('/admin/addSensitiveWords', { params: data })
              .then(res => res.data)
}

// 版本更新时间轴
export function getVersionList() {
    return ax.get('/getVersionList')
              .then(res => res.data)
}

// 版本更新
export function versionUpdate(data) {
    return new Promise((resolve, reject) => {
        var file = ax.post('/admin/appPackgetUpload', data.file).then(res => res.data.data)
        var info = ax.get('/version/addUpdate', { params: data.info }).then(res => res.data.data)
        resolve([file, info])
    })
}

// 模糊搜索书籍
export function stacksSearch(data) {
    return ax.post('/stacks-search', data)
              .then(res => res.data)
}




// ==============================================================================================================> 北京九山海

// 统计：一周android、IOS创建书籍统计
export function getExtensionstatisticsData(data) {
    return ax.post('/getExtensionstatisticsData', data)
            .then(res => res.data)
}

// 统计：列表
export function getUserExtensionstatisticsCreateBookInfo(data) {
    return ax.post('/getUserExtensionstatisticsCreateBookInfo', data)
            .then(res => res.data)
}

// 统计：充值统计
export function getUserExtensionstatistics(data) {
    return ax.post('/getUserExtensionstatistics', data)
            .then(res => res.data)
}

// 统计：充值统计
export function RechargeRecordStatistics(data) {
    return ax.post('/sys-RechargeRecordStatistics', data)
            .then(res => res.data)
}

// 统计：数据概览
export function getPromotioninfoData(data) {
    return ax.post('/getPromotioninfoData', data)
            .then(res => res.data)
}

// ==============================================================================================================> 小说分销平台
// 小说分销平台 - 充值数据统计
export function getRechargerecordByTypeStatistics(data) {
    return ax.get('/getRechargerecordByTypeStatistics', { params: data })
            .then(res => res.data)
}

// 小说分销平台 - 充值表格数据统计
export function getRechargerecordByTypeDetailed(data) {
    return ax.get('/getRechargerecordByTypeDetailed', { params: data })
            .then(res => res.data)
}

// 小说分销平台 - 书籍数据统计
export function getAdminSubscriptionStatisticsInfoByTime(data) {
    return ax.post('/getAdminSubscriptionStatisticsInfoByTime', data)
            .then(res => res.data)
}

// 生成推广链接
export function addExtensionLink(data) {
    return ax.post('/addExtensionLink', data)
            .then(res => res.data)
}

// 获取推广链接
export function getExtensionLink(data) {
    return ax.post('/getExtensionLink', data)
            .then(res => res.data)
}