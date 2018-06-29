<template>
    <div id="app">
        <header v-if="$route.name != 'login'">
            <template v-if="userName != null">
                <div class="index-title">
                    {{ userName == '德绚' ? '小说分销平台' : '辣鸡小说 后台管理'}}
                </div>
            </template>

            <ul class="header-right">
                <el-dropdown trigger="click" :class="{active: headerNavActive === 1}">
                    <span class="dropdown-toggle" @click="headerNav(1)">
                        <i class="fa fa-envelope"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">fffffffffffffffffffffffffffffff黄金糕</el-dropdown-item>
                        <el-dropdown-item command="d" divided>双皮奶</el-dropdown-item>
                        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
                <el-dropdown trigger="click" :class="{active: headerNavActive === 2}">
                    <span class="dropdown-toggle" @click="headerNav(2)">
                        <i class="fa fa-tasks"></i>
                        <!-- <i class="fa fa-sort-desc"></i> -->
                    </span>
                    <el-dropdown-menu slot="dropdown" class="task">
                        <el-dropdown-item command="a">
                        <div>
                            <i style="font-weight: bold; font-size: 13px">Task 1</i>
                            <span style="float: right; color: #999;">60% Component</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%;"></div>
                        </div>
                        </el-dropdown-item>
                        <el-dropdown-item command="d" divided>
                        <div>
                            <i style="font-weight: bold; font-size: 13px">Task 2</i>
                            <span style="float: right; color: #999;">20% Component</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
                        </div>
                        </el-dropdown-item>
                        <el-dropdown-item command="c" divided>
                        <div>
                            <i style="font-weight: bold; font-size: 13px">Task 3</i>
                            <span style="float: right; color: #999;">60% Component</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>
                        </div>
                        </el-dropdown-item>
                        <el-dropdown-item command="d" divided>
                        <div>
                            <i style="font-weight: bold; font-size: 13px">Task 3</i>
                            <span style="float: right; color: #999;">85% Component</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 85%;"></div>
                        </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown trigger="click" :class="{active: headerNavActive === 3}">
                    <span class="dropdown-toggle" @click="headerNav(3)">
                        <i class="fa fa-bell"></i>
                        <!-- <i class="fa fa-sort-desc"></i> -->
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">
                        <p></p>
                        </el-dropdown-item>
                        <el-dropdown-item command="d" divided>双皮奶</el-dropdown-item>
                        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>

                    <el-dropdown trigger="click" :class="{active: headerNavActive === 4}">
                    <span class="dropdown-toggle" @click="headerNav(4)">
                        <i class="fa fa-user"></i>
                        <!-- <i class="fa fa-sort-desc"></i> -->
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">
                        <p><i class="fa fa-user fa-fw"></i> User Profile</p>
                        </el-dropdown-item>
                        <el-dropdown-item command="d">
                        <p><i class="fa fa-cog fa-fw"></i> Settings</p>
                        </el-dropdown-item>
                        <el-dropdown-item command="e" divided>
                        <p @click="exit"><i class="fa fa-sign-out fa-fw"></i> Logout</p>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </ul>
            
            <!-- <router-link to="/sensitiveWord" class="notice-box">
                <img v-show="this.$store.state.hasNotice" src="./assets/image/icon/red.png" alt="">
                <img v-show="!this.$store.state.hasNotice" src="./assets/image/icon/gray.png" alt="">
            </router-link> -->
        </header>

        <nav v-if="$route.name != 'login'">
            <el-menu :default-active="currentUrl" class="main-nav" :unique-opened="true" router>
                <template v-for="(item, $index) in sideNavList">
                    <el-submenu v-if="item.ChildMenu && item.ChildMenu.length>0" :index="'0'+$index" :key="$index">
                        <template slot="title">
                            <img :src="item.icoURL" alt="">
                            <span slot="title">{{item.menuName}}</span>
                        </template>
                        <template v-for="(item2,index2) in item.ChildMenu">
                            <el-menu-item v-if="item2.menuName === 'ActiveMQ监控'" :index="item2.menuURL" :key="index2" @click="jump('ActiveMQ监控')">
                                ActiveMQ监控
                            </el-menu-item>
                            <el-menu-item v-else :key="index2" :index="item2.menuURL" :route="{path:item2.menuURL}">
                                {{item2.menuName}}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <template v-else>
                        <el-menu-item v-if="item.menuName === '任务调度'" :index="item.menuURL" @click="jump('任务调度')" :key="$index">
                            <img :src="item.icoURL" alt="">
                            <span slot="title">{{item.menuName}}</span>
                        </el-menu-item>
                        <el-menu-item v-else :index="item.menuURL" :route="{path:item.menuURL}" :key="$index">
                            <img :src="item.icoURL" alt="">
                            <span slot="title">{{item.menuName}}</span>
                        </el-menu-item>
                    </template>
                </template>

                <!-- <el-submenu index="/distribution/data">
                    <template slot="title">多媒体统计</template>
                    <el-menu-item index="/distribution/data">数据统计</el-menu-item>
                    <el-menu-item index="/distribution/book">书籍统计</el-menu-item>
                </el-submenu> -->
                
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
            userName: '',
            sideNavList: [],
            headerNavActive: 0
        }
    },

    methods: {
        getNavList() {
        const setList = () => {
            let info = JSON.parse(sessionStorage.getItem('user_info')),
            navList = JSON.parse(JSON.stringify(info.roleMenuList)),
            newNav = []

            this.$store.state.userInfo = info
            navList.forEach((item, $index) => {
            if (item.pid === 0) {
                navList[$index].show = false
                newNav.push(item)
            }
            })
            newNav.forEach((item1) => {
            navList.forEach((item2) => {
                if (item1.id === item2.pid) {
                if (!item1.ChildMenu) { item1.ChildMenu = [] }
                item1.ChildMenu.push(item2)
                }
            })
            })
            this.sideNavList = newNav
                    // console.log(this.sideNavList)
        }

        if (!sessionStorage.getItem('user_info')) {
            this.$ajax('/admin-RefreshRoleMenu', '', res => {
            if (res.returnCode === 200) {
                sessionStorage.setItem('user_info', JSON.stringify(res.data))
                setList()
            } else {
                this.$cookie('login_key', '', -1)
                this.$router.push('/login')
            }
            })
        } else {
            setList()
        }
        },

        exit() {
        this.$cookie('login_key', '', -1)
        sessionStorage.removeItem('user_info')
        this.$router.push('/login')
        },

        jump(val) {
        if (val === '任务调度') {
            window.open('http://118.31.165.113:8082/', 'newwindow', 'height=981,width=1500,top=150,left=190')
        } else if (val === 'ActiveMQ监控') {
            window.open('http://118.31.165.113:8161/', 'newwindow', 'height=981,width=1500,top=150,left=190')
        }
        },

        headerNav(val) {
        this.headerNavActive = val
        }
    },

    created() {
        this.getNavList()
    },

    computed: {
        currentUrl() {
        let href = this.$route.path
        if (this.$route.params.page) {
            href = href.substring(0, href.lastIndexOf('/'))
        }
        return href
        }
    },

    watch: {
        $route(to, from) {
            if (from.name === 'login') {
                this.getNavList()
            }
            if(to.name === 'login') {
                this.userName = JSON.parse(sessionStorage.getItem('user_info'))
            } else {
                this.userName = JSON.parse(sessionStorage.getItem('user_info')).adminInfo.userName
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
ul.el-dropdown-menu
    margin-top 3px !important
.task
    width 255px
       
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
        .header-right
            float right
            .el-dropdown
                cursor pointer
                outline none
                border none
                color #77C0FD
                .dropdown-toggle
                    position relative
                    display block
                    padding 19px 15px
                    .fa
                        margin-right 2px
                    .fa-sort-desc
                        position relative
                        bottom 3px
            .el-dropdown:hover
                background #225081
                text-decoration none
                color #fff
            .active
                background #225081
        .user-box
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
        min-height: 1450px
        box-sizing border-box
    .fade-enter-active, .fade-leave-active 
        transition opacity .2s
    
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
        opacity 0
</style>
