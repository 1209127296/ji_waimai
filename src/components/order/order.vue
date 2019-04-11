<template>
  <div class="orderContainer">
    <div class="main" >
      <div>
        <img class="headImg" :src="url+headImg" :alt="shopName">
      </div>
      <div class="detailCtn">
        <div class="detaileCtnTop">
          <div class="shop">
            <div class="shopName">{{shopName}}</div>
            <div class="orderTime">{{create_time}}</div>
          </div>
          <div class="status">{{order_status}}</div>
        </div>
        <div class="goodCtn">
          <div class="goodNums">共计{{total_deal}}件商品</div>
          <div class="price">￥{{monetary}}</div>
        </div>
      </div>
    </div>
    <div style="padding:8px 0 0 0;position:relative;">
      <van-button style="position: absolute;right:200rpx" plain size="small" type="primary"  @click="toPay(order_num)" v-if="order_status=='1'">支付</van-button>
      <van-button style="margin-left:580rpx;display:inline-block;" plain size="small" type="primary"  @click="toDetail()">详情</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:this.$url
    };
  },
  props:[
    'headImg','shopName','order_status','total_deal','monetary','create_time','order_num'
  ],
  methods:{
      toDetail(){
        wx.navigateTo({
            url: "/pages/orderDetail/main?order_num="+this.order_num
        })
      },
      toPay(order_num){
      let that = this
      this.fly.post("wchatPay/unifiedorder/unifiedorder",{id:order_num})
        .then((res) => {
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: "MD5",
            paySign: res.data.paySign,
            success: function(res) {
              console.log('支付成功')
              wx.redirectTo({
                url: "/pages/orderDetail/main?order_num="+order_num
              });
            },
            fail: function(res) {
              console.log("支付失败");
            },
          });
        });
    },
  }
};
</script>

<style scoped>
.orderContainer {
  background: white;
  margin-top: 8px;
  padding: 30rpx 0;
  font-size: 14px;
  justify-content: space-between;
}
.main {
  display: flex;
  margin-left: 30rpx;
  border-bottom: 1px solid rgb(220, 220, 220);
}
.headImg {
  width: 35px;
  height: 35px;
  border-radius: 4px;
}
.detailCtn {
  margin-left: 20rpx;
  flex: 1;
}
.detaileCtnTop {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(220, 220, 220);
}
.shopName {
  font-weight: 500;
  font-size: 16px;
}
.orderTime {
  font-size: 11px;
  color: rgb(150, 150, 150);
  margin-top: 5px;
  margin-bottom: 7px;
}
.status {
  margin-right: 30rpx;
  margin-top: 5px;
}
.goodCtn {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
}
.goodNums {
  color: rgb(120, 120, 120);
}
.price {
  margin-right: 30rpx;
  font-weight: 600;
}
</style>
