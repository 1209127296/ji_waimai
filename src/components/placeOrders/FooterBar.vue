<template>
  <div class="footerBox">
    <van-row>
      <van-col span="17">
        <div class="footerLeft">需要支付￥{{totalMoney+deliverMoney+ooMoney}}</div>
      </van-col>
      <van-col span="7">
        <div class="footerRight" @click="newOrder">{{status}}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      shopCartTotalGoods: [],
      status: "立即支付",
      pay_data:'',
      order_num: "",
      shopCar:"",
      shopId:0
    };
  },
  props: {
    // shopId: 0,
    order_remarks: {},
    addressId: {},
    totalMoney:{},
    deliverMoney:{},
    shopName:"",
    buyFoods:[],
    ooMoney:"",
    hasAddress:''
  },
  onUnload() {
    this.reset()
  },

  onLoad() {
    this.shopId = this.$root.$mp.query.shopId
      this.foods=[]
      this.reset()
    this.shopCar=this.$store.state.shopCart
       for(var i=0;i<this.shopCar.length;i++){
        if(parseInt(this.$root.$mp.query.shopId)==parseInt(this.shopCar[i].shopId)){
          this.shopCartTotalGoods=this.shopCar[i].goodList
        }
       }
    // this.mathPrice();
    
  },

  methods: {
    reset(){
      this.shopCartTotalGoods= [],
        this.foods=[],
        this.status="立即支付",
        this.pay_data='',
        this.order_num= "",
        this.shopCar=""
    },
    
    //付款
    callPay(order_num){
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
              that.reset()
              wx.redirectTo({
                url: "/pages/orderDetail/main?order_num="+order_num
              });
            },
            fail: function(res) {
              console.log("支付失败");
              that.reset()
              wx.redirectTo({
                url: "/pages/orderDetail/main?order_num="+order_num
              });
            },
            complete: function(res) {}
          });
        });
    },

    //提交新订单
    newOrder() {
      var allFoods=[];
      for(let i=0;i<this.buyFoods.length;i++){
        var foodobj=new Object;
        foodobj.foodName=this.buyFoods[i].dealName;
        foodobj.img=this.buyFoods[i].image;
        foodobj.num=this.buyFoods[i].total;
        foodobj.unitPrice=this.buyFoods[i].price;
        foodobj.price=this.buyFoods[i].price*this.buyFoods[i].total;
        foodobj.description=this.buyFoods[i].id
        allFoods.push(foodobj)
        }
      let that = this
      let orderAddressId = this.$store.state.addressId;
      /*  if (this.$root.$mp.query.addressId !=undefined){
          orderAddressId=this.$root.$mp.query.addressId
        } ;*/
        console.log(this.hasAddress)
      if (this.hasAddress!==undefined) {
        this.fly.post("order/addOrder", {
            shop:{
              id:this.shopId,
              name:this.shopName
            },
            deliveryPrice:this.deliverMoney,
            discountMoney:"0",
            realPay:this.totalMoney+this.deliverMoney+this.ooMoney,
            totalPrice:this.totalMoney+this.deliverMoney+this.ooMoney,
            remarks: this.order_remarks,
            address:{
              id:this.addressId
            },
            deliveryType:"计里外卖",
            orderDetails:allFoods,
          })
          .then((res) => {
            var code=Number(res.data.code)
            if (code>0) {
              // this.status = "支付";
              this.order_num = res.data.obj.id;
              this.callPay(this.order_num);
            } else {
              wx.showModal({
                title: "提示",
                content: res.msg
              });
            }
          });
      } else if (this.hasAddress==undefined) {
       wx.showToast({
         title:"请添加地址",
         icon:'none',
         duration:1000
       })
      }
    }
  }
};
</script>

<style scoped>
.footerBox {
  background-color: #686868;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.footerLeft {
  height: 50px;
  line-height: 50px;
  padding-left: 30rpx;
  color: white;
}
.footerRight {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #34aaff;
  color: white;
  font-size: 15px;
}
</style>
