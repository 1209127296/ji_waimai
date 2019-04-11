<template>
  <div class="shopCard">
    <div class="shopImg">
      <img :src="url+shop.logo" style="width: 100% ;height: 100%"/>
    </div>
    <div class="shopMsg">

      <div class="nameRow">
        <div class="ShopName">
          {{shop.name}}
        </div>
        <div class="myLabel">
          <span>保</span>
        </div>
      </div>

      <div class="starRow">
        <div class="starBox">
          <van-rate
            class="star"
            value="5"
            size="12"
            disabled
            disabled-color="orange"
          />
          <span class="rate">5.0</span>
          <!--<span>月售2单</span>-->
        </div>
        <div class="myLabel">
          <span>准时达</span>
        </div>
      </div>

      <div class="moneyRow">
        <div class="money">
          ￥{{shop.minFree}}起送 | 配送费<span :class="{del: endTime>nowTime}">￥{{shop.commonDeliveryPrice}}</span><span class="nowPrice" v-if="endTime>nowTime">￥{{shop.specialDeliveryPrice}}</span>
        </div>
        <div class="far">
          <!--离3.30km-->
        </div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: "shopCard",
    props:['shop','allShop'],
    data(){
      return{
        url:this.$url,
        endTime:1554739199000,
        nowTime:new Date().getTime()
      }
    },

    methods:{
    //   toUrl(url){
    //     console.log(this.shop.id)
    //     console.log("nibui")
    //     // console.log('key is here--->'+this.key)
    //     wx.navigateTo({
    //       url: '/pages/shop/main?shopid='+this.shop.id
    //       // url: `/pages/shop/main?shopid='${this.shop.id}`
    //     })
    //   }
    },
  }
</script>

<style scoped>
  .shopCard{
    padding: 15px 0;
    /*height: 90px;*/
    display: flex;
    border-bottom: 1px #e2e2e2 solid;
  }
.shopImg{
  /*background-color: aqua;*/
  height: 80px;
  width: 80px;
  margin-right: 10px;
  border: 1px #d1d1d1 solid;
  border-radius: 5px;
  /*width: 30%;*/
}
  .shopMsg{
    /*height: 100%;
    width: 70%;*/
    flex-grow:1;
    font-size: 14px;
  }
  .nameRow{
    display: flex;
    justify-content:space-between;
  }
  .nameRow .ShopName{
    font-weight: bold;
    margin-bottom: 15px;
  }
  .nameRow .myLabel span{
    font-size: 12px;
    color: #767676;
    border: #cccccc 0.1px solid;
    padding: 0.5px 3px;
    border-radius: 3px;
  }
  .starRow{
    display: flex;
    justify-content:space-between;
    margin-bottom: 10px;
  }
  .starRow .starBox{
    font-size: 12px;
    display: flex;
  }
  .starRow .starBox span{
    color:#767676;
  }
  .starRow .starBox .rate{
    color:orange;
    margin: 0 5px;
  }
  .starRow .myLabel{
    font-size: 12px;
    padding: 0 3px;
    color: #2d8cf0;
    border: #2d8cf0 0.1px solid;
  }
  .moneyRow{
    font-size: 12px;
    color: #767676;
    display: flex;
    justify-content:space-between;
  }

  .del{
    text-decoration:line-through
  }
  .nowPrice{
    margin-left:10px;
    color: #f33
  }
</style>
