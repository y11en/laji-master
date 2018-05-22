<template>
    <div class="admin-index-wrap">
        <div id="todayCartogram" style="width: 50%; height: 300px;"></div>
        <div id="tswkCartogram" style="width: 100%;height:800px;"></div>
        <div id="watchCartogram" style="width: 100%;height:800px;"></div>
    </div>
</template>

<script type="text/ecmascript-6">
const echarts = require('echarts')
export default{
    data(){
        return{

            matchTitle: function(val) {
                let msg = ''
                switch (val){
                    case 'AndroidClickCount':
                        msg = '安卓点击';
                        break;
                    case 'ExceptionRecordCount':
                        msg = '异常数量';
                        break;
                    case 'IosClickCount':
                        msg = 'IOS点击';
                        break;
                    case 'LoginCount':
                        msg = '登录';
                        break;
                    case 'MessageRecordCount':
                        msg = '私信条数';
                        break;
                    case 'NewSaveRecordCount':
                        msg = '收藏';
                        break;
                    case 'ReadRecordCount':
                        msg = '阅读记录';
                        break;
                    case 'signCount':
                        msg = '签到人数';
                        break;
                    case 'androidLoginCount':
                        msg = '安卓登录次数';
                        break;
                    case 'iosLoginCount':
                        msg = 'IOS登录次数';
                        break;
                    case 'pcLoginCount':
                        msg = 'PC端登录次数';
                        break;
                    case 'wapLoginCount':
                        msg = 'wap站登录次数';
                        break;
                    case 'nowRersionNum':
                        msg = '登录人次';
                        break;
                    case 'IllegalIpAddressList':
                        msg = '独立IP';
                        break;
                    case 'laJiao':
                        msg = '总打赏';
                        break;
                    case 'dinYue':
                        msg = '总订阅';
                        break;
                    case 'tuiJianPiao':
                        msg = '总推荐';
                        break;
                    case 'pingLun':
                        msg = '总评论';
                        break;
                    case 'jinPiao':
                        msg = '总金票';
                        break;
                    case 'jianTie':
                        msg = '总间帖';
                        break;
                    case 'pingLunHuiFu':
                        msg = '评论回复';
                        break;
                    case 'AndroidDownLoadCount':
                        msg = '安卓下载次数';
                        break;
                    case 'IosDownLoadCount':
                        msg = 'IOS下载次数';
                        break;
                    case 'NewBookRecordCount':
                        msg = '新增小说';
                        break;
                    case 'NewChapterRecordCount':
                        msg = '新增章节';
                        break;
                    case 'NewUserRecordCount':
                        msg = '新增用户';
                        break;
                    case 'NewAuthorRecordCount':
                        msg = '新增作者';
                        break;
                    case 'updateBookCount':
                        msg = '更新书籍数量';
                        break;

                    case 'iosClickCount':
                        msg = '当日IOS点击数量';
                        break;
                    case 'dataTimes':
                        msg = '当日日期';
                        break;
                    case 'androidAppLoginCount':
                        msg = '当日安卓登录数量';
                        break;
                    case 'appClickCount':
                        msg = '当日APP点击数量';
                        break;
                    case 'appDownLoad':
                        msg = '当日APP下载数量';
                        break;
                    case 'bugCount':
                        msg = '当日BUG数量';
                        break;
                    case 'independentIPAddress':
                        msg = '当日独立IP登录数量';
                        break;
                    case 'iosAppDownLoad':
                        msg = '当日IOS下载数量';
                        break;
                    case 'iosAppLoginCount':
                        msg = '当日IOS登录数量';
                        break;
                    case 'longCount':
                        msg = '当日总登录数量';
                        break;
                    case 'messageCount':
                        msg = '当天消息数量';
                        break;
                    case 'newAuthorCount':
                        msg = '当天新增作者数量';
                        break;
                    case 'newBookCount':
                        msg = '当天新增书籍数量';
                        break;
                    case 'newChapterCount':
                        msg = '当天新增章节数量';
                        break;
                    case 'newUserCount':
                        msg = '当天新增用户数量';
                        break;
                    case 'readCount':
                        msg = '当天阅读数量';
                        break;
                    case 'tatalGoldenTicket':
                        msg = '当天金椒数量';
                        break;
                    case 'totalClicks':
                        msg = '当天点击总数量';
                        break;
                    case 'totalComment':
                        msg = '当天评论数量';
                        break;
                    case 'totalMakeComplaints':
                        msg = '当天投诉数量';
                        break;
                    case 'totalRecommend':
                        msg = '当天推荐数量';
                        break;
                    case 'totalReply':
                        msg = '当天回复数量';
                        break;
                    case 'totalReward':
                        msg = '当天奖金数量';
                        break;
                    case 'totalSave':
                        msg = '当天收藏数量';
                        break;
                    case 'totalSubscriptions':
                        msg = '当天订阅数量';
                        break;
                    case 'wapAppLoginCount':
                        msg = '移动设备登录数量';
                        break;
                    case 'webLoginCount':
                        msg = 'PC登录数量';
                        break;
                    default:
                        msg = '未知'
                    }
                return msg
            },

            randomData: function() {
                now = new Date(+now + oneDay);
                value = value + Math.random() * 21 - 10;
                return {
                    name: now.toString(),
                    value: [
                        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                        Math.round(value)
                    ]
                }
            },

            todayWidth: 0,

            todayOption: {
                title: {
                    text: '当日数据统计'
                },
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                    y2: 140
                },
                xAxis : [
                    {
                        type : 'category',
                        data : [],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel:{  
                            interval:0,//横轴信息全部显示
                            rotate:-30,//-30度角倾斜显示
                        }  
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'number',
                        type:'bar',
                        barWidth: '60%',
                        data:[]
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
                    data:[]
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
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            },

            watchOption: {
                title: {
                    text: '动态数据 + 时间坐标轴'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
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

    mounted() {
        this.$store.dispatch('getControlPanel').then(res => {
            if(res.returnCode===200){
                delete res.data.TotalClick
                res.data.AndroidClickCount = res.data.clickIPINFo.androidV
                res.data.IosClickCount = res.data.clickIPINFo.iosV
                res.data.pcClickCount = res.data.clickIPINFo.pcV
                res.data.TotalClick = res.data.clickIPINFo.totalIP
                var widthNum = 0
                for(var item in res.data){
                    this.todayOption.xAxis[0].data.push(this.matchTitle(item))
                    this.todayOption.series[0].data.push(Number(res.data[item]))
                    widthNum++
                }
                this.todayWidth = widthNum * 2
                let todayChart = echarts.init(document.getElementById('todayCartogram'))
                todayChart.setOption(this.todayOption)
            }
        })

        // this.$store.dispatch('getSiteaccessrecordsInfo').then(res => {
        //     if(res.returnCode === 200){
        //         let tswkList = res.data.list
        //         for(var i=0; i<tswkList.length; i++) {
        //             delete tswkList[i].id
        //             delete tswkList[i].dataTimes
        //             if(i === 0){
        //                 for(var key in tswkList[i]){
        //                     var obj = new Object()
        //                     obj.name = this.matchTitle(key)
        //                     obj.type = 'line'
        //                     obj.stack = key
        //                     obj.data = []
        //                     obj.data.push(Number(tswkList[i][key]))
        //                     this.tswkOption.series.push(obj)
        //                     this.tswkOption.legend.data.push(this.matchTitle(key))
        //                 }
        //             }else{
        //                 for(var key in tswkList[i]){
        //                     for(var k=0; k<this.tswkOption.series.length; k++){
        //                         if(this.tswkOption.series[k].name === this.matchTitle(key)){
        //                             this.tswkOption.series[k].data[i] = Number(tswkList[i][key])
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //         var tswkChart = echarts.init(document.getElementById('tswkCartogram'), 'dark')
        //         tswkChart.setOption(this.tswkOption)
        //     }
        // })

    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
