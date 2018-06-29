<template>
    <div class="canal">
        <div class="drop-down-canal">
            <el-button class="title" @click="showCanal = !showCanal">{{canalName}} <i class="fa fa-sort-down"></i></el-button>
            <div class="drop-down-box">
                <el-collapse-transition>
                    <div v-show="showCanal">
                        <div class="transition-box" @click="changeCanalId(tmp)" v-for="(tmp, index) in canalList" :key="index">{{tmp.name}}</div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            canalName: this.$store.state.census.spreadNameList[0].name,
            showCanal: false,
        }
    },
    
    methods: {
        changeCanalId(val) {
            this.canalName = val.name
            this.showCanal = false
            this.$emit('canalParam', val.id)
        }
    },

    computed: {
        canalList() {
            return this.$store.state.census.spreadNameList
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.canal
    position relative
    width 100%
    margin-top 20px
    text-align right
    .drop-down-canal
        .title
            color #64D228
            border 2px solid #64D228
            border-radius 10px
            font-size 18px
            outline none
            i
                position relative
                top -2px
                line-height 0px
                font-size 32px
        .drop-down-box
            position absolute
            top 45px
            right 0
            background #fff
            z-index 1000
            width 180px
            box-shadow border-box
            right 0
            background #fff
            border-radius 4px
            box-shadow 4px 4px 4px #888888
            text-align left
            .transition-box
                width 160px
                line-height 20px
                margin 8px 10px
                padding 3px 12px
                font-size 13px
                color #5d8aff
                border-radius 4px
                background #f5f5f5
                border 1px solid #f5f5f5
                cursor pointer
</style>
