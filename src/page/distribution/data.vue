<template>
    <div class="data" v-loading="this.$store.state.census.loading">
        <template v-if="this.$store.state.userInfo.adminInfo.userName === '张三'">
            <canalID @canalParam="canalParam" :list="canalIDList"></canalID>
        </template>

        <p class="title">订单统计</p>

        <el-row :gutter="24" class="order" style="margin-left: 0px; margin-right: 0px;">
            <el-col :md="12" :lg="12" :xl="6" class="order-contain" style="padding: 0 50px;">
                <div class="pay-item">
                    <p class="pay-title">今日充值</p>
                    <p class="pay-money">{{'￥' + rechargeDay.succMoney + '.00'}}</p>
                    <p class="pay-info">已支付 ：<span>{{rechargeDay.succCounts}}</span> 笔</p>
                    <p class="pay-info">未支付 ：<span>{{rechargeDay.errCounts}}</span> 笔</p>
                    <p class="pay-info">完成率 ：<span>
                        {{completionRate(rechargeDay.succCounts / (rechargeDay.succCounts + rechargeDay.errCounts)) == 'NaN' ? 0 : completionRate(rechargeDay.succCounts / (rechargeDay.succCounts + rechargeDay.errCounts))}}
                    </span> %</p>
                </div>
            </el-col>
            <el-col :md="12" :lg="12" :xl="6" class="order-contain" style="padding: 0 50px">
                <div class="pay-item">
                    <p class="pay-title">昨日充值</p>
                    <p class="pay-money">{{'￥' + rechargeYestoday.succMoney + '.00'}}</p>
                    <p class="pay-info">已支付 ：<span>{{rechargeYestoday.succCounts}}</span> 笔</p>
                    <p class="pay-info">未支付 ：<span>{{rechargeYestoday.errCounts}}</span> 笔</p>
                    <p class="pay-info">完成率 ：<span>
                        {{completionRate(rechargeYestoday.succCounts / (rechargeYestoday.succCounts + rechargeYestoday.errCounts)) == 'NaN' ? 0 : completionRate(rechargeYestoday.succCounts / (rechargeYestoday.succCounts + rechargeYestoday.errCounts))}}
                    </span> %</p>
                </div>
            </el-col>
            <el-col :md="12" :lg="12" :xl="6" class="order-contain" style="padding: 0 50px;">
                <div class="pay-item">
                    <p class="pay-title">本月充值（不含今日）</p>
                    <p class="pay-money">{{'￥' + rechargeMonth.succMoney + '.00'}}</p>
                    <p class="pay-info">已支付 ：<span>{{rechargeMonth.succCounts}}</span> 笔</p>
                    <p class="pay-info">未支付 ：<span>{{rechargeMonth.errCounts}}</span> 笔</p>
                    <p class="pay-info">完成率 ：<span>
                        {{completionRate(rechargeMonth.succCounts / (rechargeMonth.succCounts + rechargeMonth.errCounts)) == 'NaN' ? 0 : completionRate(rechargeMonth.succCounts / (rechargeMonth.succCounts + rechargeMonth.errCounts))}}
                    </span> %</p>
                </div>
            </el-col>
            <el-col :md="12" :lg="12" :xl="6" class="order-contain" style="padding: 0 50px;">
                <div class="pay-item">
                    <p class="pay-title">累计充值</p>
                    <p class="pay-money">{{'￥' + rechargeTotal.succMoney + '.00'}}</p>
                    <p class="pay-info">已支付 ：<span>{{rechargeTotal.succCounts}}</span> 笔</p>
                    <p class="pay-info">未支付 ：<span>{{rechargeTotal.errCounts}}</span> 笔</p>
                    <p class="pay-info">完成率 ：<span>
                        {{completionRate(rechargeTotal.succCounts / (rechargeTotal.succCounts + rechargeTotal.errCounts)) == 'NaN' ? 0 : completionRate(rechargeTotal.succCounts / (rechargeTotal.succCounts + rechargeTotal.errCounts))}}
                    </span> %</p>
                </div>
            </el-col>
        </el-row>

        <div class="table-title">
            <p class="title">每日充值统计</p>
            <DateComponent class="date" @dateParam="handleTable"></DateComponent>
        </div>

        <div class="pay-table">
            <div class="pay-table-info">
                <el-table :data="orderTableList" stripe style="width: 100%" border>
                    <el-table-column prop="date" label="日期" align="center"></el-table-column>

                    <el-table-column label="充值" align="right">
                        <template slot-scope="scope">
                            <p>{{'￥' + scope.row.succMoney + '.00'}}</p>
                            <p>
                                <span>{{'充值次数 ：' + (scope.row.succCounts + scope.row.errCounts)}}</span>
                                <span style="margin-left:20px;">{{'次均 ：' + (scope.row.succMoney / scope.row.succCounts).toFixed(2)}}</span>
                            </p>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="date" label="充值支付订单数" align="right">
                        <template slot-scope="scope">
                            <p>{{(scope.row.succCounts + scope.row.errCounts) + ' 笔'}}</p>
                            <p>
                                <span>{{scope.row.errCounts + ' 笔未支付'}}</span>
                                <span style="margin-left:20px;">{{'完成率 ：' + completionRate(scope.row.succCounts / (scope.row.succCounts + scope.row.errCounts)) + '%'}}</span>
                            </p>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import DateComponent from '../../components/census/DateComponent'
