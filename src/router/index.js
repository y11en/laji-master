import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/index'
Vue.use(Router)

const router = new Router({
    base: '/dominate',
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    linkActiveClass: '',
    routes: [
        // 登录页
        { path: '/login', name: 'login', component: () => import('@/components/login.vue') },

        { path: '/index', redirect: 'book/list/1' },
        { path: '/board', name: 'board', component: () => import('@/components/system/board') },
        { path: '/sensitiveWord', name: 'SensitiveWord', component: () => import('@/components/sensitiveWord.vue') },

        // 书籍管理
        // 书籍列表
        { path: '/book/list', redirect: 'book/list/1' },
        { path: '/book/list/:page', name: 'bookList', meta: { keepAlive: true }, component: () => import('@/components/book/index.vue') },
        { path: '/book/info/:bid', name: 'bookInfo', meta: { keepAlive: true }, component: () => import('@/components/book/index.vue') },
        // 书籍详情
        { path: '/book_detail/:bid', name: 'bookDetail', component: () => import('@/components/book/book_detail.vue') },
        // 章节列表
        { path: '/book_chapter_list/:bid', name: 'bookChapterList', component: () => import('@/components/book/book_chapter_list.vue') },
        // 编辑章节
        { path: '/edit_chapter/:cid', name: 'editChapter', component: () => import('@/components/book/edit_chapter.vue') },
        // 新增章节
        { path: '/add_new_chapter/:bid', name: 'addNewChapter', component: () => import('@/components/book/add_new_chapter.vue') },
        // 卷列表
        { path: '/book_volume_list/:bid', name: 'bookVolumeList', component: () => import('@/components/book/book_volume_list.vue') },
        // 新增书籍
        { path: '/add_new_book', name: 'addNewBook', component: () => import('@/components/book/add_new_book.vue') },
        // 定时发布
        { path: '/book/timer', redirect: 'book/timer/1' },
        { path: '/book/timer/:page', name: 'bookTimer', component: () => import('@/components/book/timer_list.vue') },
        // 草稿箱
        { path: '/book/draft', redirect: 'book/draft/1' },
        { path: '/book/draft/:page', name: 'bookDraft', component: () => import('@/components/book/draft_list.vue') },

        // 属性管理
        { path: '/property', name: 'bookProperty', component: () => import('@/components/book/book_property.vue') },

        // 用户管理
        { path: '/user/list', redirect: 'user/list/1' },
        { path: '/user/list/:page', name: 'userList', component: () => import('@/page/user/index.vue') },
        { path: '/user/info/:uid', name: 'userInfo', component: () => import('@/page/user/index.vue') },
        { path: '/author/list', redirect: 'author/list/1' },
        { path: '/author/list/:page', name: 'authorList', component: () => import('@/page/user/index.vue') },
        
        { path: '/author/monthly/:aid', redirect: 'author/monthly/:aid/1' },
        { path: '/author/monthly/:aid/:page', name: 'authorMonReport', component: () => import('@/components/statistics/monthly.vue') },
        { path: '/author/add_monthly/:aid', name: 'authorAddMonReport', component: () => import('@/components/statistics/add_monthly.vue') },
        { path: '/author/edit_monthly/:bid', name: 'authorEditMonReport', component: () => import('@/components/statistics/add_monthly.vue') },
        { path: '/user/detail/:rid', name: 'userDetail', component: () => import('@/page/user/detail.vue') },

        // 评论管理
        // 书评管理
        { path: '/comment/b_comment', redirect: 'comment/b_comment/1' },
        { path: '/comment/b_comment/:page', name: 'bookComment', component: () => import('@/components/comment/book_comment.vue') },
        // 书评回复
        { path: '/comment/reply', redirect: 'comment/reply/1' },
        { path: '/comment/reply/:page', name: 'bookReply', component: () => import('@/components/comment/reply_list.vue') },
        // 间贴管理
        { path: '/barrage', redirect: 'barrage/1' },
        { path: '/barrage/:page', name: 'adminBarrage', component: () => import('@/components/barrage/index.vue') },

        // 章节管理
        { path: '/chapter', redirect: 'chapter/1' },
        { path: '/chapter/:page', name: 'allChapter', component: () => import('@/components/book/all_chapter_list.vue') },

        // 消息管理
        // 系统消息
        { path: '/message/system', redirect: 'message/system/1' },
        { path: '/message/system/:page', name: 'mesSystem', component: () => import('@/components/message/system.vue') },
        { path: '/message/edit_message/:mid', name: 'mesEditMessage', component: () => import('@/components/message/edit_system.vue') },
        { path: '/message/add_message', name: 'mesAddMessage', component: () => import('@/components/message/edit_system.vue') },
        // 私信
        { path: '/message/person', redirect: 'message/person/1' },
        { path: '/message/person/:page', name: 'mesPerson', component: () => import('@/components/message/personal.vue') },

        // 数据统计
        // 打赏统计
        { path: '/statistics/reward', redirect: 'statistics/reward/1' },
        { path: '/statistics/reward/:page', name: 'staReward', component: () => import('@/components/statistics/reward.vue') },
        { path: '/statistics/reward/:uid/:page', name: 'staUserReward', component: () => import('@/components/statistics/reward.vue') },
        // 订阅统计
        { path: '/statistics/subscribe', redirect: 'statistics/subscribe/1' },
        { path: '/statistics/subscribe/:page', name: 'staSubscribe', component: () => import('@/components/statistics/subscribe.vue') },
        { path: '/statistics/subscribe/:uid/:page', name: 'staUserSubscribe', component: () => import('@/components/statistics/subscribe.vue') },
        // 推荐统计
        { path: '/statistics/recommend', redirect: 'statistics/recommend/1' },
        { path: '/statistics/recommend/:page', name: 'staRecommend', component: () => import('@/components/statistics/recommend.vue') },
        { path: '/statistics/recommend/:uid/:page', name: 'staUserRecommend', component: () => import('@/components/statistics/recommend.vue') },
        // 金椒统计
        { path: '/statistics/pepper', redirect: 'statistics/pepper/1' },
        { path: '/statistics/pepper/:page', name: 'staPepper', component: () => import('@/components/statistics/pepper.vue') },
        { path: '/statistics/pepper/:uid/:page', name: 'staUserPepper', component: () => import('@/components/statistics/pepper.vue') },
        // 充值统计
        { path: '/statistics/charge', redirect: 'statistics/charge/1' },
        { path: '/statistics/charge/:page', name: 'staCharge', component: () => import('@/components/statistics/charge.vue') },
        { path: '/statistics/charge/:uid/:page', name: 'staUserCharge', component: () => import('@/components/statistics/charge.vue') },
        // 详细数据
        { path: '/statistics/detail', redirect: 'statistics/detail/1' },
        { path: '/statistics/detail/:page', name: 'staDetail', component: () => import('@/components/statistics/detail.vue') },
        // 月报管理
        { path: '/statistics/monthly', redirect: 'statistics/monthly/1' },
        { path: '/statistics/monthly/:page', name: 'staBookMonthly', component: () => import('@/components/statistics/monthly.vue') },

        // 权限管理
        // 管理员
        { path: '/authority/administrator', redirect: 'authority/administrator/1' },
        { path: '/authority/administrator/:page', name: 'autAdministrator', component: () => import('@/components/authority/admin.vue') },
        // 角色管理
        { path: '/authority/role', redirect: 'authority/role/1' },
        { path: '/authority/role/:page', name: 'autRole', component: () => import('@/components/authority/role_list.vue') },
        // 资源管理
        { path: '/authority/resource', name: 'autResource', component: () => import('@/components/authority/resource.vue') },

        // 系统管理
        // 推荐管理
        { path: '/system/recommend', redirect: 'system/recommend/1' },
        { path: '/system/recommend/:page', name: 'sysRecommend', component: () => import('@/components/system/recommend.vue') },
        // 系统公告
        { path: '/system/notice', redirect: 'system/notice/1' },
        { path: '/system/notice/:page', name: 'sysNotice', component: () => import('@/components/system/notice.vue') },
        { path: '/system/edit_notice/:id', name: 'sysEditNotice', component: () => import('@/components/system/add_notice.vue') },
        { path: '/system/add_notice', name: 'sysAddNotice', component: () => import('@/components/system/add_notice.vue') },
        // 发布邮件
        { path: '/system/email', redirect: 'system/email/1' },
        { path: '/system/email/:page', name: 'sysEmail', component: () => import('@/components/system/email.vue') },
        // 限时免费
        { path: '/system/deadline', redirect: 'system/deadline/1' },
        { path: '/system/deadline/:page', name: 'sysDeadline', component: () => import('@/components/system/deadline.vue') },
        // 活动推荐
        { path: '/system/actives', name: 'sysActives', component: () => import('@/components/system/actives.vue') },
        // 数据导出
        { path: '/system/export', name: 'sysExport', component: () => import('@/components/system/export.vue') },
        // 数据字典
        { path: '/system/dictionary', name: 'sysDictionary', component: () => import('@/components/system/dictionary.vue') },
        // 数据备份
        { path: '/system/backups', name: 'sysBackups', component: () => import('@/components/system/backups.vue') },
        // 清理缓存
        { path: '/system/cache', name: 'sysCache', component: () => import('@/components/system/cache.vue') },
        // 屏蔽词管理
        { path: '/system/shield', redirect: 'system/shield/1' },
        { path: '/system/shield/:page', name: 'sysShield', component: () => import('@/components/system/shield.vue') },
        // 友情链接
        { path: '/system/blogroll', redirect: 'system/blogroll/1' },
        { path: '/system/blogroll/:page', name: 'sysBlogroll', component: () => import('@/components/system/blogroll.vue') },
        // 版本更新
        { path: '/system/version', redirect: 'system/version/1' },
        { path: '/system/version/:page', name: 'sysVersion', component: () => import('@/components/system/version.vue') },

        // 日志管理
        // 登录日志
        { path: '/record/login', redirect: 'record/login/1' },
        { path: '/record/login/:page', name: 'recLogin', component: () => import('@/components/record/login_log.vue') },
        // 操作日志
        { path: '/record/operate', redirect: 'record/operate/1' },
        { path: '/record/operate/:page', name: 'recOperate', component: () => import('@/components/record/operate_log.vue') },

        // 运行监控
        // Tomcat监控
        { path: '/monitor/tomcat', name: 'monTomcat', component: () => import('@/components/monitor/tomcat.vue') },
        // Nginx监控
        { path: '/monitor/nginx', name: 'monNginx', component: () => import('@/components/monitor/nginx.vue') },
        // 系统监控
        { path: '/monitor/system', name: 'monSystem', component: () => import('@/components/monitor/system.vue') },
        // druid监控
        { path: '/monitor/druid', name: 'monDruid', component: () => import('@/components/monitor/druid.vue') },
        // 数据库监控
        { path: '/monitor/mysql', name: 'monMyspl', component: () => import('@/components/monitor/mysql.vue') },
        // Redits 监控
        { path: '/monitor/redis', name: 'monRedis', component: () => import('@/components/monitor/redis.vue') },

        // 图片管理
        // 头像 管理
        { path: '/image/avatar', redirect: 'image/avatar/1' },
        { path: '/image/avatar/:page', name: 'imgAvatar', component: () => import('@/page/picture/avatar.vue') },
        // 封面管理
        { path: '/image/cover', redirect: 'image/cover/1' },
        { path: '/image/cover/:page', name: 'imgCover', component: () => import('@/page/picture/cover.vue') },

        // 应用统计
        { path: '/appstatistics', redirect: '/appstatistics/dataview' },
        // 数据统计
        { path: '/appstatistics/dataview', name: 'census', component: () => import('@/page/census/index.vue') },
        // 充值统计
        { path: '/appstatistics/recharge', name: 'recharge', component: () => import('@/page/census/recharge.vue') },
        // 新增书籍
        { path: '/appstatistics/newbook', name: 'createBook', component: () => import('@/page/census/createBook.vue') },
        
        // 新媒体统计
        { path: '/multimedia', redirect: '/multimedia/paystatistics' },
        // 充值统计
        { path: '/multimedia/paystatistics', name: 'data', component: () => import('@/page/distribution/data.vue') },
        // 订阅统计
        { path: '/multimedia/subscribestatistic', redirect: '/multimedia/subscribestatistic/1' },
        { path: '/multimedia/subscribestatistic/:page', name: 'book', component: () => import('@/page/distribution/book.vue') },
        
        // 小说分销
        { path: '/bookdistribution', redirect: '/bookdistribution/booklist/1' },
        // 推广书籍列表
        { path: '/bookdistribution/booklist', redirect: '/bookdistribution/booklist/1' },
        { path: '/bookdistribution/booklist/:page', name: 'extendBookList', component: () => import('@/page/extend/bookList.vue') },
        // 推广章节列表
        { path: '/extend/chapterList/:bookId', name: 'extendChapterList', component: () => import('@/page/extend/chapterList.vue') },
        // 推广链接
        { path: '/bookdistribution/extensionlink', redirect: '/bookdistribution/extensionlink/1' },
        { path: '/bookdistribution/extensionlink/:page', name: 'extendLink', component: () => import('@/page/extend/extendLink.vue') },
        // 404
        { path: '/error', component: () => import('@/page/404.vue') },
        { path: '*', component: () => import('@/page/404.vue') }
    ]
})

router.beforeEach((to, form, next) => {
    if (Number(router.app.$cookie('login_key'))) {
        Store.dispatch('admin/adminIsLogin').then(res => {
            if(res.returnCode === 200) {
                if (to.name === 'login') {
                    next({ path: JSON.parse(sessionStorage.getItem('user_info')).roleMenuList[0].menuURL })
                } else {
                    // Store.dispatch('admin/dominate', to.path).then(res => {
                        // if(res.returnCode === 500){
                            // alert(res.msg)
                            // next({ path: JSON.parse(sessionStorage.getItem('user_info')).roleMenuList[0].menuURL })
                        // }else{
                            next()
                        // }
                    // })
                }
            } else if (res.returnCode === 503) {
                window.location.reload()
            } else {
                router.app.$cookie('login_key', '', -1)
                sessionStorage.removeItem('user_info')
                next({ path: '/login' })
            }
        })
    } else {
        if (to.name === 'login') next()
        else next({ path: '/login' })
        
    }
})
      
router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router
        