<template>
<div class="book-detail-wrap">
  
    <el-breadcrumb class="mbt20" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
        <el-breadcrumb-item to="/book/list">书籍列表</el-breadcrumb-item>
        <el-breadcrumb-item >书籍详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-alert title="操作说明" type="info" class="mbt20" show-icon>
        <div>
            <p>新建书籍的作者必需已经存在，否则无法创建新书；书籍标签至少2个，最多不超过5个；且书籍简介不可超过字数上限</p>
            <p>未创建过章节的书籍暂无扩展信息，</p>
        </div>
    </el-alert>
      
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane name="base" label="基本信息">

            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>书籍名称</span>
                </el-col>
                <el-col :span="20">
                    <el-input readonly v-model="bookDetail.bookName" class="mw320"></el-input>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>作品分类</span>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="bookDetail.bookClassificationId" placeholder="请选择活动区域">
                        <el-option v-for="(item,$index) in baseData.classificationList" :key="$index" :label="item.classificationName" :value="item.id"></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>书籍标签</span>
                </el-col>
                <el-col :span="20">
                    <el-checkbox-group v-model="bookDetail.bookLabId">
                        <el-checkbox v-for="(item,$index) in baseData.booklablesList" :label="item.id" name="bookLabId" :key="$index">{{item.bookLableName}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>千字单价</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="bookDetail.bookPrice" class="mw220"></el-input>
                </el-col>
                <el-col :span="1" :offset="5" class="el-title">
                    <span>创建时间</span>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="bookDetail.bookCreatedTime" type="datetime" readonly value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                </el-col>
            </el-row>
  
            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>最新更新</span>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="bookDetail.lastUpdateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                </el-col>
                <el-col :span="1" :offset="5" class="el-title">
                    <span>上架时间</span>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="bookDetail.topFrameTime" type="datetime" readonly value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"> </el-date-picker>
                </el-col>
            </el-row>
  
            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>签约时间</span>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="bookDetail.signTime" type="datetime" readonly value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                </el-col>
                <el-col :span="1" :offset="5" class="el-title">
                    <span>字母索引</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="bookDetail.initials" class="mw220"></el-input>
                </el-col>
            </el-row>
            
            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>发布状态</span>
                </el-col>
                <el-col :span="20">
                    <el-radio-group v-model="bookDetail.bookAuthorization">
                        <el-radio :label="0">网站首发</el-radio>
                        <el-radio :label="3">授权发布</el-radio>
                        <el-radio :label="2">首发签约</el-radio>
                        <el-radio :label="1">授权签约</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
          
            <el-row :gutter="24" class="el-row">
                <el-col :span="1" class="el-title">
                    <span>作品简介</span>
                </el-col>
                <el-col :span="20">
                    <el-input type="textarea" class="book-intro" v-model="bookDetail.bookIntroduction"></el-input>
                    <p><span class="fr">字数{{bookDetail.bookIntroduction.length}}/400</span></p>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="el-row">
                <el-col :span="2" :offset="1">
                    <el-button type="primary" @click="submit()">保存提交</el-button>
                </el-col>
            </el-row>

        </el-tab-pane>

        <el-tab-pane name="extend" v-if="bookData" label="扩展信息">
            <el-form ref="detailForm2" :rules="rules2" :model="bookDetail" label-width="80px">

                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="金椒" prop="goldenTicket">
                            <el-input v-model="bookData.goldenTicket" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="总收藏" prop="bookCollection">
                            <el-input v-model="bookData.bookCollection" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
    
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="打赏" prop="areward">
                            <el-input v-model="bookData.areward" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="总点击" prop="bookClickCount">
                            <el-input v-model="bookData.bookClickCount" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="小米椒" prop="bookRecommend">
                            <el-input v-model="bookData.bookRecommend" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="月点击" prop="monthChick">
                            <el-input v-model="bookData.monthChick" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="订阅" prop="shareds">
                            <el-input v-model="bookData.shareds" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="周点击" prop="weekChick">
                            <el-input v-model="bookData.weekChick" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="第三方" prop="threePartyIncome">
                            <el-input v-model="bookData.threePartyIncome" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="分享次数" prop="shareds">
                            <el-input v-model="bookData.shareds" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="月报" prop="monthlyAttendance">
                            <el-input v-model="bookData.monthlyAttendance" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
        
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="回访次数" prop="bookVisit">
                            <el-input v-model="bookData.bookVisit" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
    
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="评分" prop="bookIntegrals">
                            <el-input v-model="bookData.bookIntegrals" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="吐槽次数" prop="tucaoIndex">
                            <el-input v-model="bookData.tucaoIndex" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
  
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="订阅" prop="shareds">
                            <el-input v-model="bookData.shareds" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="评分次数" prop="integralnum">
                            <el-input v-model="bookData.integralnum" class="mw220"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
  
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('detailForm2')">保存提交</el-button>
                </el-form-item>
            
            </el-form>
        </el-tab-pane>
      </el-tabs>
</div>
</template>

<script type="text/ecmascript-6">
export default{
    data() {
        return {
            activeName:'base',
            baseData:{},
            DataChange:false,
            bookDetail: {
                bookName:'',
                bookClassificationId:null,
                bookLabId:null,
                bookAuthorization:null,
                bookIntroduction:''
            },
            bookData:{},
            rules2: {
                bookName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 20 个字符以内', trigger: 'blur' }
                ],
                bookClassificationId: [
                    { required: true,type:'number', message: '请选择作品分类', trigger: 'change' }
                ],
                bookLabId: [
                    { type: 'array',required: true,trigger: 'change' },
                    { type: 'array',min:2,max:5,message: '请选择2-5个标签',trigger: 'change'}
                ],
                bookAuthorization: [
                    { required: true,type:'number', message: '请选择发布状态', trigger: 'change' }
                ],
                bookIntroduction: [
                    { required: true, message: '作品简介', trigger: 'blur' },
                    { min: 1, max: 400, message: '长度在 1 到 400 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {

        getBookDetail(){
            this.$store.dispatch('book_showBookInfo', {bookid: this.$route.params.bid}).then(res => {
                delete res.booklableList
                delete res.bookImage
                res.bookLabId =(()=>{
                    let arr = []
                    res.bookLabId.split(",").forEach((item)=>{
                        arr.push(parseInt(item))
                    })
                    return arr
                })()
                res.lastUpdateTime = new Date(res.lastUpdateTime)
                res.bookCreatedTime = new Date(res.bookCreatedTime)
                if(res.topFrameTime)
                    res.topFrameTime = new Date(res.topFrameTime)
                if(res.signTime)
                    res.signTime = new Date(res.signTime)
                
                res.bookClassificationId = parseInt(res.bookClassificationId)
                this.bookDetail = res
            })

            this.$store.dispatch('getBookDataView', {bookid: this.$route.params.bid}).then(res => {
                this.bookData = res
            })
        },

        onSubmit(formName) {
            let formData = JSON.parse(JSON.stringify(this.bookDetail))
            formData.bookLabId = formData.bookLabId.toString()
            formData.bookIntroduction = this.$http.trim(formData.bookIntroduction).replace(/\s*\n+\s*/g,'\n')
            if(!formData.signTime){
                delete formData.signTime
            }
            if(!formData.topFrameTime){
                delete formData.topFrameTime
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$myLoad()
                    this.$ajax("/admin/sysbookupdate",formData,res=>{
                        this.$loading().close()
                        if(res.returnCode===200){
                            if(this.bookData && this.DataChange){
                                this.$ajax("/admin/updateBookData",this.bookData,res=>{
                                    if(res.returnCode===200){
                                        this.$message({message:'修改成功',type:'success'})
                                        this.getBaseInfo()
                                    }
                                })
                            }else {
                                this.$message({message:"修改成功",type:'success'})
                            }
                        }
                    })
                } else {
                    this.$message({message:"请完善表单信息！",type:'warning'})
                    return false;
                }
            })
        },

        submit() {
            if(this.bookDetail.bookLabId.length>5 || this.bookDetail.bookLabId.length<2) {
                this.$message({ message: '请选择2-5个标签', type: 'warning' })
            }else if(this.bookDetail.bookIntroduction.length>400){
                this.$message({ message: '长度在 1 到 400 个字符', type: 'warning' })
            }else{

                if(this.bookDetail.bookAuthorization === this.$store.state.bookAuthorization){
                    this.bookDetail.bookAuthorization = null
                }
                this.$store.dispatch('sysBookUpdate', this.bookDetail).then(res => {
                    this.$message({ message: '修改成功！', type: 'success' })
                    this.getBookDetail()
                })
            }
        }
    },

    created(){
        this.$store.dispatch('book_EditBookEcho').then(res => {
            this.baseData = res
            this.getBookDetail()
        })
    },

    watch:{

        "bookDetail.bookIntroduction":function (val) {
            this.bookDetail.bookIntroduction = val.replace(/\s*\n+\s*/g,'\n\n')
        },

        "bookData":function (val) {
            this.DataChange = true
        }
        
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.el-row
  margin 20px 0
  .el-title
    line-height 40px
    text-align center
</style>
