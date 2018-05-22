// 管理员模块
import service from '../../api'

const state = {
    
}

const mutations = {

}

const actions = {

    /**
     * 检查是否登录
     * @param {object} data {}
     */
    async isLogin (data) {
        // const res = await service.isLogin(data).catch(err => console.error(err))
        return res
    },

    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}