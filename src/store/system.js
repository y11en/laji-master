// 后台系统模块
import service from '../api'
import { Message } from 'element-ui'

const state = {
    loading: false,
    // v-loading="this.$store.state.system.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    versionTimeLine: [],

    FreetimelimitData: [],
    activeRecommendData: [],

    noticeData: {},
}

const mutations = {
    openLoading(state) {
        state.loading = true
    },

    changeVersionTimeLine(state, data) {
        state.versionTimeLine = data
    },

    // 获取限时免费数据
    getFreetimelimit(state, data) {
        state.FreetimelimitData.length = 0
        state.FreetimelimitData = data
        state.loading = false
    },

    // 获取活动推荐数据
    getActivityRecommendedPosition(state, data) {
        state.activeRecommendData.length = 0
        state.activeRecommendData = data.app.concat(data.pc)
        state.loading = false
    },

    // 新闻公告数据
    getNotice(state, data) {
        state.noticeData = {}
        state.noticeData = data
        state.loading = false
    }
    
}

const actions = {

    

    // 实时刷新数据
    async getRefreshTime({}) {
        const res = await service.getRefreshTime().catch(err => console.error(err))
        return res
    },



    
    
    // 书籍导出生成
    async chapterContentImport({}, data) {
        const res = await service.chapterContentImport(data).catch(err => console.error(err))
        return res
    },

    // 获取用户私信
    async getPersonMmessage () {
        const res = await service.getPersonMmessage().catch(err => console.error(err))
        console.log(res)
        // if(res.returnCode === 200) return res.data
    },


    

    // 获取敏感词
    async getSensitiveWords() {
        const res = await service.getSensitiveWords().catch(err => console.error(err))
        if (res.returnCode === 200) return res.data
        else Message.error(res.msg)
    },

    // 修改敏感词
    async changeSensitiveWords({}, data) {
        const res = await service.changeSensitiveWords(data).catch(err => console.error(err))
        if (res.returnCode === 200) return res
        else Message.error(res.msg)
    },

    // 版本更新时间轴
    async getVersionList({commit}) {
        const res = await service.getVersionList().catch(err => console.error(err))
        if (res.returnCode === 200) commit('changeVersionTimeLine', res.data.reverse())
        else Message.error(res.msg)
    },

    // 版本更新
    async versionUpdate({commit}, data) {
        var res = await Promise.all(await service.versionUpdate(data)).then(values =>{
        console.log(values)
            // dispatch('getVersionList')
        })

    },


    // 获取限时免费数据
    async getFreetimelimit({commit}, data) {
        commit('openLoading')
        const res = await service.getFreetimelimit(data).catch(err => console.error(err))
        if(res.returnCode === 200) commit('getFreetimelimit', res.data)
        else Message.error(res.msg)
    },



    // 获取活动推荐数据
    async getActivityRecommendedPosition({commit}) {
        commit('openLoading')
        const res = await service.getActivityRecommendedPosition().catch(err => console.error(err))
        if(res.returnCode === 200) commit('getActivityRecommendedPosition', res.data)
        else Message.error(res.msg)
    },

    // 获取活动推荐数据
    async HDupdateActivityRecommendedPosition({commit, dispatch}, data) {
        commit('openLoading')
        const res = await service.HDupdateActivityRecommendedPosition(data).catch(err => console.error(err))
        if(res.returnCode === 200) {
            Message.success(res.msg)
            dispatch('getActivityRecommendedPosition')
        }else Message.error(res.msg)
    },

    // 获取公告
    async getNotice ({commit}, data) {
        commit('openLoading')
        const res = await service.getNotice(data).catch(err => console.error(err))
        if (res.returnCode === 200) commit('getNotice', res.data)
        else Message.error(res.msg)
    },

    // 删除公告
    async deleteNotice ({dispatch}, data) {
        const res = await service.deleteNotice(data.a).catch(err => console.error(err))
        if (res.returnCode === 200) {
            Message.success(res.msg)
            dispatch('getNotice', data.b)
        }else Message.error(res.msg)
    },

    // 模糊搜索书籍
    async stacksSearch({}, data) {
        const res = await service.stacksSearch(data).catch(err => console.error(err))
        if (res.returnCode === 200) return res
        else Message.error(res.msg)
    },


    



}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}