/**
 * Created by Administrator on 2017/11/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
  userInfo:{},
  message:{},
  count:0,
  bookInfo:{},
};

const mutations = {
  change_bookInfo(state, obj) {
    state.bookInfo = obj
  }
};

const actions = {
  updateUserInfo:({commit}) => commit("updateUserInfo")
};

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
