<template>
  <div class="census">
    <div id="allCensus"></div>
    <div class="trend-growth-title">
      <span>增长趋势</span>
      <span @click="active = 0" :class="{active: active === 0}">All</span>
      <span @click="active = 1" :class="{active: active === 1}"><i class="fa fa-android"></i> Android</span>
      <span @click="active = 2" :class="{active: active === 2}"><i class="fa fa-apple"></i> IOS</span>
      <span @click="active = 3" :class="{active: active === 3}"><i class="fa fa-mobile"></i> 手机站</span>
    </div>
    <div id="trendGrowth"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      active: 0,
      option1: {
        title: {
          text: '总量统计'
        },
        tooltip: {},
        legend: {
          data: ['All', 'Android', 'IOS', '手机站']
        },
        xAxis: {
          data: ['安装量', '注册量', '1日留存', '7日留存', '30日留存']
        },
        yAxis: {},
        series: [
          {
            name: 'All',
            type: 'bar',
            barWidth: 20,
            color: 'rgba(126,206,244,1)',
            data: [15, 20, 36, 10, 10]
          },
          {
            name: 'Android',
            type: 'bar',
            barWidth: 20,
            color: 'rgba(126,206,244,1)',
            data: [5, 20, 36, 10, 10]
          },
          {
            name: 'IOS',
            type: 'bar',
            barWidth: 20,
            color: 'rgba(255,155,76,1)',
            data: [5, 20, 36, 10, 10]
          },
          {
            name: '手机站',
            type: 'bar',
            barWidth: 20,
            color: 'rgba(200,155,76,1)',
            data: [0, 0, 20, 10, 10]
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  mounted() {
    echarts.init(document.getElementById('allCensus')).setOption(this.option1, true)
    echarts.init(document.getElementById('trendGrowth')).setOption(this.option2, true)
  },
  methods: {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#allCensus
  width 100%
  height 600px
  margin-top 60px
  background #fff
.trend-growth-title
  height 80px
  line-height 80px
  margin-top 60px
  background #fff
  border-bottom 2px solid rgba(226,226,226,1)
  span
    margin-right 20px
    padding 5px 10px
    font-size 16px
    font-family STHeitiTC-Light
    cursor pointer
  span:first-child
    margin 0 40px
    font-size 18px
    font-family PingFangHK-Regular
    cursor default
  span.active
    background rgba(126,206,244,1)
    color #fff
    border-radius 10px
#trendGrowth
  width 100%
  height 600px
  background #fff

</style>
