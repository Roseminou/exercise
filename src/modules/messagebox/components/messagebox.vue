<template>
    <div id="messagebox">
        <!-- 普通弹窗 -->
        <div class="messagebox-alert messagebox-content" v-show="this.messageboxType==='alert'">
            <p class="messagebox-title">{{this.messageboxTitle}}</p>
            <p class="messagebox-content-text"><span class="messagebox-text">{{this.messageboxcontent}}</span></p>
            <p class="messagebox-line"></p>
            <p class="messagebox-button" :style="{color: this.messageboxBtxColor}" @click="hideMessagebox">{{this.messageboxBtx}}</p>
        </div>
        <!-- 确认取消弹窗 -->
        <div class="messagebox-confirm messagebox-content" v-show="this.messageboxType==='confirm'">
            <p class="messagebox-title">{{messageboxTitle}}</p>
            <p class="messagebox-content-text"><span class="messagebox-text">{{this.messageboxcontent}}</span></p>
            <p class="messagebox-line"></p>
            <div class="messagebox-button" :style="{color: this.messageboxBtxColor}">
                <span class="messagebox-button-left" @click="confirmL">{{messageboxBtxL}}</span>
                <span class="messagebox-button-right" @click="confirmR">{{messageboxBtxR}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        messageboxType: {
            type: String,
            default: "alert"
        },  //confirm 确认弹窗  alert  告知弹窗
        messageboxTitle: {
            type: String,
            default: "提示"
        },  //弹窗标题
        messageboxcontent: {
            type: String,
            default: "奶茶真的是快乐源泉啊～奶茶真的是快乐源泉啊奶茶真的是快乐源泉啊"
        },    // 弹窗文本
        messageboxBtx: {
            type: String,
            default: "我知道了"
        },  // 告知弹窗按钮文本
        messageboxBtxL: {
            type: String,
            default: "取消"
        },  // 确认弹窗按钮文本左
        messageboxBtxR: {
            type: String,
            default: "确认"
        },  // 确认弹窗按钮文本右
        messageboxBtxColor: {
            type: String,
            default: "#007aff"
        },  // 弹窗按钮颜色
    },
    methods: {
        confirmL() {
            this.$emit("confirmL")
        },
        confirmR() {
            this.$emit("confirmR")
        },
        hideMessagebox() {
            this.$emit("hideMessagebox")
        }
    }

}
</script>
<style lang="less" scoped>
    #messagebox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 999998;
        -moz-user-select: none;
        user-select: none;
        .messagebox-content {
            width: 270px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -135px;
            text-align: center;
            background: #ffffff;
            border-radius: 10px;

        }
        .messagebox-title {
            font-size: 17px;
            font-weight: 700;
            letter-spacing: -0.41px;
            text-align: center;
            color: #030303;
            margin-top: 18px;
        }
        .messagebox-content-text {
            font-size: 13px;
            line-height: 1.23;
            letter-spacing: -0.08px;
            text-align: center;
            color: #030303;
            margin-top: 30px;
            margin-bottom: 33px;
            padding: 0px 10px;
            .messagebox-text {
                display: inline-block;
                text-align: left;
                text-indent: 2em;
            }
        }
        .messagebox-line {
            width: 100%;
            height: 1px;
            // background-blend-mode: overlay, color-burn;
            // background-image: linear-gradient(to bottom, #4d4d4d, #4d4d4d), linear-gradient(to bottom, rgba(77, 77, 77, 0.78), rgba(77, 77, 77, 0.78));
            border-top: 0.5px solid #ebebeb;
        }
        .messagebox-button {
            height: 40px;
            // border-top: 1px solid #4d4d4d;
            line-height: 40px;
            text-align: center;
            font-weight: 700;
            // cursor: pointer;
        }
        .messagebox-confirm {
            .messagebox-button {
                display: flex;
                justify-content: space-between;
            }
            span {
                flex: 1;
            }
            .messagebox-button-left {
                border-right: 0.5px solid #ebebeb;
            }
        }



    }
</style>