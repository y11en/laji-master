<template>
<div>

</div>
</template>

<script type="text/ecmascript-6">
export default{
  data() {
    return {
      title: ''
    }
  },

  created() {
    console.log(this.$store.state.system.str)
    this.$store.dispatch('system/getPersonMmessage')
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
