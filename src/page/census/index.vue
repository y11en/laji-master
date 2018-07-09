<template>
<div class="create-book">
    <template>
        <canalID @canalParam="canalParam" :list="canalIDList"></canalID>
    </template>

    <div class="echart">
        <span>总统计量</span>
        <span @click="active = 0" :class="{active: active === 0}">All</span>
        <span @click="active = 1" :class="{active: active === 1}"><i class="fa fa-android"></i> Android</span>
        <span @click="active = 2" :class="{active: active === 2}"><i class="fa fa-apple"></i> IOS</span>
        <span @click="active = 3" :class="{active: active === 3}"><i class="fa fa-mobile"></i> 手机站</span>
        <span @click="active = 4" :class="{active: active === 4}"><i class="fa fa-desktop"></i> PC</span>
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

    <div class="trendGrowth" id="echarts-box">
        <div id="trendGrowth1" style="width: 100%; height: 400px;"></div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
import canalID from '../../components/census/canalID'
export default {
    components: { canalID },

    data() {
        return {

            canalIDList: [],

            showUp: false, // echart下拉菜单
            beginMonUp: '', // 起始月份
            endMonUp: '', // 结束月份
            dayValueUp: [], // 日期范围
            showStrUp: '按日查询', //echart名称
            isClickUp: false, //
            isShowDayUp: false,
            isShowMonthUp: false,

            active: 0,
            defaultDate: {
                channelId: '',
                dateTime: this.dateTiming(new Date().getTime() - 6*1000*60*60*24, 'start'),
                endTime: this.dateTiming(new Date().getTime(), 'end'),
                group: 'A'
            },
            
            allDateArr: {
                'All': [ [], [], [], [], [], [] ],
                'android': [ [], [], [], [], [], [] ],
                'ios': [ [],[], [], [], [], [] ],
                'wap': [ [], [], [], [], [], [] ],
                'pc': [ [], [], [], [], [], [] ]
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
                    data: ['安装量', '下载量', '注册量', '1日留存', '7日留存', '30日留存']
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
                        name: '安装量',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '下载量',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '注册量',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '1日留存',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '7日留存',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '30日留存',
                        type: 'line',
                        data: []
                    }
                ]
            },

        }
    },
  
    created() {
        if(JSON.parse(sessionStorage.getItem('user_info')).adminInfo.userName === '北京九山海') {
            this.canalIDList = this.$store.state.census.jiushanhaiList
            this.defaultDate.channelId = this.$store.state.census.jiushanhaiList[0].id
        }else if(JSON.parse(sessionStorage.getItem('user_info')).adminInfo.userName === '哔哩哔哩') {
            this.canalIDList = this.$store.state.census.bilibiliList
            this.defaultDate.channelId = this.$store.state.census.bilibiliList[0].id
        }else {
            this.canalIDList = this.$store.state.census.censusList
            this.defaultDate.channelId = this.$store.state.census.censusList[0].id
        }

        var date = new Date().getTime()
        for (var i=0; i<7; i++) {
            this.option.xAxis[0].data.unshift(this.FunWeekTime(date - i*1000*60*60*24))
        }
        this.bookChart()
    },
    methods: {
        // echart
        bookChart() {
            this.allDateArr = {
                'All': [ [], [], [], [], [], [] ],
                'android': [ [], [], [], [], [], [] ],
                'ios': [ [],[], [], [], [], [] ],
                'wap': [ [], [], [], [], [], [] ],
                'pc': [ [], [], [], [], [], [] ]
            }
            this.$store.dispatch('census/getPromotioninfoData', this.defaultDate).then(res => {
                if(res.returnCode === 200) {
                    var xAxis = this.option.xAxis[0].data
                    var downDate = []
                    var downArr = res.data.promotioninfoList
                    for(var k=0; k<res.data.promotioninfoList.length; k++){
                        downDate.push(this.FunWeekTime(res.data.promotioninfoList[k].dateTime))
                    }
                    
                    for(let i=0; i<xAxis.length; i++) {
                        var index = downDate.indexOf(xAxis[i])
                        if(index >= 0) {
                            this.allDateArr.All[0].push(downArr[index].androidInstallationCount + downArr[index].iosInstallationCount)
                            this.allDateArr.All[1].push(downArr[index].androidDownloadCount + downArr[index].iosDownloadCount)
                            this.allDateArr.All[2].push(downArr[index].androidRegisterCount + downArr[index].iosRegisterCount + downArr[index].wapRegisterCount + downArr[index].pcRegisterCount)

                            this.allDateArr.android[0].push(downArr[index].androidInstallationCount)
                            this.allDateArr.android[1].push(downArr[index].androidDownloadCount)
                            this.allDateArr.android[2].push(downArr[index].androidRegisterCount)

                            this.allDateArr.ios[0].push(downArr[index].iosInstallationCount)
                            this.allDateArr.ios[1].push(downArr[index].iosDownloadCount)
                            this.allDateArr.ios[2].push(downArr[index].iosRegisterCount)

                            this.allDateArr.wap[0].push(0)
                            this.allDateArr.wap[1].push(0)
                            this.allDateArr.wap[2].push(downArr[index].wapRegisterCount)

                            this.allDateArr.pc[0].push(0)
                            this.allDateArr.pc[1].push(0)
                            this.allDateArr.pc[2].push(downArr[index].pcRegisterCount)
                        }else {
                            this.allDateArr.All[0].push(0)
                            this.allDateArr.All[1].push(0)
                            this.allDateArr.All[2].push(0)

                            this.allDateArr.android[0].push(0)
                            this.allDateArr.android[1].push(0)
                            this.allDateArr.android[2].push(0)

                            this.allDateArr.ios[0].push(0)
                            this.allDateArr.ios[1].push(0)
                            this.allDateArr.ios[2].push(0)

                            this.allDateArr.wap[0].push(0)
                            this.allDateArr.wap[1].push(0)
                            this.allDateArr.wap[2].push(0)

                            this.allDateArr.pc[0].push(0)
                            this.allDateArr.pc[1].push(0)
                            this.allDateArr.pc[2].push(0)
                        }
                        if(this.showStrUp === '按日查询') {
                            var a = this.groupA(res.data.AndroidUserRetainCountGroup1).indexOf(xAxis[i])
                            if(a >= 0) this.allDateArr.android[3].push(res.data.AndroidUserRetainCountGroup1[a].counts)
                            else this.allDateArr.android[3].push(0)

                            var b = this.groupA(res.data.AndroidUserRetainCountGroup7).indexOf(xAxis[i])
                            if(b >= 0) this.allDateArr.android[3].push(res.data.AndroidUserRetainCountGroup7[b].counts)
                            else this.allDateArr.android[4].push(0)

                            var c = this.groupA(res.data.AndroidUserRetainCountGroup30).indexOf(xAxis[i])
                            if(c >= 0) this.allDateArr.android[5].push(res.data.AndroidUserRetainCountGroup30[c].counts)
                            else this.allDateArr.android[5].push(0)

                            var d = this.groupA(res.data.IOSUserRetainCountGroup1).indexOf(xAxis[i])
                            if(d >= 0) this.allDateArr.ios[3].push(res.data.IOSUserRetainCountGroup1[d].counts)
                            else this.allDateArr.ios[3].push(0)

                            var e = this.groupA(res.data.IOSAndroidUserRetainCountGroup7).indexOf(xAxis[i])
                            if(e >= 0) this.allDateArr.ios[4].push(res.data.IOSAndroidUserRetainCountGroup7[e].counts)
                            else this.allDateArr.ios[4].push(0)

                            var f = this.groupA(res.data.IOSAndroidUserRetainCountGroup30).indexOf(xAxis[i])
                            if(f >= 0) this.allDateArr.ios[5].push(res.data.IOSAndroidUserRetainCountGroup30[f].counts)
                            else this.allDateArr.ios[5].push(0)

                            var g = this.groupA(res.data.WAPuserRetainCountGroup1).indexOf(xAxis[i])
                            if(g >= 0) this.allDateArr.wap[3].push(res.data.WAPuserRetainCountGroup1[g].counts)
                            else this.allDateArr.wap[3].push(0)

                            var h = this.groupA(res.data.WAPuserRetainCountGroup7).indexOf(xAxis[i])
                            if(h >= 0) this.allDateArr.wap[4].push(res.data.WAPuserRetainCountGroup7[h].counts)
                            else this.allDateArr.wap[4].push(0)

                            var o = this.groupA(res.data.WAPuserRetainCountGroup30).indexOf(xAxis[i])
                            if(o >= 0) this.allDateArr.wap[5].push(res.data.WAPuserRetainCountGroup30[o].counts)
                            else this.allDateArr.wap[5].push(0)

                            var j = this.groupA(res.data.userRetainCount1).indexOf(xAxis[i])
                            if(j >= 0) this.allDateArr.All[3].push(res.data.userRetainCount1[j].counts)
                            else this.allDateArr.All[3].push(0)

                            var k = this.groupA(res.data.userRetainCount7).indexOf(xAxis[i])
                            if(k >= 0) this.allDateArr.All[4].push(res.data.userRetainCount7[k].counts)
                            else this.allDateArr.All[4].push(0)

                            var l = this.groupA(res.data.userRetainCount30).indexOf(xAxis[i])
                            if(l >= 0) this.allDateArr.All[5].push(res.data.userRetainCount30[l].counts)
                            else this.allDateArr.All[5].push(0)
                        }else if(this.showStrUp === '按月查询'){
                            var a = this.groupMonth(res.data.AndroidUserRetainCountGroup1).indexOf(xAxis[i])
                            if(a >= 0) this.allDateArr.android[3].push(res.data.AndroidUserRetainCountGroup1[a].counts)
                            else this.allDateArr.android[3].push(0)

                            var b = this.groupMonth(res.data.AndroidUserRetainCountGroup7).indexOf(xAxis[i])
                            if(b >= 0) this.allDateArr.android[3].push(res.data.AndroidUserRetainCountGroup7[b].counts)
                            else this.allDateArr.android[4].push(0)

                            var c = this.groupMonth(res.data.AndroidUserRetainCountGroup30).indexOf(xAxis[i])
                            if(c >= 0) this.allDateArr.android[5].push(res.data.AndroidUserRetainCountGroup30[c].counts)
                            else this.allDateArr.android[5].push(0)

                            var d = this.groupMonth(res.data.IOSUserRetainCountGroup1).indexOf(xAxis[i])
                            if(d >= 0) this.allDateArr.ios[3].push(res.data.IOSUserRetainCountGroup1[d].counts)
                            else this.allDateArr.ios[3].push(0)

                            var e = this.groupMonth(res.data.IOSAndroidUserRetainCountGroup7).indexOf(xAxis[i])
                            if(e >= 0) this.allDateArr.ios[4].push(res.data.IOSAndroidUserRetainCountGroup7[e].counts)
                            else this.allDateArr.ios[4].push(0)

                            var f = this.groupMonth(res.data.IOSAndroidUserRetainCountGroup30).indexOf(xAxis[i])
                            if(f >= 0) this.allDateArr.ios[5].push(res.data.IOSAndroidUserRetainCountGroup30[f].counts)
                            else this.allDateArr.ios[5].push(0)

                            var g = this.groupMonth(res.data.WAPuserRetainCountGroup1).indexOf(xAxis[i])
                            if(g >= 0) this.allDateArr.wap[3].push(res.data.WAPuserRetainCountGroup1[g].counts)
                            else this.allDateArr.wap[3].push(0)

                            var h = this.groupMonth(res.data.WAPuserRetainCountGroup7).indexOf(xAxis[i])
                            if(h >= 0) this.allDateArr.wap[4].push(res.data.WAPuserRetainCountGroup7[h].counts)
                            else this.allDateArr.wap[4].push(0)

                            var o = this.groupMonth(res.data.WAPuserRetainCountGroup30).indexOf(xAxis[i])
                            if(o >= 0) this.allDateArr.wap[5].push(res.data.WAPuserRetainCountGroup30[o].counts)
                            else this.allDateArr.wap[5].push(0)

                            var z = this.groupMonth(res.data.PCUserRetainCountGroup1).indexOf(xAxis[i])
                            if(z >= 0) this.allDateArr.pc[3].push(res.data.PCUserRetainCountGroup1[z].counts)
                            else this.allDateArr.pc[3].push(0)

                            var x = this.groupMonth(res.data.PCUserRetainCountGroup7).indexOf(xAxis[i])
                            if(x >= 0) this.allDateArr.pc[4].push(res.data.PCUserRetainCountGroup7[x].counts)
                            else this.allDateArr.pc[4].push(0)

                            var y = this.groupMonth(res.data.PCUserRetainCountGroup30).indexOf(xAxis[i])
                            if(y >= 0) this.allDateArr.pc[5].push(res.data.PCUserRetainCountGroup30[y].counts)
                            else this.allDateArr.pc[5].push(0)

                            var j = this.groupMonth(res.data.userRetainCount1).indexOf(xAxis[i])
                            if(j >= 0) this.allDateArr.All[3].push(res.data.userRetainCount1[j].counts)
                            else this.allDateArr.All[3].push(0)

                            var k = this.groupMonth(res.data.userRetainCount7).indexOf(xAxis[i])
                            if(k >= 0) this.allDateArr.All[4].push(res.data.userRetainCount7[k].counts)
                            else this.allDateArr.All[4].push(0)

                            var l = this.groupMonth(res.data.userRetainCount30).indexOf(xAxis[i])
                            if(l >= 0) this.allDateArr.All[5].push(res.data.userRetainCount30[l].counts)
                            else this.allDateArr.All[5].push(0)
                        }
                    }
                    this.repeatEchart(this.allDateArr.All)
                }else {
                    this.allDateArr.All[0].push(0)
                    this.allDateArr.All[1].push(0)
                    this.allDateArr.All[2].push(0)
                    this.allDateArr.All[3].push(0)
                    this.allDateArr.All[4].push(0)
                    this.allDateArr.All[5].push(0)
                    this.repeatEchart(this.allDateArr.All)
                }
            })
        },

        groupA(val) {
            var arr = []
            for(var k=0; k<val.length; k++){
                arr.push(this.FunWeekTime(val[k].userCreateDate))
            }
            return arr
        },
        groupMonth(val) {
            var arr = []
            for(var k=0; k<val.length; k++){
                arr.push(this.RecectMonth(val[k].userCreateDate))
            }
            return arr
        },

        canalParam(val) {
            this.defaultDate.channelId = val
            this.bookChart()
        },

        // 重绘echarts
        repeatEchart(val) {
            var myChart = echarts.init(document.getElementById('trendGrowth1'))
            myChart.showLoading()
            for(var i=0; i<6; i++) {
                this.option.series[i].data = val[i]
            }
            myChart.setOption(this.option, true)
            myChart.hideLoading()
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
        }
    },

    watch: {
        active(val) {
            document.getElementById('echarts-box').innerHTML = '<div id="trendGrowth1" style="width: 100%; height: 400px;"></div>'
            if(val === 0) {
                this.repeatEchart(this.allDateArr.All)
            }else if(val === 1){
                this.repeatEchart(this.allDateArr.android)
            }else if(val === 2){
                this.repeatEchart(this.allDateArr.ios)
            }else if(val === 3){
                this.repeatEchart(this.allDateArr.wap)
            }else if(val === 4){
                this.repeatEchart(this.allDateArr.pc)
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.create-book
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
        #trendGrowth, #trendGrowth1
            width 100%
            height 360px
</style>
