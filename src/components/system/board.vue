<template>
    <div class="admin-control-panel">
        <el-alert title="" class="hint">
            <p>{{'尊敬的admin，中午好！现在时间是：' + today + '，多云天气 18℃ ~ 26℃'}}</p>
        </el-alert>

        <div class="data-list">
            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="4" v-for="(item, index) in todayData" :key="index">
                    <div class="data-item">
                        <span class="data-icon"><i class="el-icon-location"></i></span>
                        <div class="data-msg">
                            <h1>{{item.value}}</h1>
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="data-system">
            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                    <section class="panel">
                        <div class="panel-header">
                            <span class="span-title">当日接口访问TOP10</span>
                            <span class="tools" @click="module1 = !module1">
                                <a href="javascript:;" class="el-icon-arrow-down" v-show="!module1"></a>
                                <a href="javascript:;" class="el-icon-arrow-up" v-show="module1"></a>
                            </span>
                        </div>
                        <div class="panel-body module1" :class="{hidden: module1 === true}">
                            <div class="larry-table">
                                <el-table :data="todayTopData" border stripe style="width: 100%">
                                    <el-table-column prop="title" label="接口名"></el-table-column>
                                    <el-table-column prop="num" label="接口次数"></el-table-column>
                                </el-table>
                                <el-table :data="todayIPTopData" border stripe style="width: 100%">
                                    <el-table-column prop="ipName" label="IP名"></el-table-column>
                                    <el-table-column prop="ipNum" label="IP次数"></el-table-column>
                                    <el-table-column prop="ipAdd" label="IP原地址"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </section>
                </el-col>

                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                    <section class="panel">
                        <div class="panel-header">
                            <span class="span-title">module2</span>
                            <span class="tools" @click="module2 = !module2">
                                <a href="javascript:;" class="el-icon-arrow-down" v-show="!module2"></a>
                                <a href="javascript:;" class="el-icon-arrow-up" v-show="module2"></a>
                            </span>
                        </div>
                        <div class="panel-body module2" :class="{hidden: module2 === true}">
                            
                        </div>
                    </section>

                    <section class="panel">
                        <div class="panel-header">
                            <span class="span-title">数据统计</span>
                            <span class="tools" @click="module3 = !module3">
                                <a href="javascript:;" class="el-icon-arrow-down" v-show="!module3"></a>
                                <a href="javascript:;" class="el-icon-arrow-up" v-show="module3"></a>
                            </span>
                        </div>
                        <div class="panel-body today-click" :class="{hidden: module3 === true}">
                            <div class="larry-table" id="today">
                                <div id="todayClick" style="width: 100%; height: 270px;"></div>
                            </div>
                        </div>
                    </section>
                </el-col>
            </el-row>
        </div>

        <!-- <div id="tswkCartogram" style="width: 100%; height:800px;"></div> -->
        <!-- <div id="watchCartogram" style="width: 100%; height:800px;"></div> -->
    </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
