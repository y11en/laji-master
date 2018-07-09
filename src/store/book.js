// 书籍模块
import service from '../api'
import { Message } from 'element-ui'

const state = {
    loading: true,

    // 获取属性管理
    editBookEchoData: {}

}

const mutations = {

    openLoading(state) {
        state.loading = true
    },

    // 获取属性管理
    editBookEcho(state, data) {
        state.editBookEchoData = {}
        state.editBookEchoData = data
        state.loading = false
    }

}

const actions = {
    

    // 获取属性管理
    async editBookEcho({ commit }) {
        commit('openLoading')
        const res = await service.editBookEcho().catch(err => console.error(err))
        if(res.returnCode === 200) commit('editBookEcho', res.data)
        else Message.error(res.msg)
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}