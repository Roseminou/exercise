// 练习v-model
<template>
    <div class="text">
        <input type="text" :value="message" @input="change">
        <p class="changeText">{{message}}</p>
        <!-- <base-checkbox style="display: inline-block;height: 50px; width: 50px; background: #ffffff;" v-model="lovingVue"></base-checkbox> -->
    </div>
</template>
<script>

export default {
    data() {
        return {
            message: '123'
        }
    },
    methods: {
        change(e) {
            this.message = e.target.value
        }
    }
}
</script>
<style>
     .text {
         width: 100%;
         height: 100vh;
         background: pink;
     }
     input {
         width: 300px;
         height: 50px;
     }
</style>