<template>
  <div class="containers">
    <user-msg @getooMoney="getooMoney" @hasAddress="hasAddress"></user-msg>
    <div class="goodsDetail">
      <div style="padding:0 15px;background:white">
        <div class="shopName">{{shopName}}</div>
      </div>
      <van-cell value=" 单价 ">
        <div slot="title" style="display:flex">
          <div class="van-cell-text" style="width:260rpx;margin-left:20px">商品</div>
          <div style="margin-left:20rpx;width:100rpx">数量</div>
        </div>
      </van-cell>
      <good v-for="(good,index) in shopCartTotalGoods" :key="index" :dealName="good.dealName" :image="good.image" :price="good.price" :total="good.total"></good>
      <van-cell
        title="配送费"
        :value="'￥'+(deliverMoney+ooMoney)"
        icon="question-o"
        @click="prompt"></van-cell>
      <van-field @input="setorderRemarks" :value="order_remarks" clearable label="订单备注" placeholder="订单备注"/>
    </div>
    <footer-bar :shopId="this.$root.$mp.query.shopId" :order_remarks="order_remarks" :addressId="addressList.id" :deliverMoney="deliverMoney" :totalMoney="totalMoney" :ooMoney="ooMoney" :shopName="shopName" :buyFoods="shopCartTotalGoods" :hasAddress="addressList"></footer-bar>
  </div>

</template>

<script>
  import userMsg from "@/components/placeOrders/userMsg"
  import good from "@/components/placeOrders/good"
  import FooterBar from "@/components/placeOrders/FooterBar"
  export default {
    name: "index",
    components: {userMsg,good,FooterBar},
    data() {
      return {
        shopCar:'',
        shopCartTotalGoods:[],
        deliverMoney:'',
        order_remarks:"",
        shopName:'',
        shopId:'',
        addressList:'',
        totalMoney:'',
        ooMoney:0,
        address:''
      };
    },
    onShow(){
      this.fly.post("address/findAddress").then((res)=>{
          this.addressList = res.data.obj
          for(var i=0;i<this.addressList.length;i++){
            if(this.addressList[i].default===true){
              this.addressList=this.addressList[i]
              return
            }
          }
      });
    },
    mounted() {
      this.order_remarks="",
      this.shopCar=this.$store.state.shopCart
      this.shopId = this.$root.$mp.query.shopId
      for(var i=0;i<this.shopCar.length;i++){
        if(String(this.shopId)==String(this.shopCar[0].shopId)){
          this.shopCartTotalGoods=this.shopCar[i].goodList
        }
      }
      // this.shopCartTotalGoods=this.$store.state.shopCart
      this.deliverMoney=Number(this.$root.$mp.query.deliverMoney)
      this.totalMoney=parseInt(this.$root.$mp.query.totalMoney)  //url传值不会带小数点，传来的totalMoney如果是0.01就会变成0
      this.mathPrice();
      this.shopName=this.$root.$mp.query.shopName
      this.fly.post("address/findAddress").then((res)=>{
          this.addressList = res.data.obj
          for(var i=0;i<this.addressList.length;i++){
            if(this.addressList[i].default===true){
              this.addressList=this.addressList[i]
              return
            }
          }
      });
    },
    methods: {
      hasAddress(address){
        this.addressList=address;
      },
       prompt(){
         wx.showToast({
           title:'订单配送费是基础配送费'+this.deliverMoney+'元 加上超出配送范围按实际路程加收的额外配送费'+this.ooMoney+'元',
           icon:"none",
           duration:2000
         })
       },
       getooMoney(ooMoney){
         this.ooMoney=Number(ooMoney);
       },
       setorderRemarks(event){
         this.order_remarks = event.mp.detail;
       },
       //计算订单需要支付的价格
      mathPrice(){
        var priceList=[];
        for(let i=0;i<this.shopCartTotalGoods.length;i++){
          priceList.push(this.shopCartTotalGoods[i].price*this.shopCartTotalGoods[i].total)
        }
        this.totalMoney=priceList.reduce((a,b)=>{
          return a+b;
        })
        this.totalMoney=Math.floor(this.totalMoney*100)/100
      },
    },
  };
</script>

<style scoped>
  .goodsDetail{
    margin-bottom:55px;
  }
  .shopName{
    padding:0 20rpx;
    height:50px;
    line-height:50px;
    font-weight:600;
    border-bottom:1px solid rgb(230,230,230);
    font-size:18px;
  }
</style>
