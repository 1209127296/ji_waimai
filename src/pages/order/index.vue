<template>
  <div>
    <div class="orderContainer">
      <order v-for="(o,index) in orders" :key="index"
      :headImg="o.shop.logo"
      :shopName="o.name"
      :order_status="o.userStatus"
      :total_deal="o.orderDetails.length"
      :monetary="o.realPay"
      :create_time="o.createDate"
      :order_num="o.id"
      ></order>
    </div>
    <div class="empty" v-show="orders.length == 0">
      暂无订单
    </div>
    <jlfooter></jlfooter>
  </div>
</template>

<script>
  import jlfooter from '@/components/jlfooter'
  import order from '@/components/order/order'
  // import { setInterval, clearInterval } from 'timers';

  export default {
    components:{jlfooter,order},
    data(){
      return {
        orders:[],
        // timer:null
      }
    },
    mounted(){
      var _this=this;
      _this.getOrders()
      // console.log(this.timer)
    },
    // onShow(){
    //   this.getOrders()
    // },
    methods:{
      getOrders(){
        this.fly.post('getUserOrders').then((res)=>{
          console.log(res.data.obj[0].userStatus)
          this.orders = res.data.obj
          // var unicode = unescape(this.orders[1].user.name.replace(/\u/g, "%u"));
          // console.log(unicode)
        })
      },
    },

  };
</script>

<style scoped>
.orderContainer{
  background:rgb(219, 219, 219);
  margin-bottom:60px;
}
.empty{
  text-align: center;
  color: #c4c4c4;
}
</style>
