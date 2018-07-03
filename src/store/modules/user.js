// 管理员模块
import service from '../../api'
import { Message } from 'element-ui'

const state = {
    loading: true,

    coverLoading: true,
    bookInfoObj: {},

    bookInfoDetail: {}, // 书籍详情
    chapterList: [], // 章节列表
    avaterLoading: true,
    avatarObj: {} //头像管理数组
}

const mutations = {

    openLoading(state) {
        state.loading = true
    },

    // 书籍列表
    getBookInfoList(state, data) {
        state.bookInfoObj = data
        state.loading = false
    },

    // 书籍详情
    bookShowBookInfo(state, data) {
        state.bookInfoDetail = data
    },

    // 章节列表
    chapterList(state, data) {
        state.chapterList = []
        var arr = []
        data.forEach((item) => {
            if (item.resultList.length > 0) {
                arr = arr.concat(item.resultList).slice(0, 15)
            }
          })
        state.chapterList = arr
        state.loading = false
    },

    // 头像列表
    getUserList(state, data) {
        state.avatarObj = {}
        state.avatarObj = data
        state.loading = false
    }
}

const actions = {

    // 书籍列表
    async getBookInfoList({ commit }, data) {
        const res = await service.getBookInfoList(data).catch(err => console.error(err))
        if (res.returnCode === 200) commit('getBookInfoList', res.data)
        else {
            commit('getBookInfoList', [])
            Message.error(res.msg)
        }
    },

    // 书籍详情
    async bookShowBookInfo({ commit }, data) {
        const res = await service.bookShowBookInfo(data).catch(err => console.error(err))
        if (res.returnCode === 200) commit('bookShowBookInfo', res.data)
        else Message.error(res.msg)
    },

    // 章节列表
    async chapterList({ commit }, data) {
        commit('openLoading')
        const res = await service.chapterList(data).catch(err => console.error(err))
        if (res.returnCode === 200) commit('chapterList', res.data)
        else Message.error(res.msg)
    },

    // 头像列表
    async getUserList({ commit }, data) {
        const res = await service.getUserList(data.params).catch(err => console.error(err))
        if (res.returnCode === 200) {
            if(data.type === 'avatar') commit('getUserList', res.data)
            else return res
        }
        else Message.error(res.msg)
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}