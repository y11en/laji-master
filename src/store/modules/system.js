// 后台系统模块
import service from '../../api'
import { Message } from 'element-ui'

const state = {
    versionTimeLine: [],

    
}

const mutations = {
    changeVersionTimeLine(state, data) {
        state.versionTimeLine = data
    },



    
}

const actions = {

    /**
     * 获取用户私信
     */
    async getPersonMmessage () {
        const res = await service.getPersonMmessage().catch(err => console.error(err))
        console.log(res)
        // if(res.returnCode === 200) return res.data
    },


    // 获取公告
    async getNotice ({}, data) {
        const res = await service.getNotice(data).catch(err => console.error(err))
        if (res.returnCode === 200) return res.data
        else Message.error(res.msg)
    },

    // 删除公告
    async deleteNotice ({}, data) {
        const res = await service.deleteNotice(data).catch(err => console.error(err))
        if (res.returnCode === 200) return res.data
        else Message.error(res.msg)
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