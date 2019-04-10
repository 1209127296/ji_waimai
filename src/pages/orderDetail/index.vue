<template>
  <div style="background:rgb(210,210,210);margin-bottom:60px;">
    <div style="background:white">
      <goods :shopName="order.name" :shopId="shopId" :goods="order.OrderDetails"></goods>
      <div style="display:flex;justify-content:space-between;line-height:55px;height:55px;padding-left:15px;">
        <div style="color:#34AAFF;font-size:13px;" @click="callTel(bis_tel)">
          <van-icon name="phone"/>
          联系商家
        </div>
        <div style="margin-right:15px;">
          <span style="font-size:13px;">实付</span>
          <span>￥{{order.realPay}}</span>
        </div>

      </div>
      <van-cell-group>
        <van-cell
          title="备注"
          :label="order.remarks"
        />
        <van-cell
          title="下单时间"
          :label="order.createDate"
        />
      </van-cell-group>
      <van-panel title="订单号" :desc="order_num" :status="'状态：'+order.status" use-footer-slot>
        <div slot="footer">
          <van-button size="large" v-if="order.status == '未支付'" @click="callPay" type="primary">付款
          </van-button>
        </div>
      </van-panel>

    </div>


    <div style="margin-top:10px;background:white;font-size:14px;" >
      <div
        style="padding-left:15px;line-height:35px;height:35px;border-bottom:1px rgb(233,233,233) solid"
      >配送信息
      </div>
      <div style="color:rgb(120,120,120);padding-left:17px;font-size:13px">
        <div style="display:flex;height:35px;line-height:35px;border-bottom:1px rgb(233,233,233) solid;">
          <div>送达时间:</div>
          <div>尽快送达</div>
        </div>
        <div style="display:flex;padding:10px 15px 10px 0;border-bottom:1px rgb(233,233,233) solid;">
          <div >送货地址:</div>
          <div style="display:block">
            <div>{{orderAddress.name}}</div>
            <div>{{orderAddress.phone}}</div>
            <div>江西省 萍乡市 莲花县 {{orderAddress.location}}</div>
          </div>
        </div>
        <div style="display:flex;height:35px;line-height:35px;border-bottom:1px rgb(233,233,233) solid;">
          <div>配送方式:</div>
          <div>{{order.deliveryType}}</div>
        </div>
        <div style="display:flex;justify-content:space-between;height:35px;line-height:35px;padding-right:15px;" v-if="isDeliver">
          <div>配送员:{{deliver.name}}</div>
          <div style="display:flex" @click="callTel(deliver.phone)">
            <div style="color:#34AAFF">
              <van-icon name="phone"/>
              联系配送员
            </div>
            <div style="margin:0 10px;">|</div>
            <div>{{deliver.phone}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import goods from "@/components/orderDetail/goods";
  import { setInterval, clearInterval } from 'timers';

  export default {
    components: { goods },
    data() {
      return {
        timer:null,
        order_num: "",
        order: {
          // order: {
          //   name: "",
          //   bis_id: "",
          //   monetary: 0,
          //   order_status: "",
          //   order_remarks: "",
          //   user_tel:'',
          //   user_name:'',
          //   create_time:'',
          //   deliverer_mobile:'',
          // },
          // detail: []

        },
        shopId:"",
        //收货人信息从order里面被我拿出来了！
        orderAddress:"",
        //骑士的信息在这里，之前都是写的假数据
        deliver:"",
        //订单详细信息
        //是否显示可以配送
        isDeliver: false,
        bis_tel:''//商户电话
      };

    },

    methods: {
      callTel(phoneNumber){
        wx.makePhoneCall({
          phoneNumber: phoneNumber// 仅为示例，并非真实的电话号码
        })
      },
      callPay() {
        let that = this;
        this.fly.post("wchatPay/unifiedorder/unifiedorder",{id:that.order_num})
          .then((res) => {
            console.log(res)
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: "MD5",
              paySign: res.data.paySign,
              success: function(res) {
                console.log("支付成功");
                setTimeout(()=>{
                  wx.redirectTo({
                  url: "/pages/orderDetail/main?order_num=" + that.order_num
                });
                },2000)
              },
              fail: function(res) {
                console.log("支付失败");
              },
              complete: function(res) {
              }
            });
          });
      },
      getDeliveryByOrder(){
        this.fly.post("order/getDeliveryByOrder",{id:this.order_num}).then((res)=>{
          console.log(res)
          this.deliver=res.data.obj
        })
      },
      getOrderDetail() {
        this.fly.post("order/findOrderById",{id:this.order_num}).then((res) => {
          console.log(res.data)
          if(res.data.obj.deliveryStatus>1){
            this.getDeliveryByOrder()
          }
          this.order = res.data.obj;
          this.shopId=this.order.shop.id
          this.bis_tel=this.order.shop.phone
          this.orderAddress=this.order.address;
          // this.getShopMsg(res.data.order.shop.id)
          if (res.data.obj.status=='已接单'
            ||res.data.obj.status=='配送中'
            ||res.data.obj.status=='已完成'
          ){
            //查询配送信息
            this.isDeliver = true
          } ;
        });
      }
    },
    mounted() {
      var _this=this;
      _this.order_num = _this.$root.$mp.query.order_num;
      _this.getOrderDetail();
      _this.deliver="";
      // _this.getDeliveryByOrder();
      // this.timer=setInterval(function(){
      //   _this.order_num = _this.$root.$mp.query.order_num;
      //   _this.getOrderDetail();
      // },10000)
      
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
  };
</script>

<style scoped>
</style>
