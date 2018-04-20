/**
 * Created by Administrator on 2017/11/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import service from '../api'
Vue.use(Vuex)

const state = {
    userInfo:{},
    message:{},
    count:0,
    hasNotice: false,
    bookAuthorization: null,
}

const mutations = {

    keep_bookAuthorization(state, num) {
        state.bookAuthorization = num
    }

}

const actions = {
    updateUserInfo:({commit}) => commit("updateUserInfo"),

    async getSensitiveWords () {
        const res = await service.getSensitiveWords().catch(err => console.error(err))
        if(res.returnCode === 200) return res.data
    },

    async changeSensitiveWords ({}, data) {
        const res = await service.changeSensitiveWords(data).catch(err => console.error(err))
        if(res.returnCode === 200) return res
    },

    async getChapterSensitiveWords ({}) {
        const res = await service.getChapterSensitiveWords().catch(err => console.error(err))
        console.log(res.data)
        if(res.returnCode === 200) return res.data
    },

    async book_EditBookEcho ({}) {
        const res = await service.book_EditBookEcho().catch(err => console.error(err))
        if(res.returnCode === 200) return res.data
    },

    async book_showBookInfo ({commit}, data) {
        const res = await service.book_showBookInfo(data).catch(err => console.error(err))
        if(res.returnCode === 200) {
            commit('keep_bookAuthorization', res.data.bookAuthorization)
            return res.data
        }
    },

    async getBookDataView ({}, data) {
        const res = await service.getBookDataView(data).catch(err => console.error(err))
        if(res.returnCode === 200) return res.data
    },

    async sysBookUpdate ({}, data) {
        const res = await service.sysBookUpdate(data).catch(err => console.error(err))
        if(res.returnCode === 200) return res.data
    },

    async getDataPosition ({}) {
        const res = await service.getDataPosition().catch(err => console.error(err))
        if(res.returnCode === 200) return res.data
    },
}

const  getters = {
  userInfo: state => {
    return state.userInfo
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
