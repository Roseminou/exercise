<template>
    <div class="drawSlip">
        <van-Slider class="Slider"  v-model="sliderValue" :min="startValue" :max="maxValue" :step="digit" @drag-start="dragStart" @drag-end="dragEnd" @change="onChange" @input="onSlider" :active-color="activeColor" bar-height="2px" :inactive-color="inactiveColor" :button-size="buttonSize">
            <div slot="button" class="custom-button">
            </div>
        </van-Slider>
        <div class="slipLine"></div>
        <div class="box circle-box">
            <div class="circle" v-for="i in 3" :key="i + Math.random()" ></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 0,
            startValue: 0,    //最小值
            maxValue: 50,   //最大值
            inactiveColor: "rgba(255,255,255,0)",  // 进度条非激活状态颜色
            activeColor: "rgba(255,255,255,0)",    // 进度条激活状态颜色
            digit: "0.00000001",  //滑杆精度
            buttonSize: "14px", // 滑杆按钮大小
            sliderValue: 0, //滑杆当前值
        }
    },
    methods: {
        onChange() {
            console.log('onChange');
        },
        dragStart() {
            console.log('dragStart');

        },
        dragEnd() {
            console.log('dragEnd');

        },
        onSlider() {
            console.log('onSlider');

        },

    },
}
</script>
<style lang="less" scoped>
.drawSlip {
    position: relative;
    padding-top: 50px;
    padding-left: 50px;
}
    .van-slider {
        width: 200px;
        // position: absolute;
        z-index: 2;
    }
    .custom-button {
        width: 24px;
        height: 24px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
        background-color: #ffffff;
        border-radius: 50%;
    }
    .slipLine {
        width: 200px;
        height: 2px;
        background: #eeeeee;
    }
    .circle-box {
        width: 210px;
        height: 2px;
        display: flex;
        justify-content: space-between;
        // z-index: 1;
        position: absolute;
        top: 45px;
        left: 45px;
        .circle {
            width: 12px;
            height: 12px;
            border: solid 2px #eeeeee;
            background-color: #ffffff;
            border-radius: 50%;
        }
    }
</style>