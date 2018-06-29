<template>
    <div class="date-component">
        <el-button class="date-name" @click="openDropDown = !openDropDown">{{dateName}} <i class="fa fa-sort-down"></i></el-button>
        <div class="drop-down-box">
            <el-collapse-transition>
                <div v-show="openDropDown">
                    <div class="transition-box" @click="handleCommandUp('按日查询')">
                        按日查询
                        <div class="change-date">
                            <el-date-picker
                                v-show="openDayOption"
                                v-model="dayValue"
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
                                v-show="openMonthOption"
                                v-model="beginMonth"
                                type="month"
                                placeholder="起始月份">
                            </el-date-picker>
                            <el-date-picker
                                v-show="openMonthOption"
                                v-model="endMonth"
                                type="month"
                                placeholder="结束月份">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="transition-box tool">
                        <el-button size="mini" type="danger" @click="handChangeDateUp()">确定</el-button>
                        <el-button size="mini" @click="openDropDown = false; openMonthOption = false; openDayOption = false;">取消</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dateName: '按日查询',
                openDropDown: false,
                openDayOption: false, // 打开日期选项
                dayValue: [], // 日期范围
                openMonthOption: false, // 打开月份选项
                beginMonth: '', // 起始月份
                endMonth: '', // 结束月份

                nowMode: ''
            }
        },
        methods: {
            handleCommandUp(command) {
                if(command === '按日查询') {
                    this.nowMode = command
                    this.openDayOption = true
                    this.openMonthOption = false
                }else if(command === '按月查询') {
                    this.nowMode = command
                    this.openDayOption = false
                    this.openMonthOption = true
                }
            },

            handChangeDateUp() {
                if(this.nowMode === '按日查询'){
                    if(this.dayValue[1] - this.dayValue[0] <= 1000*60*60*24*30) {
                        this.openDayOption = false
                        this.openMonthOption = false
                        this.openDropDown = false
                        this.dateName = '日: ' + this.FunWeekTime(this.dayValue[0]) + '-' + this.FunWeekTime(this.dayValue[1])
                        this.$emit('dateParam', [this.dateTiming(this.dayValue[0], 'start'), this.dateTiming(this.dayValue[1], 'end')], 'day')
                    }else {
                        this.$message({ message: '时间间隔不能超过一个月！', type: 'warning' })
                    }
                }else if(this.nowMode === '按月查询') {
                    if(this.endMonth === '' || this.beginMonth === '') {
                        this.$message({ message: '月份不能为空错误！', type: 'warning' })
                    }else if(this.endMonth - this.beginMonth < 0) {
                        this.$message({ message: '月份选取错误！', type: 'warning' })
                    }else {
                        this.openDayOption = false
                        this.openMonthOption = false
                        this.openDropDown = false
                        this.dateName = '月: ' + this.RecectMonth(this.beginMonth) + '-' + this.RecectMonth(this.endMonth)
                        this.$emit('dateParam', [this.dateTiming(this.beginMonth, 'start'), this.dateMonthTiming(this.endMonth.getTime())], 'month')
                    }
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.date-component
    display inline-block
    position relative
    button.date-name
        background #7ECEF4
        color #fff
        border-radius 10px
        font-size 18px
        outline none
        height 44px
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
