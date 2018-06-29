// 管理员模块
import service from '../../api'
import { Message } from 'element-ui'

const state = {
    loading: true,

    coverLoading: true,
    bookInfoObj: {},

    avaterLoading: true,
    avatarObj: {} //头像管理数组
}

const mutations = {

    getBookInfoList(state, data) {
        state.bookInfoObj = data
        state.loading = false
    },

    getUserList(state, data) {
        state.avatarObj = {}
        state.avatarObj = data
        state.loading = false
    }
}

const actions = {

    // 头像管理
    async getBookInfoList({ commit }, data) {
        const res = await service.getBookInfoList(data).catch(err => console.error(err))
        if (res.returnCode === 200) commit('getBookInfoList', res.data)
        else Message.error(res.msg)
    },

    // 头像管理
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