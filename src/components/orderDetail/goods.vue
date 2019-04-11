<template>
<div>
  <van-cell :title="shopName" icon="location-o" is-link @click="goShop"/>
  <van-cell-group>
    <van-cell
      v-for="(g,index) in goods" :key="index"
      :title="g.name+'X'+g.deal_num"
      :value="'￥ '+g.deal_num*g.price"/>

    <!--<van-cell title="在线支付立减优惠" value="-￥12"/>-->
  </van-cell-group>
</div>
</template>

<script>
  export default {
    name: "goods",
    props:['goods','shopName','shopId'],
    methods:{
      goShop(){
        wx.navigateTo({
          url: '/pages/shop/main?shopid='+this.shopId
        })
      }
    }
  };
</script>

<style scoped>

</style>
