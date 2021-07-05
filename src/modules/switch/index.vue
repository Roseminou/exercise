<template>
<!-- switch 的新写法 -->
    <div>
        <div class="switch" v-for="(item, id) in list" :key="id">
            <p class="item">{{item.name}} {{NameFormat(item)}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    name: '使用中',
                    id: 'LOANING',
                },
                {
                    name: '已还款（已结清）',
                    id: 'PAYMENT',
                },
                {
                    name: '爆仓还款（已处置）',
                    id: 'ENFORCE_PAYMENT',
                },
                {
                    name: '穿仓还款（已处置）',
                    id: 'INSOLVENCY_PAYMENT',
                },
            ]
        }
    },
    computed: {
        NameFormat(item) {
            return function(item) {
                let player = ''
                switch (item.id) {
                    case 'LOANING':
                        player = "111";
                        break;
                    case 'PAYMENT':
                        player = "222";
                        break;
                    case 'ENFORCE_PAYMENT':
                        player = "333";
                        break;
                }
                return player
            }
        }
    },
}
</script>
<style lang="less">
    
</style>