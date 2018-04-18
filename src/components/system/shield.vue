<template>
    <div>
    
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data() {
            return {

            }
        },
        mounted: function() {
            this.$ajax("/admin/getSensitiveWords",'',res=>{
                console.log(res)
            },'get')
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
