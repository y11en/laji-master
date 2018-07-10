// 统计模块
import service from '../api'
import { Message } from 'element-ui'

const state = {
    loading: false,
    // 推广列表
    jiushanhaiList: [ {name: '北京九山海', id: 'LG20180608001'}, ],
    
    bilibiliList: [
        {name: '哔哩哔哩0', id: 'LG20180703002'},
        {name: '哔哩哔哩1', id: 'LG20180703003'},
        {name: '哔哩哔哩2', id: 'LG20180703004'},
        {name: '哔哩哔哩3', id: 'LG20180703005'},
        {name: '哔哩哔哩4', id: 'LG20180703006'},
        {name: '哔哩哔哩5', id: 'LG20180703007'},
        {name: '哔哩哔哩6', id: 'LG20180703008'},
        {name: '哔哩哔哩7', id: 'LG20180703009'},
        {name: '哔哩哔哩8', id: 'LG20180703010'},
        {name: '哔哩哔哩9', id: 'LG20180703011'},
    ],
    censusList: [
        {name: '辣鸡小说', id: 'LG20180608000'},
        {name: '北京九山海', id: 'LG20180608001'},
        {name: '哔哩哔哩0', id: 'LG20180703002'},
        {name: '哔哩哔哩1', id: 'LG20180703003'},
        {name: '哔哩哔哩2', id: 'LG20180703004'},
        {name: '哔哩哔哩3', id: 'LG20180703005'},
        {name: '哔哩哔哩4', id: 'LG20180703006'},
        {name: '哔哩哔哩5', id: 'LG20180703007'},
        {name: '哔哩哔哩6', id: 'LG20180703008'},
        {name: '哔哩哔哩7', id: 'LG20180703009'},
        {name: '哔哩哔哩8', id: 'LG20180703010'},
        {name: '哔哩哔哩9', id: 'LG20180703011'},
    ],
    
    dexuanList: [ {name: '德绚', id: 'LGDMT20180627'} ],
    
    extendList: [
        {name: '辣鸡小说', id: 'LG20180608000'},
        {name: '德绚', id: 'LGDMT20180627'},
    ],
    // 小说分销 - 当日订单
    rechargeDay: { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 },
    // 小说分销 - 昨日订单
    rechargeYestoday: { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 },
    // 小说分销 - 当月订单
    rechargeMonth: { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 },
    // 小说分销 - 总计订单
    rechargeTotal: { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 },
    // 小说分销 - 充值时间类型
    orderTableType: '按日查询',
    orderTableList: [],
    // 小说分销 - 书籍对象
    bookTableObj: {},
    // 推广链接数据
    extendLinkObj: {}
}

const mutations = {
    openLoading(state) {
        state.loading = true
    },
    
    // 小说分销 充值订单统计
    getOrderDate(state, data) {
        state.rechargeDay = { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 }
        state.rechargeYestoday = { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 }
        state.rechargeMonth = { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 }
        state.rechargeTotal = { succCounts: 0, succMoney: 0, errCounts: 0, errCounts: 0 }
        var dayData = data.rechargerecordListGroupDay.list
        var monthData = data.rechargerecordListMonth.list
        var totalData = data.totalRecharge
        var date = new Date()
        var today = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
        var yestoday = date.getDate()-1 >= 10 ? date.getDate()-1 : '0' + (date.getDate()-1)
        var month = date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0' + (date.getMonth()+1)
        for(let i=0; i<dayData.length; i++) {
            if(dayData[i].dateTimes.slice(8, 10) == today) {
                if(dayData[i].isOK === 1) {
                    state.rechargeDay.succCounts = dayData[i].counts
                    state.rechargeDay.succMoney = dayData[i].money
                }else {
                    state.rechargeDay.errCounts = dayData[i].counts
                    state.rechargeDay.errMoney = dayData[i].money
                }
            }
            if(dayData[i].dateTimes.slice(8, 10) == yestoday) {
                if(dayData[i].isOK === 1) {
                    state.rechargeYestoday.succCounts = dayData[i].counts
                    state.rechargeYestoday.succMoney = dayData[i].money
                }else {
                    state.rechargeYestoday.errCounts = dayData[i].counts
                    state.rechargeYestoday.errMoney = dayData[i].money
                }
            }
        }
        for(let k=0; k<monthData.length; k++) {
            if(monthData[k].dateTimes.slice(5, 7) == month) {
                if(monthData[k].isOK === 1) {
                    state.rechargeMonth.succCounts = monthData[k].counts
                    state.rechargeMonth.succMoney = monthData[k].money
                } else {
                    state.rechargeMonth.errCounts = monthData[k].counts
                    state.rechargeMonth.errMoney = monthData[k].money
                }
            }
        }
        for(let j=0; j<totalData.length; j++) {
            if(totalData[j].isOK === 1) {
                state.rechargeTotal.succCounts = totalData[j].counts
                state.rechargeTotal.succMoney = totalData[j].money
            } else {
                state.rechargeTotal.errCounts = totalData[j].counts
                state.rechargeTotal.errMoney = totalData[j].money
            }
        }
        state.loading = false
    },

    // 小说分销 充值表格统计
    getOrderTable(state, data) {
        var arr = data.data
        var dateArr = []
        for(let i=0; i<arr.length; i++) {
            dateArr.push(arr[i].dateTimes)
        }
        let resultarr = [...new Set(dateArr)]
        var newArr = []
        if(data.type === 2) {
            for(let i=0; i<arr.length; i++) {
                var n = resultarr.indexOf(arr[i].dateTimes)
                if(newArr[n] == undefined){
                    newArr[n] = {
                        date: '',
                        errCounts: 0,
                        errMoney: 0,
                        succCounts: 0,
                        succMoney: 0,
                    }
                }
                if(arr[i].isOK === 0) {
                    newArr[n].date = arr[i].dateTimes
                    newArr[n].errCounts = arr[i].counts
                    newArr[n].errMoney = arr[i].money
                }else if(arr[i].isOK === 1){
                    newArr[n].date = arr[i].dateTimes
                    newArr[n].succCounts = arr[i].counts
                    newArr[n].succMoney = arr[i].money
                }
            }
        }else if(data.type === 3){
            for(let i=0; i<arr.length; i++) {
                var n = resultarr.indexOf(arr[i].dateTimes)
                if(newArr[n] == undefined){
                    newArr[n] = {
                        date: '',
                        errCounts: 0,
                        errMoney: 0,
                        succCounts: 0,
                        succMoney: 0,
                    }
                }
                if(arr[i].isOK === 0) {
                    newArr[n].date = arr[i].dateTimes.slice(0,7)
                    newArr[n].errCounts = arr[i].counts
                    newArr[n].errMoney = arr[i].money
                }else if(arr[i].isOK === 1){
                    newArr[n].date = arr[i].dateTimes.slice(0,7)
                    newArr[n].succCounts = arr[i].counts
                    newArr[n].succMoney = arr[i].money
                }
            }
        }
        state.orderTableList = newArr
        state.loading = false
    },

    // 小说分销 书籍统计
    getBookTable(state, data) {
        state.bookTableObj = data
        state.loading = false
    },

    // 推广链接数据
    extendLinkObj(state, data) {
        state.extendLinkObj = {}
        for(let i=0; i<data.list.length; i++) {
            data.list[i].show = false
        }
        state.extendLinkObj = data
        state.loading = false
    }
}

