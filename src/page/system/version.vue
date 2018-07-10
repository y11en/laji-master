<template>
<div class="version-update">
    <el-alert title="操作说明" type="info" show-icon>
        <div>
            <span>暂无</span>
        </div>
    </el-alert>

    <div class="version-contain" v-loading="this.$store.state.system.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-row :gutter="24" style="margin: 0;">
            <el-col :span="8" class="version-info">

                <el-row :gutter="20" style="margin: 20px 0;">
                    <el-col :span="4">
                        <p style="text-align: right;">上传APK文件</p>
                    </el-col>
                    <el-col :span="18">
                        <el-upload
                            ref='upload'
                            action=""
                            :auto-upload="false"
                            :on-change="beforeUpload"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传apk文件</div>
                        </el-upload>
                    </el-col>
                </el-row>

                <el-row :gutter="20" style="margin: 20px 0;">
                    <el-col :span="4">
                        <p style="text-align: right;">设备</p>
                    </el-col>
                    <el-col :span="18">
                        <el-select v-model="versionData.versionTerminal" placeholder="请选择">
                            <el-option v-for="item in terminalList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                
                <el-row :gutter="20" style="margin: 20px 0;">
                    <el-col :span="4">
                        <p style="text-align: right;">版本号</p>
                    </el-col>
                    <el-col :span="18">
                        <el-input v-model="versionData.version"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="20" style="margin: 20px 0;">
                    <el-col :span="4">
                        <p style="text-align: right;">更新时间</p>
                    </el-col>
                    <el-col :span="18">
                        <el-date-picker v-model="versionData.versionUpdateDataTime" type="date" placeholder="选择日期"></el-date-picker>
                    </el-col>
                </el-row>

                <el-row :gutter="20" style="margin: 20px 0;">
                    <el-col :span="4">
                        <p style="text-align: right;">版本号描述</p>
                    </el-col>
                    <el-col :span="18">
                        <el-input type="textarea" v-model="versionData.versionDescription"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="20" style="margin: 20px 0;">
                    <el-col :span="20" style="text-align: right;">
                         <el-button type="primary" round @click="versionUpdate()" style="outline: none;">更新版本</el-button>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="14" :offset="1">
                <div id="version-date" class="version-date">
                    <div class="timeline-block" v-for="(tmp, index) in versionTimeLine" :key="index">
                        <div class="timeline-img">
                            <i class="fa fa-clock-o"></i>
                        </div>
                        <div class="timeline-content">
                            <p><span class="title">设备：</span><span class="content">{{tmp.versionTerminal}}</span></p>
                            <p><span class="title">版本号：</span><span class="content">{{tmp.version}}</span></p>
                            <p><span class="title">版本号ID：</span><span class="content">{{tmp.id}}</span></p>
                            <div>
                                <span class="title">版本更新描述：</span>
                                <div class="content" v-html="desc(tmp.versionDescription)"></div>
                            </div>
                            <span class="cd-date">{{tmp.versionUpdateDataTime | time('long')}}</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
    export default{
        data() {
            return {
                terminalList: [{value: '安卓', label: '安卓'}, {value: 'IOS', label: 'IOS'}],
                versionData: {
                    version: '',
                    versionTerminal: '',
                    versionUpdateDataTime: new Date(),
                    versionDescription: '',
                    code: '200',
                }
            }
        },

        mounted() {
            this.$store.dispatch('system/getVersionList')
        },

        methods: {

            beforeUpload(file) {
                if(file.name.indexOf('.apk') === -1){
                    this.$message({ message: '请上传apk文件！', type: 'warning' })
                    this.$refs.upload.clearFiles()
                }else if(file.size > 419430400){
                    this.$message({ message: '文件过大！请重新选择！', type: 'warning' })
                }else {
                    this.$confirm(`确定上传 ${ file.name }？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var formData = new FormData()
                        formData.append('file', file.raw)
                        this.$store.dispatch('system/appPackgetUpload', formData).then(res => {
                            if(res.returnCode === 200) this.$refs.upload.clearFiles()
                        })
                    }).catch(() => {
                        this.$message({ type: 'info', message: '已取消删除' })
                        this.$refs.upload.clearFiles()
                    })
                }
            },
            
            handleRemove(file, fileList) {
                this.file = null
            },

            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`)
            },
            
            versionUpdate() {
                if(this.versionData.versionTerminal === '') {
                    this.$message({ message: '请选择设备！', type: 'warning' })
                }else if(this.versionData.version === ''){
                    this.$message({ message: '请填写版本号！', type: 'warning' })
                }else if(this.versionData.versionUpdateDataTime === '') {
                    this.$message({ message: '请选择版本更新时间！', type: 'warning' })
                }else if(this.versionData.versionDescription === '') {
                    this.$message({ message: '请填写版本描述！！', type: 'warning' })
                }else {
                    if(this.FunWeekTime(this.versionData.versionUpdateDataTime.getTime()) == this.FunWeekTime(new Date().getTime())) {
                        this.versionData.versionUpdateDataTime = this.nowDate(this.versionData.versionUpdateDataTime.getTime())
                    }else {
                        this.versionData.versionUpdateDataTime = this.dateTiming(this.versionData.versionUpdateDataTime, 'start')
                    }
                    this.$store.dispatch('system/addUpdate', this.versionData).then(res => {
                        if(res.returnCode === 200) {
                            this.versionData = {
                                version: '',
                                versionTerminal: '安卓',
                                versionUpdateDataTime: new Date(),
                                versionDescription: '',
                                code: '200',
                            }
                        }
                    })
                }
            },

            desc(val) {
                return val.replace(/\r\n/g, "<br />")
            }
        },

        computed: {
            versionTimeLine() {
                return this.$store.state.system.versionTimeLine
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.version-contain
    margin 40px 0
    .version-info
        background #fff
    .version-date
        position relative
        padding 2em 0
        .timeline-block
            margin 4em 0
            position relative
            .timeline-img
                position absolute
                background #75ce66
                top 0
                border-radius 50%
                box-shadow 0 0 0 4px white
                width 60px
                height 60px
                left 50%
                margin-left -30px
                text-align center
                line-height 78px
                i
                    font-size 45px
                    color #fff
            .timeline-content
                position relative
                background #fff
                width 45%
                padding 1.6em
                border-radius 0.25em
                box-shadow 0 3px 0 #d7e4ed
                .title
                    text-align right
                    display inline-block
                    width 30%
                    vertical-align top
                .content
                    display inline-block
                    width 65%
                .cd-date
                    position absolute
                    width 100%
                    left 122%
                    top 6px
                    font-size 1.5rem
                    float left
                    opacity .7
                    display inline-block
                    color #7f8c97
            .timeline-content::before
                content ''
                position absolute
                top 24px
                left 100%
                height 0
                width 0
                border 7px solid transparent
                border-right 7px solid white
                border-color transparent
                border-left-color white
        .timeline-block:nth-child(even)
            .timeline-content
                float right
                .cd-date
                    left auto
                    text-align right
                    right 122%
            .timeline-content::before
                left auto
                right 100%
                border-color transparent
                border-right-color white
        .timeline-block:nth-child(even)::after
            content ""
            display table
            clear both
    .version-date::before
        content ''
        position absolute
        top 0
        left 50%
        height 100%
        width 4px
        margin-left -2px
        background #fff
    .version-date::after
        content ''
        display table
        clear both
</style>
