<template>
    <!-- 挂单 -->
    <div class="resting-order">
        <div class="trading-type">
            <div class="type">
                <span>购买</span>
                <span>出售</span>
            </div>
            <div class="screeing">
                <i class="icon"></i>
                <span>筛选</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    .one-trading {
        color: #494949;
        background-color: #f5f5f5;
        font-family: PingFangSC;
        font-size: 13px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        .trading-type {
            padding: 11px 17px;
            background-color: #fff;
            width: 100%;
            height: 50px;
            .type {
                display: flex;
                span {
                    display: inline-block;
                    width: 79px;
                    height: 27px;
                    text-align: center;
                    line-height: 27px;
                    border: 1px solid #4f5669;
                    :visited {
                        background-color: #4f5669;
                        color: #fff;
                    }
                }
            }
            .screeing {
                display: flex;
                i {
                    display: inline-block;
                    
                }
                span {
                    display: inline-block;
                }
            }
        }
    }
</style>