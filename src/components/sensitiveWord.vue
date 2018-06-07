<template>
<div>
    {{chapterSensitiveWords}}
    <h2>章节敏感词列表</h2>
    <el-table :data="chapterSensitiveWords" style="width: 100%">
        <el-table-column prop="chapterSensitiveWords" label="书籍名称" width="180"></el-table-column>
        <el-table-column prop="name" label="章节ID" width="180"></el-table-column>
        <el-table-column prop="address" label="敏感字"></el-table-column>
    </el-table>
</div>
</template>

<script type="text/ecmascript-6">
export default {

  data() {
    return {
      chapterSensitiveWords: []

    }
  },

  created: function() {
    this.$store.dispatch('getChapterSensitiveWords').then(res => {
      this.chapterSensitiveWords = res.ChapterSensitiveWords
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
h2
    margin 10px 0
</style>
