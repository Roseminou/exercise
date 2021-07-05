<template>
<!-- flex相关UI -->
    <div>
        <div class="detail_info">
          <div class="apply_intro">
            <div class="left">
              <span class="Applicant">123</span>
              <span class="amount" style="width:60px;">456</span>
              <span class="receiver Receive">789</span>
            </div>
            <div class="right">
              <span class="Applicant">aaa</span>
              <span class="amount">bbb</span>
              <span class="receiver huanhuang">ccc</span>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.apply_intro {
  font-size: 15px;
  display: flex;
  padding-bottom: 10px;
  div {
    justify-content: space-around;
    span {
      display: block;
      margin-bottom: 10px;
    }
    span:nth-child(1) {
      height: 21px;
      line-height: 21px;
    }
    span:nth-child(2) {
      height: 21px;
      line-height: 21px;
    }
    span:last-child {
      margin: 0;
    }
  }
  .left {
    margin-right: 16px;
    color: #b3b3b3;
    span {
      white-space: nowrap;      
    }
  }
  .right {
    font-weight: 500;
    color: #494949;
    span:last-child {
      word-wrap: break-word;
      word-break: break-all;
      vertical-align: top;
    }
  }
}
</style>