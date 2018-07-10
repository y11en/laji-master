<template>
<div class="admin-book-wrap">
    <el-alert title="操作说明" type="info" show-icon>
        <div>
            <p>
                此表为本站全部书籍列表，您可以通过相应书籍ID来批量管理，也可以通过
                <router-link class="red" :to="{name:'addNewBook'}">新建书籍</router-link>来添加新书
            </p>
        </div>
    </el-alert>
   
    <el-row class="mbt20">
        <el-col :xs="20" :sm="16" :md="12" :lg="9" :xl="6">
            <el-input placeholder="请输入内容" v-model="keywords" class="input-with-select" @keyup.enter.native="searchBook">
                <el-select v-model="selectType" slot="prepend" placeholder="请选择">
                    <el-option label="书  名" value="bookName"></el-option>
                    <el-option label="作 者" value="writerName"></el-option>
                    <el-option label="书籍ID" value="bookId"></el-option>
                    <el-option label="作者ID" value="bookWriterId"></el-option>
                    <el-option label="手机号" value="userPhone"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchBook"></el-button>
            </el-input>
        </el-col>
    </el-row>
    
    <el-row>
        <el-table
            ref="multipleTable"
            :data="bookList.list"
            border
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" aligin="center"></el-table-column>

            <el-table-column align="center" prop="bookId" label="ID"></el-table-column>
    
            <el-table-column prop="bookName" label="书名"></el-table-column>
            
            <el-table-column prop="writerName" label="作者"></el-table-column>
    
            <el-table-column align="center" prop="bookStatus" label="连载">
                <template slot-scope="scope">
                    <span class="el-dropdown-link" :class="!scope.row.bookStatus?'success':'primary'">
                        {{!scope.row.bookStatus?'连载中':'已完结'}}
                    </span>
                </template>
            </el-table-column>
    
            <el-table-column align="center" prop="bookCheckStatus" label="审核">
                <template slot-scope="scope">
                    <span class="el-dropdown-link" :class="scope.row.bookCheckStatus?'success':'primary'">
                        {{scope.row.bookCheckStatus?"已审核":"未审核"}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="bookStatus" label="上架">
                <template slot-scope="scope">
                    <span class="el-dropdown-link" :class="scope.row.bookCheckStatus===2?'success':'primary'">
                        {{scope.row.bookCheckStatus==2?"已上架":"未上架"}}
                    </span>
                </template>
            </el-table-column>
    
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <span >{{ scope.row.bookCreatedTime | time('long') }}</span>
                </template>
            </el-table-column>

            <el-table-column label="更新时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.lastUpdateTime | time('long') }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="bookWorldCount" label="字数" align="center"></el-table-column>
    
            <el-table-column
                class="last-column"
                v-if="$store.state.userInfo && $store.state.userInfo.adminRolemenuanduserrole.updates"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <a href="javascript:0;">详情</a>
                    <i class="fa fa-eye" @click="openDialog(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
      
        <el-pagination
            class="mbt20"
            background
            @current-change="handleCurrentChange"
            :current-page="bookList.pageNum"
            :page-size="bookList.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="bookList.total">
        </el-pagination>
    </el-row>

    <el-dialog title="提示" :visible.sync="outerVisible">
        <p class="title">请选择时间</p>
        <el-date-picker
          v-model="timeRange"
          type="date"
          style="margin: 20px 0"
          placeholder="选择日期">
        </el-date-picker>

        <el-button @click="queryInfo()" type="primary" round style="float: right; margin: 20px;">查 询</el-button>

        <el-table  :data="performanceReview" style="width: 100%; margin-bottom: 40px" border>
          <el-table-column prop="bookTitle" label="书籍名称"></el-table-column>
          <el-table-column prop="sumWorld1" label="发布字数"></el-table-column>
          <el-table-column prop="counts1" label="发布数量"></el-table-column>
          <el-table-column prop="sumWorld2" label="创建字数"></el-table-column>
          <el-table-column prop="counts2" label="创建数量"></el-table-column>
          <el-table-column prop="releaseTime" label="发布是否过审">
            <template slot-scope="scope">
              <i class="el-icon-success" v-if="scope.row.releaseTime >= 7"></i>
              <i class="el-icon-error" v-if="scope.row.releaseTime < 7"></i>
            </template>
          </el-table-column>
          <el-table-column label="创建是否过审">
            <template slot-scope="scope">
              <i class="el-icon-success" v-if="scope.row.createUpdateCount >= 7"></i>
              <i class="el-icon-error" v-if="scope.row.createUpdateCount < 7"></i>
            </template>
          </el-table-column>
          <el-table-column prop="counts2" label="操作">
            <template slot-scope="scope">
              <el-button @click="chapterInfoByTime()" type="text" size="small">更新预览</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <el-table :data="byTimeData" style="width: 100%" border height="300">
          <el-table-column prop="bookId" label="ID"></el-table-column>
          <el-table-column prop="bookTitle" label="书籍名"></el-table-column>
          <el-table-column prop="chapterTitle" label="章节名"></el-table-column>
          <el-table-column prop="chapterLength" label="章节字数"></el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span >{{ scope.row.createChapterTime | time('long') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布时间">
            <template slot-scope="scope">
                <span >{{ scope.row.releaseTime | time('long') }}</span>
            </template>
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">关 闭</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
export default{

  components: {
    'pic-cropper': () => require('../../components/img_upload.vue')
  },

  data() {
    return {
      bookList: {},
      updateData: {},
      multipleSelection: [],
      keywords: '',
      selectType: 'bookName',
      outerVisible: false,
      innerVisible: false,
      timeRange: [],
      bookId: '',
      performanceReview: [],
      byTimeData: []
    }
  },

  methods: {
    getBookList() {
      const searchValue = {
        page: this.$route.params.page,
        orderParemeter: 'bookId'
      }
      const val = this.$http.trim(this.keywords)
      if (this.selectType && val) {
        if ((this.selectType === 'bookId' || this.selectType === 'bookWriterId') && !Number(val)) {
          this.$message({ message: 'ID必需为数字', type: 'warning' })
          return false
        }
        searchValue[this.selectType] = val
        this.bookList = {}
      }
      this.$ajax('/admin/getBookInfoList', searchValue, res => {
        if (res.returnCode === 200) {
          this.bookList = res.data
        }
      })
    },

    searchBook() {
      if (Number(this.$route.params.page) !== 1) {
        this.$router.push({ params: { page: 1 }})
      } else {
        this.getBookList()
      }
    },

    // 批量删除书籍
    toggleSelection() {
      if (this.multipleSelection.length) {
        const id = []
        this.multipleSelection.forEach((item) => {
          id.push(item.bookId)
        })
        this.$confirm('此操作将永久删除所选的' + id.length + '书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax('/admin/bookBatchDelete', {
            bookid: id.toString()
          }, res => {
            if (res.returnCode === 200) {
              this.$message({ message: '删除成功！', type: 'success' })
              this.getBookList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({ message: ' 请选择要删除的书籍！', type: 'warning' })
      }
    },

    handleRowClick(row, event, column) {
      if (column.label !== '操作') {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleClick(val, data) {
      if (val === 'a') {
                // 章节列表
        this.$router.push({ path: '/book_chapter_list/' + data.bookId })
      } else if (val === 'b') {
                // 编辑书籍详情
        this.$router.push({ path: '/book_detail/' + data.bookId })
      } else if (val === 'c') {
                // 添加章节
        this.$router.push({ path: '/add_new_chapter/' + data.bookId })
      } else if (val === 'd') {
        this.toggleSelection()
                // 删除书籍
                // this.$router.push({path:'/admin/book_list/'+data.bookId})
      }
    },

    handleCurrentChange(page) {
      this.$router.push({ params: { page: page }})
    },

    // 书籍上架下架
    bookChangeState(val, data) {
      let state = data.bookCheckStatus, status = data.bookStatus
      if (val === 'a') {
                // 书籍审核
        state = 1
      } else if (val === 'b') {
                // 书籍上架
        if (data.bookCheckStatus === 0) {
          this.$message({ message: '书籍暂未审核，请先审核通过！', type: 'warning' })
          return false
        } else {
          state = 2
        }
      } else if (val === 'c') {
                // 书籍下架
        if (data.bookCheckStatus <= 1) {
          this.$message({ message: '书籍已下架！', type: 'warning' })
          return false
        } else {
          state = 1
        }
      } else if (val === 'd') {
        status = 1
      } else if (val === 'e') {
        status = 0
      } else if (val === 'f') {
        state = 0
      }
      this.$ajax('/admin/sysbookupdate', { bookId: data.bookId, bookCheckStatus: state, bookAuthorization: data.bookAuthorization, bookStatus: status }, res => {
        if (res.returnCode === 200) {
          this.$message(res.msg)
          this.getBookList()
        }
      })
    },

    openDialog(row) {
      this.outerVisible = true
      this.bookId = row.bookId
    },

    queryInfo() {
      this.performanceReview = []
      var data = {
        bookId: this.bookId,
        startTime: this.format(new Date(this.timeRange-31*24*3600*1000), 'start'),
        endTime: this.format(this.timeRange, 'end')
      }
      this.$store.dispatch('getAuthorPerformanceReview', data).then(res => {
        if (res.returnCode === 200) {
          if(res.data[0].counts !=0) {
            var obj = {}
            obj.bookTitle = res.data[0].bookTitle
            obj.sumWorld1 = res.data[0].sumWorld
            obj.counts1 = res.data[0].counts
            obj.sumWorld2 = res.data[1].sumWorld
            obj.counts2 = res.data[1].counts
            obj.releaseTime = res.data[2].releaseTime
            obj.createUpdateCount = res.data[2].createUpdateCount
            this.performanceReview.push(obj)
          }
        }
      })
    },

    // 某个时间段的章节更新详细信息
    chapterInfoByTime() {
      this.byTimeData = []
      var data = {
        bookId: this.bookId,
        startTime: this.format(new Date(this.timeRange-31*24*3600*1000), 'start'),
        endTime: this.format(this.timeRange, 'end')
      }
      this.$store.dispatch('getChapterInfoByTime', data).then(res => {
        if (res.returnCode === 200) {
          this.byTimeData = res.data
          this.innerVisible = true
        }
      })
    },

    // 时间格式化
    format(time, type) {
      const year = time.getFullYear()
      const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
      const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      if (type === 'start') {
        var newTime = year + '-' + month + '-' + date + ' 00:00:00'
      } else {
        var newTime = year + '-' + month + '-' + date + ' 23:59:59'
      }
      return newTime
    },

    // 默认时间
    defaultTime() {
      var date = new Date()
      this.timeRange = date
    }
  },

  created() {
    this.getBookList()
    this.defaultTime()
  },

  watch: {
    $route: function() {
      this.getBookList()
    },
    outerVisible: function(value) {
      if(value === false) {
        this.defaultTime()
        this.byTimeData = []
        this.performanceReview = []
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cover
    width 100%
    cursor pointer
.cover-preview
    border 1px solid #ddd
    .avatar
        width 200px
        height 200px
.title
    margin-bottom 10px
</style>
