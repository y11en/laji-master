<template>
    <div class="extend-book-list">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/bookdistribution' }">小说分销平台</el-breadcrumb-item>
            <el-breadcrumb-item>小说列表</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="search-box">
            <el-input placeholder="关键字" v-model="keywords" class="input-with-select" @keyup.enter.native="searchBook()">
                <el-select v-model="selectType" slot="prepend" placeholder="请选择">
                    <el-option label="书  名" value="bookName"></el-option>
                    <el-option label="作 者" value="writerName"></el-option>
                    <el-option label="书籍ID" value="bookId"></el-option>
                    <el-option label="作者ID" value="bookWriterId"></el-option>
                    <el-option label="手机号" value="userPhone"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchBook()"></el-button>
            </el-input>
        </div>

        <ul class="search-term">
            <li>
                <p>连载状态：</p>
                <span :class="{active: serialise === 0}" @click="searchBook('serialise', 0)">全部</span>
                <span :class="{active: serialise === 1}" @click="searchBook('serialise', 1)">连载中</span>
                <span :class="{active: serialise === 2}" @click="searchBook('serialise', 2)">已完结</span>
            </li>
            <li>
                <p>书籍状态：</p>
                <span :class="{active: bookType === 0}" @click="searchBook('bookType', 0)">全部</span>
                <span :class="{active: bookType === 1}" @click="searchBook('bookType', 1)">未审核</span>
                <span :class="{active: bookType === 2}" @click="searchBook('bookType', 2)">已审核</span>
                <span :class="{active: bookType === 3}" @click="searchBook('bookType', 3)">已上架</span>
            </li>
        </ul>

        <el-table class="table" :data="tableData.list" border stripe>
            <el-table-column label="封面" width="300" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.bookImage" alt="">
                </template>
            </el-table-column>

            <el-table-column label="名称">
                <template slot-scope="scope">
                    <router-link :to="'/extend/chapterList/' + scope.row.bookId" class="book-name">{{ scope.row.bookName }}</router-link>
                </template>
            </el-table-column>

            <el-table-column prop="writerName" label="作者名"></el-table-column>

            <el-table-column label="更新时间">
                <template slot-scope="scope">
                    <p>{{ scope.row.lastUpdateTime | time('long') }}</p>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="tableData.pageNum"
            :page-size="tableData.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="tableData.total">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            bookListParams: {
                page: 0,
                orderParemeter: 'bookId'
            },
            serialise: 0,
            bookType: 0,
            keywords: '',
            selectType: 'bookName'
        }
    },

    mounted() {
        this.bookListParams.page = this.$route.params.page
        this.$store.dispatch('user/getBookInfoList', this.bookListParams)
    },

    methods: {
        handleCurrentChange(page) {
            this.$router.push({ params: { page: page }})
        },

        searchBook(type, val) {
            if(type){
                if(type === 'serialise'){
                    this.serialise = val
                    if(val === 0) delete this.bookListParams.bookStatus
                    else if(val === 1) this.bookListParams.bookStatus = 0
                    else if(val === 2) this.bookListParams.bookStatus = 1
                }else if(type === 'bookType') {
                    this.bookType = val
                    if(val === 0) delete this.bookListParams.bookCheckStatus
                    else if(val === 1) this.bookListParams.bookCheckStatus = 0
                    else if(val === 2) this.bookListParams.bookCheckStatus = 1
                    else if(val === 3) this.bookListParams.bookCheckStatus = 2
                }
            }else {
                if(this.keywords != ''){
                    switch (this.selectType) {
                        case 'bookName':
                            this.bookListParams.bookName = this.keywords
                            break
                        case 'writerName':
                            this.bookListParams.writerName = this.keywords
                            break
                        case 'bookId':
                            this.bookListParams.bookId = this.keywords
                            break
                        case 'bookWriterId':
                            this.bookListParams.bookWriterId = this.keywords
                            break
                        case 'userPhone':
                            this.bookListParams.userPhone = this.keywords
                            break
                    }
                }else {
                    delete this.bookListParams.bookName
                    delete this.bookListParams.writerName
                    delete this.bookListParams.bookId
                    delete this.bookListParams.bookWriterId
                    delete this.bookListParams.userPhone
                }
            }
            this.$store.dispatch('user/getBookInfoList', this.bookListParams)
        }
    },

    computed: {
        tableData() {
            return this.$store.state.user.bookInfoObj
        }
    },

    watch: {
        $route: function(val) {
            this.bookListParams.page = val.params.page
            this.$store.dispatch('user/getBookInfoList', this.bookListParams)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
.search-box
    margin 20px 0
    .input-with-select
        width 400px
.search-term
    li::after
        content ""
        display block
        clear both
    li
        margin 10px 5px
        font-size 14px
        p
            float left
            line-height 29px
            color #777
        span
            cursor pointer
            display inline-block
            padding 4px 12px
            border-radius 4px
        span:hover
            background #428fd1
            color #fff
        span.active
            color #fff
            background #337ab7

.table
    .cell
        .book-name
            color #337ab7
            cursor pointer
        .book-name:hover
            text-decoration underline
</style>