import canalID from '../../components/census/canalID'
export default {
    components: { DateComponent, canalID },

    data() {
        return {
            canalIDList: [],

            orderParams: {
                page: 1,
                channelId: '',
                startdate: this.dateTiming(new Date().getTime()-1000*60*60*24, 'start'),
                enddate: this.dateTiming(new Date().getTime(), 'end')
            },
            tableParams: {
                page: 1,
                type: 2,
                channelId: '',
                startdate: this.dateTiming(new Date().getTime()-1000*60*60*24*6, 'start'),
                enddate: this.dateTiming(new Date().getTime(), 'end'),
            }
        }
    },

    created() {
        if(JSON.parse(sessionStorage.getItem('user_info')).adminInfo.userName === '德绚') {
            this.canalIDList = this.$store.state.census.dexuanList
            this.orderParams.channelId = this.$store.state.census.dexuanList[0].id
            this.tableParams.channelId = this.$store.state.census.dexuanList[0].id
        }else {
            this.canalIDList = this.$store.state.census.extendList
            this.orderParams.channelId = this.$store.state.census.extendList[0].id
            this.tableParams.channelId = this.$store.state.census.extendList[0].id
        }
        this.$store.dispatch('census/getRechargerecordByTypeStatistics', this.orderParams)
        this.$store.dispatch('census/getRechargerecordByTypeDetailed', {params: this.tableParams, type: this.tableParams.type})
    },

    methods: {
        // 完成率
        completionRate(value) {
            var newValue = value * 100
            return newValue.toFixed(2)
        },

        handleTable(arr, type) {
            if(type === 'day')  this.tableParams.type = 2
            else this.tableParams.type = 3
            this.tableParams.startdate = arr[0]
            this.tableParams.enddate = arr[1]
            this.$store.dispatch('census/getRechargerecordByTypeDetailed', {params: this.tableParams, type: this.tableParams.type})
        },

        canalParam(val) {
            this.orderParams.channelId = val
            this.tableParams.channelId = val
            this.$store.dispatch('census/getRechargerecordByTypeStatistics', this.orderParams)
            this.$store.dispatch('census/getRechargerecordByTypeDetailed', {params: this.tableParams, type: this.tableParams.type})
        }

    },

    computed: {
        rechargeDay() {
            return this.$store.state.census.rechargeDay
        },
        rechargeYestoday() {
            return this.$store.state.census.rechargeYestoday
        },
        rechargeMonth() {
            return this.$store.state.census.rechargeMonth
        },
        rechargeTotal() {
            return this.$store.state.census.rechargeTotal
        },
        orderTableList() {
            return this.$store.state.census.orderTableList.reverse()
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.data
    .canal
        padding 0 50px
    .title
        font-size 18px
        color #666666
        margin 0 0 20px 50px
    .table-title
        padding 20px 50px
        .title
            float left
            margin 0
            line-height 44px
        .date
            float right
    .table-title:after
        display block
        content ''
        clear both
    .order
        width 100%
        margin-bottom 20px
        .order-contain
            padding 0 20px
            margin-bottom 20px
            .pay-item
                background #fff
                border-radius 10px
                padding 30px
                .pay-title
                    font-size 18px
                    color #2B3A40
                .pay-money
                    font-size 32px
                    color #7ECEF4
                    margin 10px 0
                .pay-info
                    font-size 16px
                    color #666666
                    span
                        color #FF9E3F
    .pay-time, .pay-table
        margin 0 0 40px 50px
    .pay-table
        padding-right 50px
        .pay-table-info
            background #fff
            padding 20px
</style>