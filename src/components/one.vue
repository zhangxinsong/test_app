<template>
    <div class="one">
        <input type="text" v-model="aaa">
        <div v-load="aaa" class="loading"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            aaa: ''
        }
    }
}
</script>
<style lang="less" scoped>
.one{
    width:100%;
    height: 100%;
    .loading{
        height: 200px;
        background: yellow;
    }
}
</style>
