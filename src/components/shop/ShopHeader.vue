<template>
  <div>
    <div class="bg" :style="{backgroundImage:'url('+url+image+')'}">
      <div class="blur">

      </div>
    </div>
    <div class="shopMsg">
      <div class="shopImg">
        <img :src="url+image" :alt="shopName">
        <p>{{shopName}}</p>
      </div>
      <div class="serve">
        商品图片仅供参考
        
        <br />
        ￥{{minPrice}}元起送 | 配送费：￥{{deliveryPrice}} | 配送服务：计里配送
      </div>
      <!-- <div class="announcement">
        公告：
      </div>
      <div class="activity">
        <span class="activityLabel">首</span>
        <span class="activityConetent">新用户立减20元</span>
        <span class="activityNum">1个活动</span>
      </div> -->
      
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopHeader",
    props:['image','shopName','deliveryPrice' ,'minPrice'],
    data(){
      return {
        url:this.$url,
      }
    }
  };
</script>

<style scoped>
  .bg{
    position: absolute;
    width: 100%;
    height: 80px;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
    filter: blur(5px);
  }
  .bg .blur{
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: #b8b8b8;
  }
  .shopMsg{
    position: relative;
    padding: 10px;
    z-index: 100;
  }
  .shopImg{
    text-align: center;
    margin-bottom: 5px;
  }
  .shopImg img{
    margin-top: 10px;
    width: 80px;
    height: 80px;
    border-radius: 500px;
    border: 1px #aaa8a7 solid;
  }
  .serve{
    text-align: center;
    font-size: 12px;
  }
  .announcement{
    font-size: 12px;
    margin-bottom: 10px;
  }
  .activity{
    font-size: 12px;
    margin-bottom: 10px;
  }
  .activity .activityLabel{
    background-color: #00cd00;
    color: white;
    padding: 0 1px;
    border-radius: 3px;
    margin-right: 5px;
  }
  .activity .activityNum{
    float: right;
  }
</style>
