<template>
  <div class="tab">
    <div v-for="(item,index) in titles" :key="index" @click="didClickedItem(index)">
      <span class="wallet" :class="['wallet',currentIndex==index?'active':'']">
        <p>{{item.name}}</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [{
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
      currentIndex:0,
    };
  },
  methods: {
    didClickedItem(tag) {
      this.currentIndex = tag;
      this.titles.forEach(function(tab){
        tab.vshow = false;
      })
      this.titles[tag].vshow = true;
      this.$emit('func',this.titles);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  width: 100%;
  height: 48px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-around;
  background-color: rgb(51, 50, 48);
}
span {
  display: inline-block;
  color: #fff;
  width: 124px;
  text-align: center;
}
.active {
  color: red;
}
</style>
