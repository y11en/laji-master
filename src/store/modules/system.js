// 后台系统模块
import service from '../../api'

const state = {
    str: 'lushiyu'
}

const mutations = {

}

const actions = {

    /**
     * 获取用户私信
     */
    async getPersonMmessage () {
        const res = await service.getPersonMmessage().catch(err => console.error(err))
        console.log(res)
        // if(res.returnCode === 200) return res.data
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}