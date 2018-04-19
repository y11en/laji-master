<template>
<div class="book-property-wrap">

    <el-alert title="操作说明" type="info" show-icon>
        <div>
            <p>您可以通过点击"+ New Tag"按钮来添加词汇，或者直接点击"×"删除该词汇。</p>
            <p><span class="red">敏感词</span>用于网站 私信 评论 间贴 回复 等网站消息系统用到的屏蔽词（效果当用户发布的信息中包含该词汇提示：评论内容不合法）</p>
            <p><span>停顿词：</span>用于检测用户敏感词中包含的特殊字符（解释:如傻@B中包含@也一并检测- 停顿词包含#@！*&……等等）</p>
            <p><span>警告词：</span>用于检测用户发布章节内容中包含的敏感字符 改字符不会直接提示用户，会在后台生成一个警告词记录通过管理员去审核</p>
        </div>
    </el-alert>

    <!--敏感词管理-->
    <el-row class="tag-row">
        <p class="tag-title">敏感词管理</p>
        <el-tag class="tag-item" :key="tag" v-for="tag in sensitiveWordsList" closable @close="handleDeleteWord('敏感词', tag)">{{tag}}</el-tag>
        <el-input
            class="tag-input"
            v-if="sensitiveWordsVisible"
            v-model="sensitiveWordsValue"
            ref="sensitiveWordsValue"
            @keyup.enter.native="handleAddWord('敏感词')"
            @blur="handleAddWord('敏感词')">
        </el-input>
        <el-button v-else class="tag-button" size="small" @click="showInput('敏感词')">+ New Tag</el-button>
    </el-row>

    <!--停顿词管理-->
    <el-row class="tag-row">
        <p class="tag-title">停顿词管理</p>
        <el-tag class="tag-item":key="tag" v-for="tag in stopWordsList" closable @close="handleDeleteWord('停顿词', tag)">{{tag}}</el-tag>
        <el-input
            class="tag-input"
            v-if="stopWordsVisible"
            v-model="stopWordsValue"
            ref="stopWordsValue"
            @keyup.enter.native="handleAddWord('停顿词')"
            @blur="handleAddWord('停顿词')">
        </el-input>
        <el-button v-else class="tag-button" size="small" @click="showInput('停顿词')">+ New Tag</el-button>
    </el-row>

    <!--警告词管理-->
    <el-row class="tag-row">
        <p class="tag-title">警告词管理</p>
        <el-tag class="tag-item" :key="tag" v-for="tag in warningWordsList" closable @close="handleDeleteWord('警告词', tag)">{{tag}}</el-tag>
        <el-input
            class="tag-input"
            v-if="warningWordsVisible"
            v-model="warningWordsValue"
            ref="warningWordsValue"
            @keyup.enter.native="handleAddWord('警告词')"
            @blur="handleAddWord('警告词')">
        </el-input>
        <el-button v-else class="tag-button" size="small" @click="showInput('警告词')">+ New Tag</el-button>
    </el-row>

</div>
</template>

<script>
export default {
    data() {
        return {
            sensitiveWordsList: [],
            sensitiveWordsVisible: false,
            sensitiveWordsValue: '',

            stopWordsList: [],
            stopWordsVisible: false,
            stopWordsValue: '',

            warningWordsList: [],
            warningWordsVisible: false,
            warningWordsValue: '',
            responseWord: function() {
                this.$store.dispatch('getSensitiveWords').then(res => {
                    this.sensitiveWordsList = res.sensitiveWords
                    this.stopWordsList = res.stopWordsList
                    this.warningWordsList = res.warningWords
                })
            },
            // 判断元素是否在数组中存在
            contains: function(arr, obj) {
                var i = arr.length
                while (i--) {
                    if (arr[i] === obj) return true
                }
                return false
            }

        }
    },
    methods: {

        handleAddWord(str) {
            if(str === '敏感词') {
                let word = this.sensitiveWordsValue
                if (word) {
                    if(this.contains(this.sensitiveWordsList, word))
                        this.$message({ message: '词汇重复，请重新输入！', type: 'warning' })
                    else{
                        this.$store.dispatch('changeSensitiveWords', { type: '1', world: word })
                        .then(res => {
                            this.responseWord()
                            this.$message({ message: '添加成功！', type: 'success' })
                            this.sensitiveWordsVisible = false
                            this.sensitiveWordsValue = ''
                        })
                    }
                }else this.sensitiveWordsVisible = false
            }else if(str === '停顿词') {
                let word = this.stopWordsValue
                if (word) {
                    if(this.contains(this.stopWordsList, word))
                        this.$message({ message: '词汇重复，请重新输入！', type: 'warning' })
                    else{
                        this.$store.dispatch('changeSensitiveWords', { type: '2', world: word })
                        .then(res => {
                            this.responseWord()
                            this.$message({ message: '添加成功！', type: 'success' })
                            this.stopWordsVisible = false
                            this.stopWordsValue = ''
                        })
                    }
                }else this.stopWordsVisible = false
            }else if(str === '警告词') {
                let word = this.warningWordsValue
                if (word) {
                    if(this.contains(this.warningWordsList, word))
                        this.$message({ message: '词汇重复，请重新输入！', type: 'warning' })
                    else{
                        this.$store.dispatch('changeSensitiveWords', { type: '3', world: word })
                        .then(res => {
                            this.responseWord()
                            this.$message({ message: '添加成功！', type: 'success' })
                            this.warningWordsVisible = false
                            this.warningWordsValue = ''
                        })
                    }
                }else this.warningWordsVisible = false
            }
        },

        handleDeleteWord(str, tag) {
            this.$confirm('确定删除该词语, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(str === '敏感词') {
                    this.$store.dispatch('changeSensitiveWords', { type: '4', world: tag }).then(res => {
                        this.responseWord()
                        this.$message({ message: '添加成功！', type: 'success' })
                        this.sensitiveWordsVisible = false
                        this.sensitiveWordsValue = ''
                    })
                }else if(str === '停顿词') {
                    this.$store.dispatch('changeSensitiveWords', { type: '5', world: tag }).then(res => {
                        this.responseWord()
                        this.$message({ message: '添加成功！', type: 'success' })
                        this.stopWordsVisible = false
                        this.stopWordsValue = ''
                    })
                }else if(str === '警告词') {
                    this.$store.dispatch('changeSensitiveWords', { type: '6', world: tag }).then(res => {
                        this.responseWord()
                        this.$message({ message: '添加成功！', type: 'success' })
                        this.warningWordsVisible = false
                        this.warningWordsValue = ''
                    })
                }
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' })
            })
        },

        showInput(str) {
            if(str === '敏感词') {
                this.sensitiveWordsVisible = true
                this.$nextTick(_ => {
                    this.$refs.sensitiveWordsValue.$refs.input.focus()
                })
            }else if(str === '停顿词') {
                this.stopWordsVisible = true
                this.$nextTick(_ => {
                    this.$refs.stopWordsValue.$refs.input.focus()
                })
            }else if(str === '警告词') {
                this.warningWordsVisible = true
                this.$nextTick(_ => {
                    this.$refs.warningWordsValue.$refs.input.focus()
                })
            }
        }
        
    },
    created(){
        this.responseWord()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tag-row
    margin 70px 0
    .tag-title
        font-size 18px
        font-weight bold
        margin-bottom 20px
    .tag-item
        margin-right 10px
    .tag-input
        width 90px
        margin-left 10px
        vertical-align bottom
        input
            height 32px

    .tag-button
        margin-left 10px
        height 32px
        line-height 30px
        padding-top 0
        padding-bottom 0
</style>
