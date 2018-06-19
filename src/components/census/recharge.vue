<template>
<div class="recharge">

    <div class="canal">
        <div class="drop-down-canal">
            <el-button class="title" @click="showCanal = !showCanal">{{canalName}} <i class="fa fa-sort-down"></i></el-button>
            <div class="drop-down-box">
                <el-collapse-transition>
                    <div v-show="showCanal">
                        <div class="transition-box" @click="changeCanalId('001')">北京久山海</div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>
    </div>

    <div class="echart">
        <span>总统计量</span>
        <div class="drop-down-echart">
            <el-button class="title" @click="showUp = !showUp">{{showStrUp}} <i class="fa fa-sort-down"></i></el-button>
            <div class="drop-down-box">
                <el-collapse-transition>
                    <div v-show="showUp">
                        <div class="transition-box" @click="handleCommandUp('按日查询')">
                            按日查询
                            <div class="change-date">
                                <el-date-picker
                                    v-if="isShowDayUp"
                                    v-model="dayValueUp"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="transition-box" @click="handleCommandUp('按月查询')">
                            按月查询
                            <div class="change-date">
                                <el-date-picker
                                    v-if="isShowMonthUp"
                                    v-model="beginMonUp"
                                    type="month"
                                    placeholder="起始月份">
                                </el-date-picker>
                                <el-date-picker
                                    v-if="isShowMonthUp"
                                    v-model="endMonUp"
                                    type="month"
                                    placeholder="结束月份">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="transition-box tool">
                            <el-button size="mini" type="danger" @click="handChangeDateUp()">确定</el-button>
                            <el-button size="mini" @click="showUp = false; isShowMonthUp = false; isShowDayUp = false;">取消</el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>
    </div>

    <div class="trendGrowth">
        <div id="trendGrowth"></div>
    </div>

    <div class="table">
        <div class="drop-down-type">
            <el-button class="title" @click="showType = !showType">{{typeName}} <i class="fa fa-sort-down"></i></el-button>
            <div class="drop-down-box">
                <el-collapse-transition>
                    <div v-show="showType">
                        <div class="transition-box" @click="typeName = '用户名'; showType = false">用户名</div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>

        <el-input class="user-input" v-model="userInput" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>

        <div class="drop-down-table">
            <el-button class="title" @click="showDown = !showDown">按日查询 <i class="fa fa-sort-down"></i></el-button>
            <div class="drop-down-box">
                <el-collapse-transition>
                    <div v-show="showDown">
                        <div class="transition-box" @click="handleCommandDown()">
                            按日查询
                            <div class="change-date">
                                <el-date-picker
                                    v-if="isShowDayDown"
                                    v-model="dayValueDown"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="transition-box tool">
                            <el-button size="mini" type="danger" @click="handChangeDateDown()">确定</el-button>
                            <el-button size="mini" @click="showDown = false; isShowMonthDown = false; isShowDayDown = false;">取消</el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>
    </div>

    <div class="table-box">
        <el-table :data="tableList" stripe border style="width: 100%">
            <el-table-column prop="id" label="用户ID"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.rechargeType === 110">支付宝</span>
                    <span v-if="scope.row.rechargeType === 111">微信</span>
                    <span v-if="scope.row.rechargeType === 112">IOS</span>
                    <span v-if="scope.row.rechargeType === 113">第三方</span>
                </template>
            </el-table-column>
            <el-table-column prop="money" label="金额"></el-table-column>
            <el-table-column prop="orderNo" label="订单号"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.isOK === '0' ? '失败' : '成功'}}
                </template>
            </el-table-column>
            <el-table-column prop="client" label="终端"></el-table-column>
            <el-table-column label="时间">
                <template slot-scope="scope">
                    {{scope.row.dateTimes | time('long')}}
                </template>
            </el-table-column>
    
        </el-table>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
        return {
            canalId: '001',
            canalName: '北京九山海',
            showCanal: false,
            // up
            showUp: false, // echart下拉菜单
            beginMonUp: '', // 起始月份
            endMonUp: '', // 结束月份
            dayValueUp: [], // 日期范围
            showStrUp: '按日查询', //echart名称
            isClickUp: false, //
            isShowDayUp: false,
            isShowMonthUp: false,

            // down
            showDown: false,
            dayValueDown: [],
            showStrDown: '按日查询',
            isClickDown: false,
            isShowDayDown: false,

            typeName: '用户名',
            showType: false,
            userInput: '',

            active: 0,
            defaultDate: {
                dateTime: this.dateTiming(new Date().getTime() - 6*1000*60*60*24, 'start'),
                endTime: this.dateTiming(new Date().getTime(), 'end'),
                group: 'A'
            },
            option: {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    top: '12%'  
                },
                legend: {
                    data: ['ALL', 'Android', 'IOS', 'PC', '手机站']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'ALL',
                        type: 'line',
                        data: []
                    },
                    {
                        name: 'Android',
                        type: 'line',
                        data: []
                    },
                    {
                        name: 'IOS',
                        type: 'line',
                        data: []
                    },
                    {
                        name: 'PC',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '手机站',
                        type: 'line',
                        data: []
                    },
                ]
            },

            tableList: [],
            tableDate: {
                channelId: 'LG20180608001',
                page: 1,
                type: 1,
                dateTime: this.dateTiming(new Date().getTime(), 'start'),
                endTime: this.dateTiming(new Date().getTime(), 'end')
            }
        }
    },
    mounted() {
        var date = new Date().getTime()
        for (var i=0; i<7; i++) {
            this.option.xAxis[0].data.unshift(this.FunWeekTime(date - i*1000*60*60*24))
        }
        this.bookChart()
        this.bookTable()
    },
    methods: {
        // echart
        async bookChart() {
            this.option.series[0].data = []
            this.option.series[1].data = []
            this.option.series[2].data = []
            this.option.series[3].data = []
            this.option.series[4].data = []
            var myChart = echarts.init(document.getElementById('trendGrowth'))
            myChart.showLoading()
            await this.$store.dispatch('getUserExtensionstatistics', this.defaultDate).then(res => {
                if(res.returnCode === 200) {
                    var xAxis = this.option.xAxis[0].data
                    var series = this.option.series
                    for(let i=0; i<xAxis.length; i++) {
                        if(this.showStrUp === '全部' || this.showStrUp === '按日查询') {
                            var a = this.groupA(res.data.androIdRechargerecordList).indexOf(xAxis[i])
                            if(a >= 0) series[1].data.push(res.data.androIdRechargerecordList[a].money)
                            else series[1].data.push(0)

                            var b = this.groupA(res.data.iosRechargerecordList).indexOf(xAxis[i])
                            if(b >= 0) series[2].data.push(res.data.iosRechargerecordList[b].money)
                            else series[2].data.push(0)

                            var c = this.groupA(res.data.pcRechargerecordList).indexOf(xAxis[i])
                            if(c >= 0) series[3].data.push(res.data.pcRechargerecordList[c].money)
                            else series[3].data.push(0)

                            var d = this.groupA(res.data.wapRechargerecordList).indexOf(xAxis[i])
                            if(d >= 0) series[4].data.push(res.data.wapRechargerecordList[d].money)
                            else series[4].data.push(0)

                            series[0].data[i] = series[1].data[i] + series[2].data[i] + series[3].data[i] + series[4].data[i]
                        }else if(this.showStrUp === '按月查询'){
                            var a = this.groupB(res.data.androIdRechargerecordList).indexOf(xAxis[i])
                            if(a >= 0) series[1].data.push(res.data.androIdRechargerecordList[a].money)
                            else series[1].data.push(0)

                            var b = this.groupB(res.data.iosRechargerecordList).indexOf(xAxis[i])
                            if(b >= 0) series[2].data.push(res.data.iosRechargerecordList[b].money)
                            else series[2].data.push(0)

                            var c = this.groupB(res.data.pcRechargerecordList).indexOf(xAxis[i])
                            if(c >= 0) series[3].data.push(res.data.pcRechargerecordList[c].money)
                            else series[3].data.push(0)

                            var d = this.groupB(res.data.wapRechargerecordList).indexOf(xAxis[i])
                            if(d >= 0) series[4].data.push(res.data.wapRechargerecordList[d].money)
                            else series[4].data.push(0)

                            series[0].data[i] = series[1].data[i] + series[2].data[i] + series[3].data[i] + series[4].data[i]
                        }
                    }
                    myChart.setOption(this.option, true)
                    myChart.hideLoading()
                }else {
                    this.$message({ message: '暂无数据！', type: 'warning' })
                    myChart.setOption({}, true)
                    myChart.hideLoading()
                }
            })

        },

        groupA(val) {
            var arr = []
            for(var k=0; k<val.length; k++){
                arr.push(this.FunWeekTime(val[k].dateTimes))
            }
            return arr
        },

        groupB(val) {
            var arr = []
            for(var k=0; k<val.length; k++){
                arr.push(this.RecectMonth(val[k].dateTimes))
            }
            return arr
        },

        // 渠道id
        changeCanalId(val) {
            this.canalId = val
        },

        // echart打开时间插件
        handleCommandUp(command) {
            this.option.xAxis[0].data = []
            if(command === '按日查询') {
                this.showStrUp = command
                this.showUp = true
                this.isShowDayUp = true
                this.isShowMonthUp = false
            }else if(command === '按月查询') {
                this.showStrUp = command
                this.showUp = true
                this.isShowDayUp = false
                this.isShowMonthUp = true
            }
        },

        // echart确认时间事件
        handChangeDateUp() {
            if(this.showStrUp === '按日查询'){
                if(this.dayValueUp[1] - this.dayValueUp[0] <= 1000*60*60*24*30) {
                    this.defaultDate.group = 'A'
                    this.defaultDate.dateTime = this.dateTiming(this.dayValueUp[0].getTime(), 'start')
                    this.defaultDate.endTime = this.dateTiming(this.dayValueUp[1].getTime(), 'end')
                    this.isShowDayUp = false
                    this.isShowMonthUp = false
                    this.showUp = false
                    var val = (this.dayValueUp[1] - this.dayValueUp[0])/(1000*60*60*24)
                    for (let i=0; i<=val; i++) {
                        this.option.xAxis[0].data.unshift(this.FunWeekTime(this.dayValueUp[1]-i*1000*60*60*24))
                    }
                    this.bookChart()
                }else {
                    this.$message({ message: '时间间隔不能超过一个月！', type: 'warning' })
                }
            }else if(this.showStrUp === '按月查询') {
                if(this.endMonUp === '' || this.beginMonUp === '') {
                    this.$message({ message: '月份不能为空错误！', type: 'warning' })
                }else if(this.endMonUp - this.beginMonUp < 0) {
                    this.$message({ message: '月份选取错误！', type: 'warning' })
                }else {
                    this.defaultDate.group = 'B'
                    this.defaultDate.dateTime = this.dateTiming(this.beginMonUp.getTime(), 'start')
                    this.defaultDate.endTime = this.dateTiming(this.endMonUp.getTime()-1000*60*60*24, 'end')
                    this.isShowDayUp = false
                    this.isShowMonthUp = false
                    this.showUp = false
                    var val = (this.endMonUp - this.beginMonUp)/(1000*60*60*24*30)
                    for (let i=0; i<=val; i++) {
                        this.option.xAxis[0].data.unshift(this.RecectMonth(this.endMonUp - i*1000*60*60*24*30))
                    }
                    this.bookChart()
                }
            }
        },

        // table打开时间插件
        handleCommandDown(command) {
            this.showStrDown = command
            this.showDown = true
            this.isShowDayDown = true
        },

        // table
        bookTable() {
            this.tableList = []
            var data = this.tableDate
            this.$store.dispatch('RechargeRecordStatistics', data).then(res => {
                if(res.returnCode === 200) {
                    this.tableList = res.data.list
                }
            })
        },

        // table确认时间事件
        handChangeDateDown() {
            this.tableDate.dateTime = this.dateTiming(this.dayValueDown[0].getTime(), 'start')
            this.tableDate.endTime = this.dateTiming(this.dayValueDown[1].getTime(), 'end')
            this.isShowDayDown = false
            this.showDown = false
            this.bookTable()
        },

        search() {
            if(this.userInput != '') {
                this.tableDate.userName = this.userInput
                this.bookTable()
            }else {
                delete this.tableDate.userName
                this.bookTable()
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.recharge
    .canal
        position relative
        width 100%
        margin-top 20px
        text-align right
        .drop-down-canal
            .title
                color #64D228
                border 2px solid #64D228
                border-radius 10px
                font-size 18px
                outline none
                i
                    position relative
                    top -2px
                    line-height 0px
                    font-size 32px
            .drop-down-box
                position absolute
                top 45px
                right 0
                background #fff
                z-index 1000
                width 180px
                box-shadow border-box
                right 0
                background #fff
                border-radius 4px
                box-shadow 4px 4px 4px #888888
                text-align left
                .transition-box
                    width 160px
                    line-height 20px
                    margin 8px 10px
                    padding 3px 12px
                    font-size 13px
                    color #5d8aff
                    border-radius 4px
                    background #f5f5f5
                    border 1px solid #f5f5f5
                    cursor pointer
    .echart
        height 80px
        line-height 80px
        margin-top 60px
        background #fff
        border-bottom 2px solid rgba(226,226,226,1)
        span
            margin-right 10px
            padding 5px 20px
            font-size 16px
            font-family STHeitiTC-Light
            cursor pointer
        span:first-child
            margin 0 30px
            font-size 18px
            font-family PingFangHK-Regular
            cursor default
        span.active
            background rgba(126,206,244,1)
            color #fff
            border-radius 10px
        span:first-child
            font-family PingFangHK-Regular
            font-size 18px
            color #2B3A40
        div.drop-down-echart
            position relative
            float right
            margin-right 20px
            button.title
                background #7ECEF4
                color #fff
                border-radius 10px
                font-size 18px
                outline none
                i
                    position relative
                    top -2px
                    color #fff
                    font-size 32px
                    line-height 0px
            .drop-down-box
                position absolute
                z-index 1000
                width 180px
                // padding 10px
                box-shadow border-box
                top 60px
                right 0
                background #fff
                border-radius 4px
                box-shadow 4px 4px 4px #888888
                .transition-box
                    width 160px
                    line-height 20px
                    font-size 13px
                    background #f5f5f5
                    border 1px solid #f5f5f5
                    border-radius 4px
                    color #5d8aff
                    padding 3px 12px
                    margin 8px 10px
                    cursor pointer
                    .change-date
                        position absolute 
                        right 180px
                        top 0
                .tool
                    background #fff
                    border none
                    padding 0
    .trendGrowth
        padding 20px
        box-sizing border-box
        background #fff
        #trendGrowth
            width 100%
            height 360px
    .table
        padding 0 60px
        height 80px
        line-height 80px
        margin-top 60px
        margin-bottom 0px
        background #fff
        border-bottom 2px solid rgba(226,226,226,1)
        .drop-down-type
            position relative
            width 120px
            height 80px
            display inline-block
            .title
                width 100%
                background #7ECEF4
                color #fff
                font-size 18px
                outline none
                i
                    position relative
                    top -2px
                    color #fff
                    font-size 32px
                    line-height 0px
            .drop-down-box
                position absolute
                top 60px
                background #fff
                z-index 1000
                width 100%
                box-shadow border-box
                left 0px
                background #fff
                border-radius 4px
                box-shadow 4px 4px 4px #888888
                text-align left
                .transition-box
                    width 100px
                    line-height 20px
                    margin 8px 10px
                    padding 3px 12px
                    font-size 13px
                    color #5d8aff
                    border-radius 4px
                    background #f5f5f5
                    border 1px solid #f5f5f5
                    cursor pointer
        .user-input
            display inline-block
            width 200px


        .drop-down-table
            position relative
            float right
            margin-right 20px
            button.title
                background #7ECEF4
                color #fff
                border-radius 10px
                font-size 18px
                outline none
                i
                    position relative
                    top -2px
                    color #fff
                    font-size 32px
                    line-height 0px
            .drop-down-box
                position absolute
                z-index 1000
                width 180px
                box-shadow border-box
                top 60px
                right 0
                background #fff
                border-radius 4px
                box-shadow 4px 4px 4px #888888
                .transition-box
                    width 160px
                    line-height 20px
                    font-size 13px
                    background #f5f5f5
                    border 1px solid #f5f5f5
                    border-radius 4px
                    color #5d8aff
                    padding 3px 12px
                    margin 8px 10px
                    cursor pointer
                    .change-date
                        position absolute 
                        right 180px
                        top 0
                .tool
                    background #fff
                    border none
                    padding 0
</style>