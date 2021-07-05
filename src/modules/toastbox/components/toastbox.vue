<template>
    <div id="toastBox">
        <div class="toastText">{{this.toastText}}</div>
    </div>
</template>
<script>
export default {
    props: {
        toastText: {
            type: String,
            default: "我去给你买个橘子",
        },

    },
    mounted() {
        // this.$toast("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",  {duration: 100000})
    },
    methods: {
        
    },
}
</script>
<style lang="less" scoped>
    #toastBox {
        .toastText {
            top: 50%;
            margin-top: -20px;
            bottom: inherit;
            // width: 80%;
            white-space: inherit;
            height: auto;
            position: fixed;
            left: 50%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            max-width: 80%;
            line-height: 20px;
            padding: 10px 20px;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            text-align: center;
            z-index: 9999;
            font-size: 14px;
            color: #ffffff;
            font-weight: 700;
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.7);
            animation: show-toast .5s;
            -webkit-animation: show-toast .5s;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: wrap;
        }
    }
</style>
    