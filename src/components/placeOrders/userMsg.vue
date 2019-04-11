<template>
<div class="headerCtn">
  <div class="headerTitle">订单配送至</div>
  <van-row>
    <van-col span="22">
      <div class="address" @click="selAddress">{{noaddress}}{{address.location}}</div>
  </van-col>
  <van-col span="2"><div class="selectAddress" @click="selAddress">></div></van-col>
  </van-row>
  <div class="user"><span>{{address.name}}</span><span style="margin-left:20rpx;">{{address.phone}}</span></div>
</div>
</template>

<script>
  export default {
    name: "userMsg",
    data(){
      return{
        // addressList:[],
        address: "",
        noaddress: "去新增收货地址吧！"
      }
    },
    mounted(){
      this.address="";
      this.getAddress();
    },
    onShow(){
      this.address="";
      this.getAddress()
    },
    methods:{
      selAddress(){
        wx.navigateTo({
            url: "/pages/address/main?isselect="+true
        })
      },
      getAddress(){
        this.fly.post("address/findDefaultAddress").then((res)=>{
          this.address = res.data.obj
          this.fly.post("getInstance",
            {
              latitude:this.address.latitude,longitude:this.address.longitude
            }
            ).then((res)=>{
            if(res.data.obj.ooMoney){
              this.$emit("getooMoney",res.data.obj.ooMoney)
            }else{
              this.$emit("getooMoney",0)
            }
            
          })
          if (this.address!==undefined) {
            this.noaddress= "";
            this.$emit("hasAddress",this.address)
            // for(var i=0; i<this.addressList.length; i++){
            //   if(this.addressList[i].is_default===true){
            //     this.address=this.addressList[i]
            //     this.$store.commit("setAddressId", this.address.id);
            //     return
            //   }
            // }
          }else{
            this.noaddress="去新增收货地址吧！"
          }
        });
      }
    }
  };
</script>

<style scoped>
.headerCtn{
  padding:30rpx;
  background:#34AAFF;
  color:white;
}
.headerTitle{
  font-size:15px;
  margin-bottom:8px;
}
.address{
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
  font-weight:600;
}
.selectAddress{
  width:100%;
  text-align: right;
}
.user{
  font-size:16px;
  margin-top:8px;
  margin-bottom:10px;
}
</style>
