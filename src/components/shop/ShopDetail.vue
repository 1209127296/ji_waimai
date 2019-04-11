<template>
    <div class="detailBox">
      <van-cell-group>
        <van-cell
          :title="'营业时间：'+shop.businessHours"
          icon="clock-o"
        >
        </van-cell>
        <van-cell
          :title="'电话：'+shop.phone"
          @click="call"
          icon="phone-o"
        >
        </van-cell>
        <van-cell
          :title="'地址：'+shop.location"
          icon="location-o"
        >
        </van-cell>
     <!--   <van-cell
          title="商家环境"
          is-link
          icon="photo-o"
        >
        </van-cell>-->
      </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "ShopDetail",
    props:['shop','open_time','tel','address'],
    methods:{
      call(){
        wx.makePhoneCall({
          phoneNumber:this.shop.phone
        })
      }
    }
  };
</script>

<style scoped>
  .detailBox{
    padding-top: 10px;
    min-height: 350px;
    background-color: #fbf9f8;
  }
 /* .myIcon{
    height: 20px;
    width: 20px;
    margin-top: 3px;
    margin-right: 10px;
  }*/
</style>
