<template>
    <div class="control">
        <!-- 普通弹窗 确认取消弹窗 -->
        <span class="button" @click="showMessagebox('confirm')">确认弹窗</span>
        <span class="button" @click="showMessagebox('alert')">告知弹窗</span>
        <messageBox v-if="messageboxShow" @hideMessagebox="hideMessagebox" :messageboxType="messageboxType" @confirmL="confirmL" @confirmR="confirmR" :messageboxTitle="''"></messageBox>
    </div>
</template>
<script>
import messageBox from './components/messagebox'
export default {
    data() {
        return {
            messageboxShow: false,
            messageboxType: "alert",  //confirm 确认弹窗  alert  告知弹窗
            messageboxTitle: "提示",  //弹窗标题
            messageboxcontent: "奶茶真的是快乐源泉啊～",    // 弹窗文本
        }
    },
    components: {
        messageBox
    },
    methods: {
        showMessagebox(type) {
            this.messageboxType = type
            this.messageboxShow = true
        },
        hideMessagebox() {
            this.messageboxShow = false
        },
        confirmL() {
            this.messageboxShow = false
        },
        confirmR() {
            this.messageboxShow = false
        }
    },
}
</script>
<style lang="less" scoped>
    .control {
        position: relative;
        .button {
            width: 150px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: #f78736;
            color: #ffffff;
            font-weight: 700;
            border-radius: 5px;

        }
    }
</style>