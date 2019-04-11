<template>
  <van-tabbar :active="active"   @change="onChange">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="cart-o" >订单</van-tabbar-item>
    <van-tabbar-item icon="friends-o" >我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: "jlfooter",
    data(){
      return {
        active: 0
      }
    },
    props:{
      index:{
        default:0
      }
    },
    beforeMount(){
     this.active =  this.$root.$mp.query.index
    },
    methods:{
      onChange(event) {
        console.log(event.mp.detail);
        switch (event.mp.detail) {
          case  0:
            var url = "/pages/index/main?index="+event.mp.detail
            wx.redirectTo({url})
            break;
          case 1:
            var url = "/pages/order/main?index="+event.mp.detail
            wx.redirectTo({url})
            break;
          case 2:
            var url = "/pages/user/main?index="+event.mp.detail
            wx.redirectTo({url})
            break;
        }
      },
    }
  };
</script>

<style scoped>

</style>
