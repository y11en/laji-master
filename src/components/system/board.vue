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
                            <div class="larry-table modole1">
                                <el-table :data="todayTopData" border stripe style="width: 100%; margin-bottom: 40px;">
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
                          <div class="larry-table">
                            <div id="todayClick" style="width: 100%; height: 400px;"></div>
                          </div>
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
                        <div class="panel-body today-click module3" :class="{hidden: module3 === true}">
                          <div class="larry-table" id="today">
                            <div id="chinaCensus" style="width: 100%; height: 500px;"></div>
                          </div>
                        </div>
                    </section>
                </el-col>
            </el-row>
        </div>
        <div ref="map" style="width: 100%; height: 600px;"></div>
    </div>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts'
import chinaMap from 'echarts/map/json/china.json'
export default{
  data() {
    return {
        module1: false,
        module2: false,
        module3: false,
        today: '',
        weekDay: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        // 中英文切换
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
            case 'WapPV':
                msg = 'WapPV'
                break
            case 'WapUV':
                msg = 'WapUV'
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
            default:
                msg = '未知'
            }
            return msg
        },

        // 当天各项统计数据数组
        todayData: [],
        // 各设备点击次数统计对象——echart
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
                data: ['安卓点击', 'PC点击', 'IOS点击', 'WapUV']
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

        // 当天 TOP10
        todayTopData: [],
        todayIPTopData: [],

        // 实时更新统计图
        watchInterval: null,
        xTime: [],
        uvData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        pvData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        qpsData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        watchOption: {
            title: {
                text: '实时监听点击数量'
            },
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['UV', 'PV', 'QPS' ]
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
            {
                name:'UV',
                type: 'line',
                itemStyle : { normal: {label : {show: true}}},
                data: this.uvData
            },
            {
                name:'PV',
                type: 'line',
                itemStyle : { normal: {label : {show: true}}},
                data: this.pvData
            },
            {
                name:'QPS',
                type: 'line',
                itemStyle : { normal: {label : {show: true}}},
                data: this.qpsData
            }
            ]
        },

        // 地图统计
        // ip
        geoCoordMap: {
            "上海市":[121.48, 31.22],
            "云南省":[105.60, 23.62],
            "内蒙古":[108.28, 41.12],
            "北京市":[116.46, 39.92],
            "台北市":[121.50, 25.05],
            "台南市":[120.19, 22.98],
            "吉林省":[126.57, 43.87],
            "天津市":[117.2, 39.13],
            "宁夏":[105.64, 36.56],
            "安徽省":[117.27, 31.86],
            "山东省":[120.33, 36.07],
            "山西省":[112.53, 37.87],
            "新疆":[87.68, 43.77],
            "江苏省":[118.78, 32.04],
            "河北省":[114.48, 38.03],
            "河南省":[113.65, 34.76],
            "浙江省":[120.19, 30.26],
            "海南省":[110.35, 20.02],
            "湖北省":[114.31, 30.52],
            "湖南省":[113.00, 28.21],
            "甘肃省":[103.73, 36.03],
            "福建省":[119.30, 26.08],
            "西藏":[91.11, 29.97],
            "贵州省":[106.71, 26.57],
            "辽宁省":[123.38, 41.80],
            "重庆市":[106.54, 29.59],
            "陕西省":[111.07,39.05],
            "黑龙江省":[126.63,	45.75]
        },
        option: {
            backgroundColor: '#404a59',
            title: {
                text: '全国主要城市登录量',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.name + ' : ' + params.value[2];
                }
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data:['访问量'],
                textStyle: {
                    color: '#fff'
                }
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                },
                itemSize: 30
            },
            visualMap: {
                min: 0,
                max: 300,
                splitNumber: 5,
                color: ['#d94e5d','#eac736','#50a3ba'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [
                {
                    name: '访问量',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: 12,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    }
                }
            ]
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

  mounted() {
    this.watchData()
  },

  beforeDestroy() {
    clearInterval(this.timing)
    clearInterval(this.watchInterval)
    window.removeEventListener('resize', this.canvasRepeat, false)
  },

  methods: {
    // 获取当前时间
    getToday() {
      var time = new Date()
      var month = time.getMonth() >= 10 ? time.getMonth() : '0' + time.getMonth()
      var second = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
      return time.getFullYear() + '年' + month + '月' + time.getDate() + '日 ' + this.weekDay[time.getDay()] + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + second
    },

    // 第三方IP接口
    IPCity(a, b) {
      var arr1 = [], arr2 = []
      for (let k = 0; k < a.length; k++) {
        var p = new Promise(function(resolve, reject) {
          var obj1 = new Object(), obj2 = new Object()
          arr1[k] = { title: a[k][1], num: a[k][0] }

          var ip = b[k][b[k].length - 1].replace(/[&\|\\\*^%$#,"@\-]/g, '')
          $.getScript('https://ip.ws.126.net/ipquery?ip=' + ip, function() {
            arr2[k] = {
              ipName: ip,
              ipNum: b[k][b[k].length - 2],
              ipAdd: localAddress.province + ' ' + localAddress.city
            }
            resolve()
          })
        })
      }
      p.then(() => {
        this.todayTopData = arr1
        this.todayIPTopData = arr2
      })
    },

    canvasRepeat() {
        document.getElementById('today').innerHTML = '<div id="todayClick" style="width: 100%; height: 270px;"></div>'
        echarts.init(document.getElementById('todayClick')).setOption(this.todayClickData, true)
    },

    // 请求/绘制当天统计数据
    responseTodayData(){
       this.$store.dispatch('getControlPanel').then(res => {
         if (res.returnCode === 200) {
          // 当天IP访问量
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
          // --------------------------------------------------------------------------------------------------------------------------------------------
          // 各设备点击次数统计
          var todayClick = res.data.accesslogAnalysisInfo
          // 地域数据统计
          var worldData = todayClick.provinceData
          var res = []
            for (let key in worldData) {
                var geoCoord = this.geoCoordMap[key]
                if (geoCoord) {
                    res.push({
                        name: key,
                        value: geoCoord.concat(worldData[key])
                    })
                }
            }
            res.unshift({name:'地区', value: ['经度', '纬度', '登录量']})
            this.option.series[0].data = res

            var chart = echarts.init(this.$refs.map)
            chart.showLoading()
            echarts.registerMap("china", chinaMap)
            chart.setOption(this.option)
            chart.hideLoading()

          delete todayClick.WapPV
          delete todayClick.totalIP
          delete todayClick.provinceData
          for (var key in todayClick) {
            var obj = new Object()
            obj.name = this.matchTitle(key)
            obj.value = todayClick[key]
            this.todayClickData.series[0].data.push(obj)
          }
          echarts.init(document.getElementById('todayClick')).setOption(this.todayClickData)
          // --------------------------------------------------------------------------------------------------------------------------------------------
          // 当天所有统计
          const todayObj = res.data
          delete todayObj.accesslogAnalysisInfo
          delete todayObj.VisitInfo
          for (var key in todayObj) {
            var obj = new Object()
            obj.name = this.matchTitle(key)
            obj.value = todayObj[key]
            this.todayData.push(obj)
          }
          // --------------------------------------------------------------------------------------------------------------------------------------------
        }
      })
    },

    // 实时更新统计图
    watchData() {
        var myChart = echarts.init(document.getElementById('chinaCensus'))
        this.$store.dispatch('getRefreshTime').then(res => {
            if(res.returnCode === 200) {
                this.uvData.push(res.data.UV)
                this.pvData.push(res.data.PV)
                this.qpsData.push(Number(res.data.QPS))
                var date = new Date().getTime()
                function dateForm(val) {
                    var newDate = new Date(val)
                    var hours = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()
                    var minutes = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()
                    var seconds = newDate.getSeconds() > 9 ? newDate.getSeconds() : '0' + newDate.getSeconds()
                    return hours + ':' + minutes + ':' + seconds
                }
                for(let i=0; i<10; i++) {
                    this.xTime.unshift(dateForm(date - i*3000))
                }
                this.watchOption.xAxis.data = this.xTime
                this.watchOption.series[0].data = this.uvData
                this.watchOption.series[1].data = this.pvData
                this.watchOption.series[2].data = this.qpsData
                myChart.setOption(this.watchOption, true)
                
                this.watchInterval = setInterval(() => {
                    this.$store.dispatch('getRefreshTime').then(res => {
                        if(res.returnCode === 200) {
                            this.uvData.shift()
                            this.pvData.shift()
                            this.qpsData.shift()
                            this.xTime.shift()
                            this.uvData.push(res.data.UV)
                            this.pvData.push(res.data.PV)
                            this.qpsData.push(Number(res.data.QPS))
                            this.xTime.push(dateForm(new Date().getTime()))
                        }
                    })
                    myChart.setOption({
                        xAxis: {
                            data: this.xTime
                        },
                        series: [
                            {
                                name:'UV',
                                type: 'line',
                                itemStyle : { normal: {label : {show: true}}},
                                data: this.uvData
                            },
                            {
                                name:'PV',
                                type: 'line',
                                itemStyle : { normal: {label : {show: true}}},
                                data: this.pvData
                            },
                            {
                                name:'QPS',
                                type: 'line',
                                itemStyle : { normal: {label : {show: true}}},
                                data: this.qpsData
                            }
                        ]
                    })
                }, 3000)
            }
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
            .module1
              height 1140px
            .module2
              height 440px
            .module3
              height 540px
            .hidden
              height 0px
              overflow hidden
              transition all .2s linear

</style>
