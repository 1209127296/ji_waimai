<template>
  <van-cell :value="'￥'+price">
    <div slot="title" style="display:flex;align-items:center;">
      <img :src="url+image" alt="图片" style="width:30px;height:30px;">
      <div class="van-cell-text" style="width:260rpx;margin-left:20rpx">{{dealName}}</div>
      <div style="margin-left:20rpx;width:100rpx;">x{{total}}</div>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: "good",
  props:["dealName","image","price","total"],
  data(){
    return {
      url:this.$url,
    }
  }
};
</script>

<style scoped>
</style>