const actions = {

    /**
     * 统计：一周android、IOS创建书籍统计
     */
    async getExtensionstatisticsData({}, data) {
        const res = await service.getExtensionstatisticsData(data).catch(err => console.error(err))
        return res
        // else Message.error(res.msg)
    },

    /**
     * 统计：一周android、IOS创建书籍统计
     */
    async getUserExtensionstatistics({}, data) {
        const res = await service.getUserExtensionstatistics(data).catch(err => console.error(err))
        return res
        // else Message.error(res.msg)
    },

    /**
     * 统计：一周android、IOS创建书籍统计
     */
    async getUserExtensionstatisticsCreateBookInfo({}, data) {
        const res = await service.getUserExtensionstatisticsCreateBookInfo(data).catch(err => console.error(err))
        return res
        // else Message.error(res.msg)
    },
    
    /**
     * 统计：一周android、IOS创建书籍统计
     */
    async RechargeRecordStatistics({}, data) {
        const res = await service.RechargeRecordStatistics(data).catch(err => console.error(err))
        if(res.returnCode === 200) return res
        else Message.error(res.msg)
    },

    /**
     * 统计：数据概览
     */
    async getPromotioninfoData({}, data) {
        const res = await service.getPromotioninfoData(data).catch(err => console.error(err))
        if(res.returnCode === 200) return res
        else {
            Message.error(res.msg)
            return res
        }
    },

    // 小说分销
    async getRechargerecordByTypeStatistics({ commit }, data) {
        const res = await service.getRechargerecordByTypeStatistics(data).catch(err => console.error(err))
        if(res.returnCode === 200) commit('getOrderDate', res.data)
        else Message.error(res.msg)
    },

    // 小说分销充值表格
    async getRechargerecordByTypeDetailed({ commit }, data) {
        commit('openLoading')
        const res = await service.getRechargerecordByTypeDetailed(data.params).catch(err => console.error(err))
        if(res.returnCode === 200) commit('getOrderTable', {data: res.data, type: data.type})
        else Message.error(res.msg)
    },

    // 小说分销书籍统计
    async getAdminSubscriptionStatisticsInfoByTime({ commit }, data) {
        commit('openLoading')
        const res = await service.getAdminSubscriptionStatisticsInfoByTime(data).catch(err => console.error(err))
        if(res.returnCode === 200) commit('getBookTable', res.data)
        else Message.error(res.msg)
    },

    // 生成推广链接
    async addExtensionLink({}, data) {
        const res = await service.addExtensionLink(data).catch(err => console.error(err))
        if(res.returnCode === 200) Message.success(res.msg)
        else Message.error(res.msg)
    },

    // 获取推广链接
    async getExtensionLink({ commit }, data) {
        commit('openLoading')
        const res = await service.getExtensionLink(data).catch(err => console.error(err))
        if(res.returnCode === 200) commit('extendLinkObj', res.data)
        else Message.error(res.msg)
    },

    // 删除推广链接
    async deleteExtensionLink({ commit }, data) {
        commit('openLoading')
        const res = await service.deleteExtensionLink(data).catch(err => console.error(err))
        if(res.returnCode === 200) return res
        else Message.error(res.msg)
    },



}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}