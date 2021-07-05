<template>
    <div class="fatherCom">
        <span class="title">监听watch</span>
        <span class="change" @click="change">改变值</span>
        <childCom :fatherText="childText" :fatherObj="childObj"></childCom>
    </div>
</template>
<script>
import childCom from './components/child'
export default {
    data() {
        return {
            childText: "哦豁",
            childObj: {
                title: "啊哈",
                name: "王一博"
            }
        }
    },
    components: {
        childCom
    },
    methods: {
        change() {
            this.childText = "哈哈哈哈"
            // this.childObj.title = "嘿嘿"
            this.childObj.name = "肖战"
        }
    }
}
</script>
<style lang="less" scoped>
    .fatherCom {
        .title {
            margin-left: 50px;

        }   
        .change {
            width: 150px;
            height: 30px;
            background: chocolate;
            color: #ffffff;
        }
    }
</style>