<template>
  <div class="addressCtn">
    <van-row  gutter="0">
      <van-col span="20">
        <div @click="selAddress"><span class="username">{{username}}</span><span class="mobile">{{mobile}}</span></div>
        <div class="addr" @click="selAddress">江西省 萍乡市 莲花县{{address}}</div>
      </van-col>
      <van-col span="4">
        <div class="edit" @click="editAddress(username,mobile,address,id,is_default)">编辑</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "theaddress",
    props:['username','mobile','address','id','is_default','isselect'],
    methods:{
      editAddress(username,mobile,address,id,is_default){
        wx.navigateTo({
            url: "/pages/editAddress/main?username="+username+"&mobile="+mobile+"&address="+address+"&id="+id+"&isedit="+true+"&is_default="+is_default
            // url: "/pages/orderDetail/main?order_num="+this.order_num
        })
      },
      selAddress(){
        this.setdefault()
      },
      setdefault(){
        this.$store.commit("setAddressId", this.id);
        this.fly.post("address/updateAddress",{
          name:this.username,
          tel:this.mobile,
          address_detail:this.address,
          isDefault:true,
          id:this.id
        }).then((res)=>{
          if(this.isselect==true){
            wx.navigateBack({
                  delta: -1
            });
          }
        });
      }
    },

  };
</script>

<style scoped>
.addressCtn{
  padding:20rpx 20rpx 20rpx 0;
  margin-left:30rpx;
  font-size:17px;
  border-bottom:1px solid rgb(230,230,230);
}
.username{
  line-height:24px;
}
.mobile{
  margin-left:20rpx;
  line-height:24px;
}
.addr{
  color:rgb(100,100,100);
  font-size:16px;
  line-height:24px;
}
.edit{
  text-align: center;
  color:red;
  width:100%;
  height:100%;
  margin-top:24px;
}
</style>
