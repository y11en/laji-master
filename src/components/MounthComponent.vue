<template>
<div class="mounth-component">
    <div class="mounth-header">
        <el-row>
            <h2>表格编辑器</h2>
            <i class="el-icon-close" @click="sendFather('close')"></i>
        </el-row>

        <el-row class="header-row">
            <el-date-picker style="width: 200px" class="fl" v-model="date" type="month" value-format="yyyy-MM" placeholder="选择月"></el-date-picker>
            <span>行数</span>
            <el-input-number size="small" v-model="rowNum" class="row-num"></el-input-number>
            <span>列数</span>
            <el-input-number size="small" v-model="colNum" :disabled="true" class="col-num"></el-input-number>
            <el-button type="primary" plain size="small" @click="createTable()">生成表格</el-button>
            <el-button type="primary" icon="el-icon-refresh" circle @click="repeat()"></el-button>
            <el-button type="primary" round class="submit-btn" @click="submitData()">提 交</el-button>
        </el-row>

        <el-row>
            <el-input type="textarea" resize="none" placeholder="复制区域" v-model="copyContent"></el-input>
        </el-row>
    </div>

    <div class="mounth-section">
        <el-row class="table-row">
            <el-input v-for="(item, index) in tableTitle" :key="index" v-model="tableTitle[index]" :disabled="true" class="table-col"></el-input>
        </el-row>

        <el-row v-for="(row, rowIndex) in tableArr" :key="rowIndex" class="table-row">
            <el-input v-for="(col, colIndex) in row" :key="colIndex" v-model="tableArr[rowIndex][colIndex]" class="table-col"></el-input>
        </el-row>
    </div>

    <!-- <div class="submit-box">
        <el-row>
            <el-button type="primary" round class="submit-btn" @click="submitData()">提 交</el-button>
        </el-row>
    </div> -->

</div>
</template>

<script type="text/ecmascript-6">
import querystring from 'querystring'
import ax from 'axios'
export default {

  title: '表格编辑器',

  data() {
    return {
      rowNum: 6,
      colNum: 6,
      tableArr: [],
      tableTitle: ['书籍编号', '书籍名称', '作者编号', '作者名称', '第三方', '考勤'],
      copyContent: '',
      date: ''
    }
  },
  created: function() {
        // this.createTable()
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth()
    this.date = year + '-' + month
  },
  methods: {

    sendFather(type) {
      if (type === 'close') { this.$emit('fromChild', false, 'close') } else { this.$emit('fromChild', false, 'succ') }
      this.tableArr = []
      this.copyContent = ''
    },

    repeat() {
      this.rowNum = 6
      this.colNum = 6
      this.tableArr = []
      this.copyContent = ''
    },

    createTable() {
      const arr = new Array()
      for (var r = 0; r < this.rowNum; r++) {
        arr[r] = new Array()
        for (var c = 0; c < this.colNum; c++) {
          arr[r][c] = ''
        }
      }
      this.tableArr = arr
    },

    submitData() {
      if (this.date !== '') {
        if (this.tableArr.length != 0) {
          const arr = this.tableArr
          const sendObj = {}
          const list = []
          for (var i = 0; i < arr.length; i++) {
            var obj = new Object()
            obj.bookid = arr[i][0] ? arr[i][0] : ''
            obj.bookName = arr[i][1] ? arr[i][1] : ''
            obj.authorid = arr[i][2] ? arr[i][2] : ''
            obj.authorName = arr[i][3] ? arr[i][3] : ''
            obj.thirdPart = arr[i][4] ? arr[i][4] : 0
            obj.checkworkattendance = arr[i][5] ? arr[i][5] : 0
            list[i] = obj
          }
          sendObj.data = new Object()
          sendObj.data.list = list
          sendObj.data = JSON.stringify(sendObj.data)
          sendObj.startdate = this.date + '-01 00:00:00'
          sendObj.enddate = this.date + '-31 23:59:59'
          this.$store.dispatch('generateMonthlyreport', sendObj).then(res => {
            this.$message({ message: '操作成功', type: 'success' })
            this.sendFather('succ')
          })
        } else this.$message({ message: '请编辑表格', type: 'warning' })
      } else this.$message({ message: '请选择时间', type: 'warning' })
    }

  },

  watch: {
    'copyContent': function(val) {
      var a = val.replace(/(^\s*)|(\s*$)/g, '')
      a = a.split('\n')
      for (var i = 0; i < a.length; i++) {
        a[i] = a[i].replace(/\s+/g, ' ')
        a[i] = a[i].replace(/(^\s*)|(\s*$)/g, '')
        a[i] = a[i].split(' ')
      }
      if (a[0][0] === '书籍编号') {
        a.shift()
      }
      this.tableArr = a
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
.mounth-component
    padding 20px
    
    .mounth-header
        .el-row
            margin-bottom 10px
            overflow hidden
            h2
                float left
            .el-icon-close
                float right
                line-height 31px
                cursor pointer
        .submit-btn
            float right
            margin-right 30px

    .mounth-section
        width 100%
        height 70%
        overflow-y scroll
        .table-row
            .table-col
                display inline-block
                width 15%
                height 40px
    // .submit-box


</style>
