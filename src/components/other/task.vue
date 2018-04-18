<template>
<div>
    <iframe id="external-frame" src="http://118.31.165.113:8082/" frameborder="0" scrolling="no" width="2300px" height="1300px" seamless="seamless"></iframe>
</div>
</template>

<script type="text/ecmascript-6">
    export default{
        data() {
            return {
                // setIframeHeight(iframe) {
                //     if (iframe) {
                //         var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow
                //         if (iframeWin.document.body) {
                //             iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
                //         }
                //     }
                // }
            }
        },
        // mounted: function() {
        //     console.log(1)
        //     this.setIframeHeight(document.getElementById('external-frame'))
        // }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
