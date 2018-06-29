<template>
<div>
    <el-alert title="操作说明" type="info" show-icon>
        <div>
            <p>此功能可实现一键 导出/下载 书籍相关信息</p>
            <p class="tip">
                <span class="red">操作提示：</span>搜索书籍，单独导出或一键导出
            </p>
        </div>
    </el-alert>

    <div class="tool-area">
        <el-autocomplete class="search-btn" v-model="searchArr" :fetch-suggestions="querySearchAsync" @select="handleSelect" placeholder="请输入内容"></el-autocomplete>
        <!-- <el-button type="primary" icon="el-icon-search" @click="searchBook()">搜索</el-button> -->
        <el-button class="export-btn" type="primary" icon="el-icon-download" @click="handleClick(exportIds)">一键导出</el-button>
    </div>

    <el-table :data="bookList" border style="width: 100%">
        <el-table-column prop="id" label="书ID"></el-table-column>
        <el-table-column label="封面">
            <template slot-scope="scope">
                <img :src="scope.row.bookImage">
            </template>
        </el-table-column>
        <el-table-column prop="value" label="书名"></el-table-column>
        <el-table-column prop="writerName" label="作者"></el-table-column>
        <el-table-column prop="bookWorldCount" label="字数"></el-table-column>
        <el-table-column label="更新时间">
            <template slot-scope="scope">
                <span>{{ scope.row.lastUpdateTime | time('long') }}</span>
            </template>
        </el-table-column>
    
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.id)" type="text" size="small">导出</el-button>
                <el-button @click="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

</div>
</template>

<script type="text/ecmascript-6">
export default{

  data() {
    return {
      searchArr: '',
      timeout: null,
      bookList: [],
      exportIds: []
    }
  },

  methods: {
    querySearchAsync(queryString, cb) {
      this.$store.dispatch('system/stacksSearch', { keyWord: queryString, isHotWorld: 0, startPage: 1 }).then(res => {
        if (res.returnCode === 200) {
          const bookList = res.data.list
          const list = []
          for (let i = 0, len = bookList.length; i < len; i++) {
            this.$set(list, list.length, {
              value: bookList[i].bookName,
              id: bookList[i].bookId,
              writerName: bookList[i].writerName,
              bookWorldCount: bookList[i].bookWorldCount,
              lastUpdateTime: bookList[i].lastUpdateTime,
              bookImage: bookList[i].bookImage
            })
          }
          const results = queryString ? list.filter(this.createStateFilter(queryString)) : list
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(results)
          }, 3000 * Math.random())
        }
      })
    },

    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    handleSelect(item) {
      if (this.bookList.length <= 10) {
        this.bookList.push(item)
        this.exportIds.push(item.id)
      } else {
        this.$message({ message: '最多一次性导出十本书籍！', type: 'warning' })
      }
    },

    handleClick(id) {
      if (id.length !== 0) {
        this.$store.dispatch('chapterContentImport', { bookIds: id }).then(res => {
          if (res.returnCode === 500) {
            const el = document.createElement('a')
            el.href = 'https://www.lajixs.com/api/ChapterZipDownload?bookId=' + id
                        // el.download ="todo文件导出.txt"
            el.click()
          }
        })
      } else {
        this.$message({ message: '至少需要一本书籍！', type: 'warning' })
      }
    },

    deleteRow(index) {
      this.bookList.splice(index, 1)
      this.exportIds.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tool-area
    margin 20px 0
    .search-btn
        width 300px
    .export-btn
        float right
</style>
