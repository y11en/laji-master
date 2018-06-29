// 管理员模块
import service from '../../api'
import { Message } from 'element-ui'
import route from '../../router/index'

const state = {
    loading: false,
    userInfo: {}
}

const mutations = {
    openLoading(state) {
        state.loading = true
    },
    
    closeLoading(state) {
        state.loading = false
    },

    setUserInfo(state, data) {
        state.userInfo = data
        state.loading = false
    },


}

const actions = {
    // 判断是否登陆
    async adminIsLogin() {
        const res = await service.adminIsLogin().catch(err => console.error(err))
        return res
    },
    
    // 后端判断路由权限
    async dominate({}, data) {
        const res = await service.dominate(data).catch(err => console.error(err))
        return res
    },
    
    // 管理员登陆
    async adminLogins({commit}, data) {
        commit('openLoading')
        const res = await service.adminLogins(data).catch(err => console.error(err))
        if(res.returnCode === 200) {
            commit('setUserInfo', res.data)
            document.cookie = 'login_key=' + escape(res.data.adminInfo.userId) + ';path=/;'
            sessionStorage.setItem('user_info',JSON.stringify(res.data))
            Message({ message: res.msg, type: 'success' })
            route.push(JSON.parse(sessionStorage.getItem('user_info')).roleMenuList[0].menuURL)
        }else {
            Message.error(res.msg)
            commit('closeLoading')
        }
    },




}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}