<template>
    <div class="toastTest">
        <span class="btn" @click="alertToast">弹出提示</span>
        <Toast v-show="toastShow" :toastText="toastText"></Toast>
    </div>
</template>
<script>
import Toast from './components/toastbox'
export default {
    data() {
        return {
            toastShow: false,
            toastText: "哈哈",
        }
    },
    components: {
        Toast
    },
    beforeRouteLeave (to, from, next) {
        this.toastShow = false
        next()
    },
    mounted() {
        // this.$toast("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",  {duration: 100000})
    },
    methods: {
        alertToast() {
            this.toastShow = true
            setTimeout(() => {
                this.toastShow = false
            }, 10000);
        }
    },
}
</script>
<style lang="less" scoped>
    .toastTest {
        .btn {
            display: inline-block;
            width: 150px;
            height: 30px;
            color: #ffffff;
            background: orange;
            text-align: center;
            line-height: 30px;
            margin: 100px;
            border-radius: 5px;
        }
    }
</style>
    