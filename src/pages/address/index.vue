<template>
  <div>
    <div style="margin-bottom:60px;">
    <theaddress
      v-for="(address,index) in addressList" :key="index"
      :username="address.name"
      :mobile="address.phone"
      :address="address.location"
      :id="address.id"
      :isselect="isselect"
      :is_default="address.default"
    >
    </theaddress>
      <div class="empty" v-show="addressList.length == 0">请添加收货地址</div>
    </div>
    <div class="footer">
      <van-button class="addBtn" plain type="primary" size="large" @click="addAddress">新增地址</van-button>
    </div>
  </div>
</template>

<script>
  import theaddress from "@/components/address/theaddress";

  export default {
    name: "index",
    components: { theaddress },
    data() {
      return {
        addressList: [
        ],
        isselect:false
      };
    },
    mounted() {
      if(this.$root.$mp.query.isselect=="true"){
        this.isselect=true;
      }
    },
    onShow() {
      this.getAddress();
    },

    methods: {
      getAddress() {
        this.fly.post("address/findAddress").then((res)=>{
          this.addressList = res.data.obj
        });
      },
      addAddress(){
        wx.navigateTo({
            url: "/pages/editAddress/main?isedit="+false
        })
      },

    }


  };
</script>

<style scoped>
  .footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }
  .addBtn {
    width: 90%;
  }
  .empty{
    padding: 20px;
    text-align: center;
    color: #c4c4c4;
    font-size: 14px;
  }
</style>
