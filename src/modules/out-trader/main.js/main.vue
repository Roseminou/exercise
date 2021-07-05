<template>
    <div>
        <input type="text" :value="message" @change="change">
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: ''
        }
    },
    methods: {
        change() {
            this.message = '222'
        }
    }
}
</script>