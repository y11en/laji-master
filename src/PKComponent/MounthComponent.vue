<template>
<div class="mounth-component">
    <div class="mounth-header">
        <el-row>
            <h2>表格编辑器</h2>
            <i class="el-icon-close" @click="sendFather()"></i>
        </el-row>

        <el-row :gutter="24" class="header-row">
            <el-col :span="1"><span>行数</span></el-col>
            <el-col :span="2"><el-input-number size="small" v-model="rowNum" class="row-num"></el-input-number></el-col>
            <el-col :span="1"><span>列数</span></el-col>
            <el-col :span="2"><el-input-number size="small" v-model="colNum" class="col-num"></el-input-number></el-col>
            <el-col :span="1"><el-button type="primary" plain size="small" @click="createTable()">生成表格</el-button></el-col>
            <!-- <el-col :span="1"><el-button type="primary" plain size="small" @click="createTable()">生成表格</el-button></el-col> -->
            <el-col :span="2"><el-button type="primary" icon="el-icon-refresh" circle @click="repeat()"></el-button></el-col>
        </el-row>

        <el-row>
            <el-input type="textarea" resize="none" placeholder="复制区域" v-model="copyContent"></el-input>
        </el-row>
    </div>

    <div class="mounth-section">
        <el-row :gutter="24" class="table-row">
            <el-col :span="4" v-for="(item, index) in tableTitle" :key="index" style="padding:0">
                <el-input v-model="tableTitle[index]" :disabled="true" class="table-col"></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="24" v-for="(row, rowIndex) in tableArr" :key="rowIndex" class="table-row">
            <el-col :span="4" style="padding:0" v-for="(col, colIndex) in row" :key="colIndex">
                <el-input v-model="tableArr[rowIndex][colIndex]" class="table-col"></el-input>
            </el-col>
        </el-row>
    </div>

    <div class="submit-box">
        <el-row>
            <el-button type="primary" round class="submit-btn">提 交</el-button>
        </el-row>
    </div>

</div>
</template>

<script type="text/ecmascript-6">
export default {

    title: '表格编辑器',

    data() {
        return {
            rowNum: 16,
            colNum: 6,
            tableArr: [],
            tableTitle: ['书籍编号', '书籍名称', '作者编号', '作者名称', '第三方', '考勤'],
            copyContent: ''
        }
    },
    created: function() {
        this.createTable()
    },
    methods: {
        
        sendFather() {
            this.$emit('fromChild', false)
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
            let arr = new Array()
            for(var r=0; r<this.rowNum; r++) {
                arr[r] = new Array()
                for(var c=0; c<this.colNum; c++) {
                    arr[r][c] = ''
                }
            }
            this.tableArr = arr
        },

    },

    watch: {
        'copyContent': function(val) {
            var a = val.replace(/(^\s*)|(\s*$)/g, "")
            a = a.split('\n')
            for(var i=0; i<a.length; i++){
                a[i] = a[i].replace(/\s+/g, ' ')
                a[i] = a[i].replace(/(^\s*)|(\s*$)/g, "")
                a[i] = a[i].split(' ')
            }
            a[0] = null
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
            .el-col
                text-align center
                line-height 32px
            h2
                float left
            .el-icon-close
                float right
                line-height 31px
                cursor pointer
   
    .mounth-section
        width 100%
        height 700px
        overflow-x hidden
        overflow-y auto
        .el-row
            white-space nowrap
        .table-row
            .table-col
                // width 300px
                width 100%
                height 40px
    .submit-box
        .submit-btn
            float right
            margin-right 30px


</style>
