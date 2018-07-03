<template>
    <div class="book" v-loading="this.$store.state.census.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <template v-if="this.$store.state.userInfo.adminInfo.userName === '张三'">
            <canalID class="canal" @canalParam="canalParam"></canalID>
        </template>
        <p class="title">书籍统计</p>

        <div>
            <el-date-picker
                class="pay-time"
                v-model="dateList"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" round @click="search()" style="outline: none;">查&nbsp;&nbsp;&nbsp;询</el-button>
        </div>

        <div class="pay-table">
            <div class="pay-table-info">
                <el-table :data="bookTableObj.list" stripe style="width: 100%" border>
                    <el-table-column prop="bookName" label="书名"></el-table-column>

                    <!-- <el-table-column label="封面">
                        <template slot-scope="scope">
                            <img src="../../../static/img/beian1.png" alt="">
                        </template>
                    </el-table-column> -->

                    <el-table-column prop="sumPersionCount" label="订阅人数" :sortable="true">
                        <template slot-scope="scope">
                            {{scope.row.sumPersionCount ? scope.row.sumPersionCount : 0}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="sumChapterCount" label="订阅章数" :sortable="true">
                        <template slot-scope="scope">
                            {{scope.row.sumChapterCount ? scope.row.sumChapterCount : 0}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="sumPrice" label="订阅钱数（元）" :sortable="true">
                        <template slot-scope="scope">
                            {{(scope.row.sumPrice / 100).toFixed(2)}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="bookTableObj.pageNum"
            :page-size="bookTableObj.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="bookTableObj.total">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
import canalID from '../../components/census/canalID'
export default {
    components: { canalID },

    data() {
        return {
            dateList: [new Date(new Date()-1000*60*60*24*6), new Date()],
            bookParams: {
                page: this.$route.params.page,
                userCode: '',
                startdate: this.dateTiming(new Date().getTime()-1000*60*60*24*6, 'start'),
                enddate: this.dateTiming(new Date().getTime(), 'end'),
            }
        }
    },

    mounted() {
        if(JSON.parse(sessionStorage.getItem('user_info')).adminInfo.userName === '德绚') {
            this.bookParams.userCode = this.$store.state.census.spreadNameList[2].id
        }else {
            this.bookParams.userCode = this.$store.state.census.spreadNameList[0].id
        }
        this.$store.dispatch('census/getAdminSubscriptionStatisticsInfoByTime', this.bookParams)
    },

    methods: {
        search() {
            if(this.dateList[1] - this.dateList[0] <= 1000*60*60*24*31) {
                this.bookParams.startdate = this.dateTiming(this.dateList[0], 'start')
                this.bookParams.enddate = this.dateTiming(this.dateList[1], 'end')
                this.$store.dispatch('census/getAdminSubscriptionStatisticsInfoByTime', this.bookParams)
            }else{
                this.$message({ message: '时间间隔不能超过31天！', type: 'warning' })
            }
        },

        handleCurrentChange(page) {
            this.$router.push({ params: { page: page }})
        },

        canalParam(val) {
            this.bookParams.userCode = val
            this.$store.dispatch('census/getAdminSubscriptionStatisticsInfoByTime', this.bookParams)
        }
    },

    computed: {
        bookTableObj() {
            return this.$store.state.census.bookTableObj
        }
    },

    watch: {
        $route: function(val) {
            this.bookParams.page = val.params.page
            this.$store.dispatch('census/getAdminSubscriptionStatisticsInfoByTime', this.bookParams)
        }
    }
    
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.book
    .canal
        padding 0 50px
    .title
        font-size 18px
        color #666666
        margin 0 0 20px 50px
    .pay-time, .pay-table
            margin 0 0 40px 50px
        .pay-table
            padding-right 50px
            .pay-table-info
                background #fff
                padding 20px
    .page-counts
        padding 0 50px
</style>