export default{
  data() {
    return {
      module1: false,
      module2: false,
      module3: false,

      today: '',
      getToday: () => {
        var time = new Date()
        var month = time.getMonth() >= 10 ? time.getMonth() : '0' + time.getMonth()
        var second = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
        return time.getFullYear() + '年' + month + '月' + time.getDate() + '日 ' + this.weekDay[time.getDay()] + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + second
      },
      weekDay: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      timing: null,

      matchTitle: function(val) {
        let msg = ''
        switch (val) {
          case 'androidV':
            msg = '安卓点击'
            break
          case 'iosV':
            msg = 'IOS点击'
            break
          case 'pcV':
            msg = 'PC点击'
            break
          case 'totalIP':
            msg = '总点击'
            break

          case 'NewBookRecordCount':
            msg = '新增小说'
            break
          case 'NewUserRecordCount':
            msg = '新增用户'
            break
          case 'updateBookCount':
            msg = '更新书籍数量'
            break
          case 'ExceptionRecordCount':
            msg = '异常数量'
            break
          case 'laJiao':
            msg = '总打赏'
            break
          case 'iosLoginCount':
            msg = 'IOS登录次数'
            break
          case 'pingLunHuiFu':
            msg = '评论回复'
            break
          case 'NewAuthorRecordCount':
            msg = '新增作者'
            break
          case 'VisitIPAddressStatistics':
            msg = '访问IP地址记录'
            break
          case 'wapLoginCount':
            msg = 'wap站登录次数'
            break
          case 'jianTie':
            msg = '总间帖'
            break
          case 'NewSaveRecordCount':
            msg = '收藏'
            break
          case 'SignCount':
            msg = '签约数量'
            break
          case 'androidLoginCount':
            msg = '安卓登录次数'
            break
          case 'pingLun':
            msg = '总评论'
            break
          case 'tuiJianPiao':
            msg = '总推荐'
            break
          case 'NewChapterRecordCount':
            msg = '新增章节'
            break
          case 'TotalClick':
            msg = '总点击量'
            break
          case 'pcLoginCount':
            msg = 'PC端登录次数'
            break
          case 'ReadRecordCount':
            msg = '阅读记录'
            break
          case 'dinYue':
            msg = '总订阅'
            break

          case 'IosClickCount':
            msg = 'IOS点击'
            break
          case 'LoginCount':
            msg = '登录'
            break
          case 'MessageRecordCount':
            msg = '私信条数'
            break
          case 'signCount':
            msg = '签到人数'
            break
          case 'nowRersionNum':
            msg = '登录人次'
            break
          case 'IllegalIpAddressList':
            msg = '独立IP'
            break
          case 'jinPiao':
            msg = '总金票'
            break
          case 'AndroidDownLoadCount':
            msg = '安卓下载次数'
            break
          case 'IosDownLoadCount':
            msg = 'IOS下载次数'
            break
          case 'iosClickCount':
            msg = '当日IOS点击数量'
            break
          case 'dataTimes':
            msg = '当日日期'
            break
          case 'androidAppLoginCount':
            msg = '当日安卓登录数量'
            break
          case 'appClickCount':
            msg = '当日APP点击数量'
            break
          case 'appDownLoad':
            msg = '当日APP下载数量'
            break
          case 'bugCount':
            msg = '当日BUG数量'
            break
          case 'independentIPAddress':
            msg = '当日独立IP登录数量'
            break
          case 'iosAppDownLoad':
            msg = '当日IOS下载数量'
            break
          case 'iosAppLoginCount':
            msg = '当日IOS登录数量'
            break
          case 'longCount':
            msg = '当日总登录数量'
            break
          case 'messageCount':
            msg = '当天消息数量'
            break
          case 'newAuthorCount':
            msg = '当天新增作者数量'
            break
          case 'newBookCount':
            msg = '当天新增书籍数量'
            break
          case 'newChapterCount':
            msg = '当天新增章节数量'
            break
          case 'newUserCount':
            msg = '当天新增用户数量'
            break
          case 'readCount':
            msg = '当天阅读数量'
            break
          case 'tatalGoldenTicket':
            msg = '当天金椒数量'
            break
          case 'totalClicks':
            msg = '当天点击总数量'
            break
          case 'totalComment':
            msg = '当天评论数量'
            break
          case 'totalMakeComplaints':
            msg = '当天投诉数量'
            break
          case 'totalRecommend':
            msg = '当天推荐数量'
            break
          case 'totalReply':
            msg = '当天回复数量'
            break
          case 'totalReward':
            msg = '当天奖金数量'
            break
          case 'totalSave':
            msg = '当天收藏数量'
            break
          case 'totalSubscriptions':
            msg = '当天订阅数量'
            break
          case 'wapAppLoginCount':
            msg = '移动设备登录数量'
            break
          case 'webLoginCount':
            msg = 'PC登录数量'
            break

          case '/api/person-info':
            msg = '查询用户信息'
            break
          case '/api/book-bookInfo':
            msg = '获取书籍信息'
            break
          case '/api/comm-HotCommentInfo':
            msg = '加载热评'
            break
          case '/api/book-read':
            msg = '阅读小说'
            break
          case '/api/userRmemberChose':
            msg = 'getRmemberChose'
            break
          case '/api/bookshelf-recommendPosition':
            msg = '获取书架推荐'
            break
          case '/api/user-signinstate':
            msg = '校验用户是否签到'
            break
          case '/api/bookshelf-getuserbookshelf':
            msg = '获取用户书架'
            break
          case '/api/hot/homePageRecommended':
            msg = '加载首页推荐位APP数据'
            break
          case '/api/comm-getcomminfo':
            msg = '获取评论信息'
            break
          case '/api/person-messageCount':
            msg = '获取用户私信条数'
            break
          default:
            msg = '未知'
        }
        return msg
      },

            // 当天各项统计数据数组
      todayData: [],
            // 当天各设备点击数据对象——echart
      todayClickData: {
        title: {
          text: '各设备点击次数统计',
                    // subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['安卓点击', 'PC点击', 'IOS点击']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },

      tswkOption: {
        title: {
          text: '本周数据统计图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: []
      },
            // 一周数据统计
      tswk: function() {
        this.$store.dispatch('getSiteaccessrecordsInfo').then(res => {
          if (res.returnCode === 200) {
            const tswkList = res.data.list
            for (var i = 0; i < tswkList.length; i++) {
              delete tswkList[i].id
              delete tswkList[i].dataTimes
              if (i === 0) {
                for (var key in tswkList[i]) {
                  var obj = new Object()
                  obj.name = this.matchTitle(key)
                  obj.type = 'line'
                  obj.stack = key
                  obj.data = []
                  obj.data.push(Number(tswkList[i][key]))
                  this.tswkOption.series.push(obj)
                  this.tswkOption.legend.data.push(this.matchTitle(key))
                }
              } else {
                for (var key in tswkList[i]) {
                  for (var k = 0; k < this.tswkOption.series.length; k++) {
                    if (this.tswkOption.series[k].name === this.matchTitle(key)) {
                      this.tswkOption.series[k].data[i] = Number(tswkList[i][key])
                    }
                  }
                }
              }
            }
            var tswkChart = echarts.init(document.getElementById('tswkCartogram'), 'dark')
            tswkChart.setOption(this.tswkOption)
          }
        })
      },
            // 当天 TOP10
      todayTopData: [],
      todayIPTopData: [],

      watchOption: {
        title: {
          text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0]
            var date = new Date(params.name)
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: []
        }]
      }
    }
  },

  created() {
    this.timing = setInterval(() => {
      this.today = this.getToday()
    }, 1000)
    this.responseTodayData()
    window.addEventListener('resize', this.canvasRepeat)
  },

  beforeDestroy() {
    clearInterval(this.timing)
    window.removeEventListener('resize', this.canvasRepeat, false)
  },

  methods: {
    canvasRepeat() {
      document.getElementById('today').innerHTML = '<div id="todayClick" style="width: 100%; height: 270px;"></div>'
      echarts.init(document.getElementById('todayClick')).setOption(this.todayClickData, true)
    },

        // 请求/绘制当天统计数据
    responseTodayData: function() {
      this.$store.dispatch('getControlPanel').then(res => {
        if (res.returnCode === 200) {
          var todayTopDate = res.data.VisitInfo.split('\n')
          if(todayTopDate != ''){
            var a = todayTopDate.slice(1, 11)
            var b = todayTopDate.slice(11)
            for (let i = 0; i < a.length; i++) {
              a[i] = a[i].split(' ')
              b[i] = b[i].split(' ')
            }
            this.IPCity(a, b)
          }
                    // ----------------------------------------------------------------------
          var todayClick = res.data.accesslogAnalysisInfo
          delete todayClick.totalIP
          for (var key in todayClick) {
            var obj = new Object()
            obj.name = this.matchTitle(key)
            obj.value = todayClick[key]
            this.todayClickData.series[0].data.push(obj)
          }
          echarts.init(document.getElementById('todayClick')).setOption(this.todayClickData)
                    // ----------------------------------------------------------------------
          const todayObj = res.data
          delete todayObj.accesslogAnalysisInfo
          delete todayObj.VisitInfo
          for (var key in todayObj) {
            var obj = new Object()
            obj.name = this.matchTitle(key)
            obj.value = todayObj[key]
            this.todayData.push(obj)
          }
        }
      })
    },

        // 第三方IP接口
    IPCity: function(a, b) {
      var arr1 = [], arr2 = []
      for (let k = 0; k < a.length; k++) {
        var p = new Promise(function(resolve, reject) {
          var obj1 = new Object(), obj2 = new Object()
          arr1[k] = { title: a[k][1], num: a[k][0] }

          var ip = b[k][b[k].length - 1].replace(/[&\|\\\*^%$#,"@\-]/g, '')
          $.getScript('https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + ip, function() {
            arr2[k] = {
              ipName: ip,
              ipNum: b[k][b[k].length - 2],
              ipAdd: remote_ip_info['province'] + ' ' + remote_ip_info['city']
            }
            resolve()
          })
        })
      }
      p.then(() => {
        this.todayTopData = arr1
        this.todayIPTopData = arr2
      })
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.admin-control-panel
    .hint
        margin-bottom 10px
        height 50px
        background #f2dede
        p
            color #a94442
    .data-list
        overflow hidden
        .el-col
            .data-item
                position relative
                border 1px solid transparent
                box-sizing border-box
                height 85px
                border-radius 5px
                background #fff
                margin-bottom 20px
                .data-icon
                    position absolute
                    width 38%
                    height 83px
                    left 0
                    top 0
                    background red
                    text-align center
                    line-height 83px
                    font-size 3em
                    color #fff
                .data-msg
                    position absolute
                    width 60%
                    height 83px
                    top 0
                    right 0
                    text-align center
                    h1
                        height 45px
                        line-height 45px
                        padding-top 8px
                        font-size 30px
                        font-weight 300
                        color #979DAF
                        box-sizing border-box
                        font-family Arial,Helvetica,sans-serif
                    p
                        height 30px
                        line-height 30px
                        padding-top 1px
                        color #979DAF
                        font-size 14px
                        box-sizing border-box
                        font-family Arial,Helvetica,sans-serif
            .data-item:first-child
                margin-left 0
            .data-item:last-child
                margin-right 0
    .data-system
        width 100%
        .panel
            background #fff
            margin-bottom 20px
            border 1px solid transparent
            border-radius 4px
            box-shadow 0 1px 1px rgba(0,0,0,.05)
            .panel-header
                border-color #eff2f7
                font-size 14px
                font-weight 300;
                padding 15px 20px
                padding-left 15px
                border 0
                border-bottom 1px solid #EEEFF1
                .span-title
                    font-size 16px
                    color #333
                    font-family "Microsoft YaHei"
                    font-weight 400
                .tools
                    float right
                    a
                        font-weight bold
                        color #e2e2e2
                        margin-left 10px
            .panel-body
                overflow hidden
                transition all .2s linear
                .larry-table
                    margin 15px
                    margin-top 20px
                    margin-bottom 20px
            .today-click
                height 310px
            .hidden
                height 0px
                overflow hidden
                transition all .2s linear

</style>
