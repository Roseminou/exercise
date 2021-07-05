<template>
    <div class="wal_appr">
        <tab @func="ClickTab"></tab>
        <wallet  v-show="temp[0].vshow"></wallet>
        <approval v-show="temp[1].vshow"></approval>
        <address v-show="temp[2].vshow">12345</address>
    </div> 
</template>
<script>
import TD from '../components/joint-wallet/widget/tab_content'
import wallet from '../components/joint-wallet/wallet'
import approval from '../components/joint-wallet/approval'
export default {
    data() {
        return {
            temp:  [{
                "name": '共管钱包', 
                "vshow": true
            },
            {
                "name": '审批',
                "vshow": false
            },
            {
                "name": '添加', 
                "vshow": false
            }],
        } 
    },
    components: {
        "tab": TD,
        "wallet": wallet,
        "approval": approval,
    },
    mounted() {
        this.getType()
    },
    methods: {
        ClickTab(data) { 
            this.temp = data;
        },
        getType() {
            let aaa = setInterval(() => {
                console.log(aaa,'aaa')//4 aaa
                if (true) {
                    clearInterval(aaa)
                }
            })
        }
    }
}
</script>