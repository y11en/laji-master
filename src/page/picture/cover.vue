<template>
<div class="wbc-wrapper clear" v-loading="this.$store.state.user.loading">
    <el-alert title="操作说明" type="info" class="mbt20" show-icon>
        <div>
            <p>此表为本站全部书籍封面，您可以直接预览审核</p>
        </div>
    </el-alert>

    <div class="wbcw-contain clearfix">
        <el-card v-if="bookInfoObj.list" v-for="(item, index) in bookInfoObj.list" :key="index" :body-style="{ padding: '0px' }">
            <router-link :to="'/book/info/'+item.bookId">
                <img :src="item.bookImage" class="image">
                <div class="mask">
                    <p class="tit">{{item.bookName}}</p>
                    <p class="author">{{item.writerName}}</p>
                </div>
            </router-link>
        </el-card>
    </div>

    <el-pagination
        class="mbt20"
        @current-change="handleCurrentChange"
        :current-page="bookInfoObj.pageNum"
        :page-size="bookInfoObj.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="bookInfoObj.total">
    </el-pagination>
</div>
</template>

<script type="text/ecmascript-6">
export default{
    data() {
        return {
            coverParams: {
                page: this.$route.params.page,
                orderParemeter: 'RIGHT (bookImage, 13)',
                paramType: 'query',
                img: 'cover',
                pageSize: '120'
            }
        }
    },

    methods: {
        handleCurrentChange(page) {
            this.$router.push({ params: { page: page }})
        }
    },

    created() {
        this.$store.dispatch('user/getBookInfoList', this.coverParams)
    },

    computed: {
        bookInfoObj() {
            return this.$store.state.user.bookInfoObj
        }
    },

    watch: {
        $route: function(val) {
            this.coverParams.page = val.params.page
            this.$store.dispatch('user/getBookInfoList', this.coverParams)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.wbc-wrapper
    clear left
    overflow hidden
    .el-card
        position relative
        float left
        width 82px
        height 110px
        margin 0 5px 20px
        overflow hidden
        a
          display inline-block
        &:hover
           .mask
              display block
        .mask
          position absolute
          top 0
          left 0
          color #fff
          font-size 12px
          padding 8px 5px
          box-sizing border-box
          display none
          width 100%
          height 100%
          line-height 1.2
          background-color rgba(0,0,0,0.35)
          .author
              margin-top 10px
        img
          width 100%
   
</style>
