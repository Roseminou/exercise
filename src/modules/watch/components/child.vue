<template>
    <div class="watchTest">
        <span class="text">{{this.fatherText}}</span>
    </div>
</template>
<script>
export default {
    props: {
        fatherText: "",
        fatherObj: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        fatherText: {
           // 立即监听
            handler(newVal, oldVal) {
                console.log('改变', oldVal, newVal);
            },
            immediate: true
        },
        // fatherText(newVal, oldVal) {
        //     console.log('改变', oldVal, newVal);
        // },

        fatherObj: {
            handler(newVal, oldVal) {
                console.log('改变对象', oldVal, newVal);
            },
            immediate: true,
            deep:true,  //深度监听。 用于监听对象改变
        },
        'fatherObj.title': {
            handler(newVal, oldVal) {
                console.log('改变对象', oldVal, newVal);
            },
            immediate: true,
            deep:true,  //深度监听。 用于监听对象改变
        }


    },

}
</script>
<style lang="less" scoped>
    .watchTest {

    }
</style>