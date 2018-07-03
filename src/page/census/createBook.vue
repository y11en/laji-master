<template>
<div class="create-book">
    
    <template v-if="this.$store.state.userInfo.adminInfo.userName === '张三'">
        <canalID @canalParam="canalParam"></canalID>
    </template>

    <div class="echart">
        <span>总统计量</span>
        <span @click="changeDevice(0)" :class="{active: active === 0}">All</span>
        <span @click="changeDevice(1)" :class="{active: active === 1}"><i class="fa fa-android"></i> Android</span>
        <span @click="changeDevice(2)" :class="{active: active === 2}"><i class="fa fa-apple"></i> IOS</span>
        <span @click="changeDevice(3)" :class="{active: active === 3}"><i class="fa fa-mobile"></i> 手机站</span>
        <span @click="changeDevice(4)" :class="{active: active === 4}"><i class="fa fa-desktop"></i> PC</span>
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
        <div id="trendGrowth2" style="width: 100%; height: 270px;"></div>
    </div>

    <div class="table">
        <div class="drop-down-type">
            <el-button class="title" @click="showType = !showType">{{typeName}} <i class="fa fa-sort-down"></i></el-button>
            <div class="drop-down-box">
                <el-collapse-transition>
                    <div v-show="showType">
                        <div class="transition-box" @click="typeName = '用户名'; showType = false">用户名</div>
                        <div class="transition-box" @click="typeName = '书名'; showType = false">书名</div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>

        <el-input class="user-input" v-model="userInput" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>

        <div class="drop-down-table">
            <el-button class="title" @click="showDown = !showDown">按日查询<i class="fa fa-sort-down"></i></el-button>
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
            <el-table-column prop="bookId" label="用户ID"></el-table-column>
            <el-table-column prop="bookName" label="书名"></el-table-column>
            <el-table-column prop="writerName" label="作者"></el-table-column>
            <el-table-column label="创作时间">
                <template slot-scope="scope">
                    {{scope.row.bookCreatedTime | time('long')}}
                </template>
            </el-table-column>
            <el-table-column label="更新时间">
                <template slot-scope="scope">
                    {{scope.row.lastUpdateTime | time('long')}}
                </template>
            </el-table-column>
            <el-table-column prop="bookWorldCount" label="字数"></el-table-column>
            <el-table-column label="封面">
                <template slot-scope="scope">
                    <div>
                        <img :src="scope.row.bookImage" alt="">
                    </div>
                </template>
            </el-table-column>
    
        </el-table>
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
            myChart: null,

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
            beginMonDown: '',
            endMonDown: '',
            dayValueDown: [],
            isClickDown: false,
            isShowDayDown: false,
            isShowMonthDown: false,

            typeName: '用户名',
            showType: false,
            userInput: '',

            active: 0,
            defaultDate: {
                channelId: '',
                chapterCount: '>=2',
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
                    data: ['两个章节以上', '两个章节以内']
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
                        name: '两个章节以内',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '两个章节以上',
                        type: 'line',
                        data: []
                    }
                ]
            },

            tableList: [],
            tableDate: {
                userCode: '',
                dateTime: this.dateTiming(new Date().getTime(), 'start'),
                endTime: this.dateTiming(new Date().getTime(), 'end')
            }
        }
    },
    mounted() {
        if(JSON.parse(sessionStorage.getItem('user_info')).adminInfo.userName === '北京九山海') {
            this.defaultDate.channelId = this.$store.state.census.spreadNameList[1].id
            this.tableDate.userCode = this.$store.state.census.spreadNameList[1].id
        }else if(JSON.parse(sessionStorage.getItem('user_info')).adminInfo.userName === '哔哩哔哩') {
            this.defaultDate.channelId = this.$store.state.census.spreadNameList[3].id
            this.tableDate.userCode = this.$store.state.census.spreadNameList[3].id
        }else {
            this.defaultDate.channelId = this.$store.state.census.spreadNameList[0].id
            this.tableDate.userCode = this.$store.state.census.spreadNameList[0].id
        }
        var date = new Date().getTime()
        for (var i=0; i<7; i++) {
            this.option.xAxis[0].data.unshift(this.FunWeekTime(date - i*1000*60*60*24))
        }
        this.bookChart()
        this.bookTable()
    },
    destroyed() {
        this.myChart = null
    },
    methods: {
        // echart
        async bookChart() {
            this.option.series[0].data = []
            this.option.series[1].data = []
            this.myChart = echarts.init(document.getElementById('trendGrowth2'))
            this.myChart.showLoading()
            var xAxis = this.option.xAxis[0].data
            var series = this.option.series
            
            var data1 = this.defaultDate
            data1.chapterCount = '>=2'
            await this.$store.dispatch('census/getExtensionstatisticsData', data1).then(res => {
                if(res.returnCode === 200) {
                    for(let i=0; i<xAxis.length; i++) {
                        if(this.showStrUp === '按日查询') {
                            var a = this.groupA(res.data).indexOf(xAxis[i])
                            if(a >= 0) series[0].data.push(res.data[a].chapterCount)
                            else series[0].data.push(0)

                        }else if(this.showStrUp === '按月查询'){
                            var a = this.groupB(res.data).indexOf(xAxis[i])
                            if(a >= 0) series[0].data.push(res.data[a].chapterCount)
                            else series[0].data.push(0)
                        }
                    }
                }else {
                    for(let i=0; i<xAxis.length; i++) {
                        series[0].data.push(0)
                    }
                }
            })

            var data2 = this.defaultDate
            data2.chapterCount = '<=2'
            this.$store.dispatch('census/getExtensionstatisticsData', data2).then(res => {
                if(res.returnCode === 200) {
                    for(let i=0; i<xAxis.length; i++) {
                        if(this.showStrUp === '按日查询') {
                            var c = this.groupA(res.data).indexOf(xAxis[i])
                            if(c >= 0) series[1].data.push(res.data[c].chapterCount)
                            else series[1].data.push(0)

                        }else if(this.showStrUp === '按月查询'){
                            var b = this.groupB(res.data).indexOf(xAxis[i])
                            if(b >= 0) series[1].data.push(res.data[b].chapterCount)
                            else series[1].data.push(0)
                        }
                    }
                }else {
                    for(let i=0; i<xAxis.length; i++) {
                        series[1].data.push(0)
                    }
                }
                this.myChart.setOption(this.option, true)
                this.myChart.hideLoading()
            })
        },

        groupA(val) {
            var arr = []
            for(var k=0; k<val.length; k++){
                arr.push(this.FunWeekTime(val[k].dateTime))
            }
            return arr
        },

        groupB(val) {
            var arr = []
            for(var k=0; k<val.length; k++){
                arr.push(this.RecectMonth(val[k].dateTime))
            }
            return arr
        },

        canalParam(val) {
            this.defaultDate.channelId = val
            this.tableDate.userCode = val
            this.bookChart()
            this.bookTable()
        },
        // 更换设备参数
        changeDevice(val) {
            this.active = val
            if(val === 0) {
                delete this.defaultDate.terminal
            }else if(val === 1) {
                this.defaultDate.terminal = 0
            }else if(val === 2) {
                this.defaultDate.terminal = 2
            }else if(val === 3) {
                this.defaultDate.terminal = 3
            }else if(val === 4) {
                this.defaultDate.terminal = 1
            }
            this.bookChart()
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
        handleCommandDown() {
            this.showDown = true
            this.isShowDayDown = true
            this.isShowMonthDown = false
        },

        // table
        bookTable() {
            this.tableList = []
            var data = this.tableDate
            this.$store.dispatch('census/getUserExtensionstatisticsCreateBookInfo', data).then(res => {
                if(res.returnCode === 200) {
                    this.tableList = res.data
                }
            })
        },

        // table确认时间事件
        handChangeDateDown() {
            this.tableDate.dateTime = this.dateTiming(this.dayValueDown[0].getTime(), 'start')
            this.tableDate.endTime = this.dateTiming(this.dayValueDown[1].getTime(), 'end')
            this.isShowDayDown = false
            this.isShowMonthDown = false
            this.showDown = false
            this.bookTable()
        },

        search() {
            if(this.typeName === '用户名' && this.userInput != '') {
                delete this.tableDate.bookName
                this.tableDate.writerName = this.userInput
                this.bookTable()
            }else if(this.typeName === '书名' && this.userInput != '') {
                delete this.tableDate.writerName
                this.tableDate.bookName = this.userInput
                this.bookTable()
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
</style>
