<template>
<div class="wba-wrapper clear" v-loading="this.$store.state.user.loading">
    <el-alert title="操作说明" type="info" class="mbt20" show-icon>
        <div>
            <p>此表为本站全部用户头像，您可以直接预览审核</p>
        </div>
    </el-alert>
    
    <div class="wbcw-contain clearfix">
        <el-card v-if="avatarObj.list" v-for="(item, index) in avatarObj.list" :key="index" :body-style="{ padding: '0px' }">
            <router-link :to="'/user/info/'+item.userId">
                <img :src="item.userHeadPortraitURL" class="image">
                <div class="mask">
                    <p class="tit">{{item.pseudonym}}</p>
                </div>
            </router-link>
        </el-card>
    </div>

    <el-pagination
        class="mbt20"
        @current-change="handleCurrentChange"
        :current-page="avatarObj.pageNum"
        :page-size="avatarObj.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="avatarObj.total">
    </el-pagination>
</div>
</template>

<script type="text/ecmascript-6">
export default{
    data() {
        return {
            avatarParams: {
                page: this.$route.params.page,
                orderParemeter: 'RIGHT (userHeadPortraitURL, 13)',
                img: 'avatar',
                paramType: 'query',
                pageSize: '120'
            }
        }
    },

    created() {
        this.$store.dispatch('user/getUserList', { params: this.avatarParams, type: 'avatar' })
    },

    methods: {
        handleCurrentChange(page) {
            this.$router.push({ params: { page: page }})
        }
    },

    computed: {
        avatarObj() {
            return this.$store.state.user.avatarObj
        }
    },

    watch: {
        $route: function(val) {
            this.avatarParams.page = val.params.page
            this.$store.dispatch('user/getUserList', { params: this.avatarParams, type: 'avatar' })
        }
    }
    
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .wba-wrapper
    clear left
    overflow hidden
    .el-card
      position relative
      float left
      width 100px
      height 100px
      border-radius 50%
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
        font-size 14px
        padding 15px
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
