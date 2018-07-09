<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/bookdistribution' }">小说分销平台</el-breadcrumb-item>
        <el-breadcrumb-item>推广链接</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="extend-search">
        <div class="search">
            <el-input v-model="searchInput" placeholder="小说或派单渠道名称"></el-input>
            <el-button type="primary" icon="el-icon-search"></el-button>
        </div>
    </div>

    <el-table class="extend-table" :data="extendLinkObj.list" border style="width: 100%">
        <el-table-column label="推广链接">
            <template slot-scope="scope">
                <p class="extend-media-name">{{scope.row.newMediaName}}</p>
                <p class="extend-url">
                    <span>{{scope.row.url}}</span>
                    <el-tooltip effect="dark" content="复制链接" placement="top">
                        <i class="fa fa-copy" v-clipboard="scope.row.url" @click="copyMessige()"></i>
                    </el-tooltip>
                </p>
                <p class="extend-time">创建时间：{{scope.row.addTime | extendTime()}}</p>
            </template>
        </el-table-column>

        <el-table-column label="入口页面">
            <template slot-scope="scope">
                <p class="extend-book-name"><router-link :to="'/extend/chapterList/'+scope.row.bookId">{{scope.row.bookName}}</router-link></p>
                <p class="extend-chapter">{{scope.row.chapterName}}</p>
            </template>
        </el-table-column>

        <el-table-column label="原文点击次数" width="150">
            <template slot-scope="scope">
                <span>{{scope.row.infoTotal | computedTotal()}}</span>
            </template>
        </el-table-column>

        <el-table-column label="访问记录" width="150" align="center">
            <template slot-scope="scope">
                <el-button class="primary" size="mini" @click="openDialogTable(scope.row.infoTotal)">详情</el-button>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <!-- <el-button class="more-btn" size="mini" @click="scope.row.show = !scope.row.show">
                    更多 <i class="fa fa-caret-down"></i>
                    <el-collapse-transition>
                        <ul class="tool-list" v-show="scope.row.show">
                            <li><a @click="openDialog(scope.row)"><i class="fa fa-edit"></i> 修改链接</a></li>
                            <li><a @click="deleteLink(scope.row)"><i class="fa fa-trash-o"></i> 删除</a></li>
                        </ul>
                    </el-collapse-transition>
                </el-button> -->
                <el-button class="more-btn" size="mini" @click="deleteLink(scope.row)"><i class="fa fa-trash-o"></i> 删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="extendLinkObj.pageNo"
        :page-size="extendLinkObj.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="extendLinkObj.totalCount">
    </el-pagination>

    <el-dialog class="dialog" title="修改推广链接属性" :visible.sync="dialogVisible" width="600px">
        <div class="dialog-item">
            <p>入口页面</p>
            <span>小说阅读页</span>
        </div>
        <div class="dialog-item">
            <p>渠道名称</p>
            <el-select v-model="updateParams.channelId" placeholder="请选择">
                <el-option v-for="(item, index) in this.$store.state.census.spreadNameList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </div>
        <div class="dialog-item">
            <p>阅读原文章节</p>
            <span>{{updateParams.chapterName}}</span>
        </div>
        <div class="dialog-tool" style="text-align: right;">
            <el-button type="primary">保存修改</el-button>
        </div>
    </el-dialog>

    <el-dialog class="dialog-table" title="访问记录" :visible.sync="dialogVisibleTable" width="600px">
        <el-table :data="recordList" stripe border>
            <el-table-column label="日期">
                <template slot-scope="scope">
                    <span>{{scope.row.date | extendTime()}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ipCount" label="IP点击数"></el-table-column>
            <el-table-column prop="totalCount" label="总数量"></el-table-column>
        </el-table>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            dialogVisible: false,
            dialogVisibleTable: false,
            searchInput: '',
            extendLinkParams: {
                page: 1,
                channelId: 'LGDMT20180627'
            },
            updateParams: {
                channelId: '',
                chapterName: '',
            },
            recordList: []
        }
    },

    mounted() {
        this.$store.dispatch('census/getExtensionLink', this.extendLinkParams)
    },

    methods: {
        openDialog(row) {
            this.updateParams.channelId = row.newMediaId
            this.updateParams.chapterName = row.chapterName
            this.dialogVisible = true
        },

        openDialogTable(arr) {
            this.recordList = arr
            this.dialogVisibleTable = true
        },

        copyMessige() {
            this.$message({ message: '复制成功！', type: 'success' })
        },

        deleteLink(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('census/deleteExtensionLink', { id: row._id }).then(res => {
                    this.$message({ type: 'success', message: res.msg })
                    this.$store.dispatch('census/getExtensionLink', this.extendLinkParams)
                })
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' })
            })
        },

        handleCurrentChange(page) {
            this.$router.push({ params: { page: page }})
        },
        
    },

    computed: {
        extendLinkObj() {
            return this.$store.state.census.extendLinkObj
        }
    },

    filters: {
        extendTime: (value) => {
            if (!value) return ''
            return value = value.toString().slice(0, 4) + '-' + value.toString().slice(4, 6) + '-' + value.toString().slice(6)
        },
        computedTotal: (value) => {
            if(value.length == 0) return 0
            var n = 0
            for(var i=0; i<value.length; i++) {
                n += value[i].totalCount
            }
            return n
        }
    },

    watch: {
        $route: function(val) {
            this.extendLinkParams.page = val.params.page
            this.$store.dispatch('census/getExtensionLink', this.extendLinkParams)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
.extend-search::after
    display block
    content ''
    clear both
.extend-search
    margin 20px 0
    .search
        float right
        .el-input
            width 160px
.extend-table
    margin-bottom 20px
    overflow visible
    font-size 14px
    .el-table__body-wrapper
        overflow visible
    .extend-url
        color #337ab7
        i
            color #393939
            cursor pointer
    .extend-time
        color #777
        font-size 13px
    .extend-book-name
        color #337ab7
        cursor pointer
    .extend-book-name:hover
        text-decoration underline
    .cell
        overflow visible
        .more-btn
            position relative
            background #87b87f
            outline none
            color #fff
            ul.tool-list
                position absolute
                z-index 100
                top 29px
                left -60px
                padding 5px 0
                min-width 160px
                background #fff
                text-align left
                box-shadow 0 2px 4px rgba(0,0,0,.2)
                a
                    display block
                    color #333
                    padding 5px 11px
                    white-space nowrap
                    font-size 14px
                    font-weight 400
                    i
                        width 12px
                        text-align center
                a:hover
                    background #4f99c6
                    color #fff
.dialog
    .dialog-item
        width 100%
        margin-bottom 20px
        height 40px
        line-height 40px
        p
            float left
            width 25%
            padding 0 15px
            box-sizing border-box
            text-align right



</style>
