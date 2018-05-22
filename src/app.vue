<template>
    <div id="app">
        <header v-if="$route.name != 'login'">
            <div class="index-title">辣鸡小说 后台管理</div>
            <ul class="user-box">
                <li class="">
                    <span href="javascript:;">
                        <img src="./assets/image/pic/avatar.jpg">
                        {{$store.state.userInfo.userName}}
                    </span>
                    <span>基本资料</span>
                    <span>安全设置</span>
                </li>
                <li class="exit-btn"><span @click="exit">退出</span></li>
            </ul>
            <router-link to="/sensitiveWord" class="notice-box">
                <img v-show="this.$store.state.hasNotice" src="./assets/image/icon/red.png" alt="">
                <img v-show="!this.$store.state.hasNotice" src="./assets/image/icon/gray.png" alt="">
            </router-link>
        </header>

        <nav  v-if="$route.name != 'login'">
            <el-menu :default-active="currentUrl" class="main-nav" :unique-opened="true" router>
                <template v-for="(item, $index) in sideNavList">
                    <el-submenu v-if="item.ChildMenu && item.ChildMenu.length>0" :index="'0'+$index" :key="$index">
                        <template slot="title">
                            <img :src="item.icoURL" alt="">
                            <span slot="title">{{item.menuName}}</span>
                        </template>
                        <el-menu-item v-for="(item2,index2) in item.ChildMenu" :key="index2" :index="item2.menuURL" :route="{path:item2.menuURL}">
                            {{item2.menuName}}
                        </el-menu-item>
                    </el-submenu>
                    
                    <el-menu-item :index="item.menuURL" :route="{path:item.menuURL}" v-else :key="$index">
                        <img :src="item.icoURL" alt="">
                        <span slot="title">{{item.menuName}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </nav>

        <section :class="{'main-contain': $route.name != 'login' }">
            <transition name="fade">
                <router-view/>
            </transition>
        </section>
    </div>
</template>

<script>
import './assets/css/global.css'
import './assets/css/reset.styl'
export default {
    name: 'App',

    data() {
        return {
            sideNavList:[],
        }
    },
    
    methods:{
        getNavList(){
        let setList = ()=>{
            let info = JSON.parse(sessionStorage.getItem('user_info')),
            navList = JSON.parse(JSON.stringify(info.roleMenuList)),
            newNav = [];

            this.$store.state.userInfo = info;
            navList.forEach((item,$index)=>{
            if(item.pid===0){
                navList[$index].show = false
                newNav.push(item)
            }
            });
            newNav.forEach((item1)=>{
            navList.forEach((item2)=>{
                if(item1.id===item2.pid){
                if(!item1.ChildMenu){item1.ChildMenu=[];}
                item1.ChildMenu.push(item2)
                }
            })
            });
            this.sideNavList = newNav;
        };
        
        if(!sessionStorage.getItem('user_info')){
            this.$ajax("/admin-RefreshRoleMenu",'',res=>{
                if(res.returnCode===200){
                    sessionStorage.setItem('user_info',JSON.stringify(res.data));
                    setList()
                }else {
                    this.$cookie('login_key','',-1);
                    this.$router.push('/login');
                }
            });
        }else {
            setList()
        }
        
        },
        exit(){
        this.$cookie('login_key','',-1);
        sessionStorage.removeItem('user_info');
        this.$router.push('/login')
        }
    },

    created(){
        this.getNavList()
    },

    computed:{
        currentUrl () {
            let href = this.$route.path
            if(this.$route.params.page){
                href = href.substring(0, href.lastIndexOf('/'))
            }
            return href
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
    background #09192A
    header
        position relative
        height 60px
        .index-title
            float left
            width 200px
            height 100%
            text-align center
            color #fff
            font-size 16px
            line-height 60px
        .user-box
            float right
            overflow hidden
            li
                float left
                span
                    margin-right 10px
                    color #fff
                    font-size 14px
                    text-align center
                    line-height 60px
                    opacity .7
                    cursor pointer
                    img
                        width 30px
                        height 30px
        .notice-box
            position absolute
            z-index 9999
            width 80px
            height 40px
            margin-left -40px
            top 61px
            left 50%
            border-radius 0 0 10px 10px
            box-shadow 5px 5px 5px #888
            cursor pointer
            img
                width 100%
                height 100%
    nav
        display block
        position absolute
        width 200px
        z-index 1
        .main-nav
            background transparent
            border none
            .el-menu-item, .el-submenu__title
                color #fff
                border-bottom 1px solid rgba(107, 108, 109, 0.19)
            .el-menu-item:hover, .el-submenu__title:hover
                background #409EFF
            .el-menu--inline
                background #172D44
                .el-menu-item
                    border none
            .is-active
                background #225081
    section.main-contain
        display block
        background #E5EBF2
        margin: 0 0 0 200px
        padding: 15px 30px
        min-height: 1250px
        box-sizing border-box
    .fade-enter-active, .fade-leave-active 
        transition opacity .5s
    
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
        opacity 0
</style>
