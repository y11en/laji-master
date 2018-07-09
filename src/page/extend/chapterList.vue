<template>
    <div class="charpter-list">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/bookdistribution' }">小说分销平台</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/bookdistribution/booklist/1' }">小说列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{bookInfoDetail.bookName}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row :gutter="24" class="contant" style="margin-left: 0; margin-right: 0;">
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <div class="book-info">
                    <img :src="bookInfoDetail.bookImage" alt="">
                    <p class="name">{{bookInfoDetail.bookName}}</p>
                    <p class="counts">{{'字数：' + bookInfoDetail.bookWorldCount}}</p>
                    <p class="desc">{{bookInfoDetail.bookIntroduction}}</p>
                </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <div class="charpter-table" v-loading="this.$store.state.user.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <p v-for="(tmp, index) in chapterList" :key="index">
                        <span>{{index + 1}}</span>
                        <span>{{tmp.chapterTitle}}</span>
                        <span>{{tmp.chapterIsvip === 0 ? '普通' : 'VIP'}}</span>
                        <span>{{tmp.releaseTime | time('long')}}</span>
                        <span @click="openDialog(tmp)"><i class="fa fa-link"></i> 生成推广链接</span>
                    </p>
                </div>
            </el-col>
        </el-row>

        <el-dialog class="dialog" title="生成推广链接" :visible.sync="dialogFormVisible" width="600px" @close="caralParams.newMediaId = ''">
            <div class="dialog-item">
                <p>渠道名称</p>
                <el-select v-model="caralParams.newMediaId" placeholder="请选择" @change="changeCaral()">
                    <el-option v-for="(item, index) in this.$store.state.census.dexuanList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="dialog-tool" style="text-align: right;">
                <el-button type="primary" @click="createLink()">生成链接</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            dialogFormVisible: false,
            caralParams: {
                newMediaName: '',
                newMediaId: '',
                bookName: '',
                bookId: '',
                chapterName: '',
                chapterId: '',
                url : ''
            }
        }
    },

    mounted() {
        this.$store.dispatch('user/bookShowBookInfo', { bookid: this.$route.params.bookId })
        this.$store.dispatch('user/chapterList', this.$route.params.bookId)
    },

    methods: {
        openDialog(value) {
            this.dialogFormVisible = true
            this.caralParams.chapterId = value.id
            this.caralParams.chapterName = value.chapterTitle
        },

        changeCaral() {
            for(let i=0; i<this.$store.state.census.spreadNameList.length; i++) {
                if(this.$store.state.census.spreadNameList[i].id == this.caralParams.newMediaId) {
                    this.caralParams.newMediaName = this.$store.state.census.spreadNameList[i].name
                }
            }
        },

        createLink() {
            if(this.caralObj === {}) {
                this.$message({ message: '请选择推广渠道！', type: 'warning', showClose: true })
            }else {
                this.caralParams.bookName = this.bookInfoDetail.bookName
                this.caralParams.bookId = this.bookInfoDetail.bookId
                this.caralParams.url = 'https://www.lajixs.com/referrals/index?chapterId=' +
                    this.caralParams.chapterId +
                    '&bookId=' + this.caralParams.bookId +
                    '&channelId=' + this.caralParams.newMediaId
                this.$store.dispatch('census/addExtensionLink', this.caralParams)
                this.dialogFormVisible = false
            }
        }
    },

    computed: {
        bookInfoDetail() {
            return this.$store.state.user.bookInfoDetail
        },
        chapterList() {
            return this.$store.state.user.chapterList
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.contant
    margin 20px 0
    width 100%
    .book-info
        img
            width 225px
            height 300px
        .name
            margin 10px 0
            font-size 18px
            font-weight 400
            font-family "Open Sans","Helvetica Neue", Helvetica,Arial,sans-serif
        .counts
            margin-top 10px
            font-size 14px
            color #777
        .desc
            margin-top 10px
            font-size 14px
            color #777
    .charpter-table
        padding 0 10px
        box-sizing border-box
        background #fff
        border 1px solid #ddd
        p
            padding 10px 15px
            border-bottom 1px solid #ddd
            span
                display inline-block
                font-size 14px
            span:nth-child(1)
                min-width 26px
            span:nth-child(2)
                color #23527c
                cursor pointer
            span:nth-child(2):hover
                text-decoration underline
            span:nth-child(3)
                color forestgreen
                font-size 12px
            span:nth-child(4)
                color #777
                margin-left 3px
            span:nth-child(5)
                float right
                color #337ab7
                cursor pointer
            span:nth-child(5):hover
                color #23527c
                text-decoration underline
        p:last-child
            border-bottom none
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
