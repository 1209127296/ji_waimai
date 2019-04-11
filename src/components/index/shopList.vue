<template>
  <van-tabs :active="active" @click="onChange" color="#34AAFF" >
    <!--<van-tab title="距离">内容 1</van-tab>-->
    <van-tab title="店铺">
      <div  v-for="(value,index) of storelist" @click="toUrl(value.id)" :key="index">
        <shop-card  :shop="value"></shop-card>
      </div>
    </van-tab>
    <!--<van-tab title="评分">内容 3</van-tab>-->
    <!--<van-tab title="推荐">内容 4</van-tab>-->
  </van-tabs>
</template>

<script>
  import shopCard from '@/components/index/shopCard'
  export default {
    name: "shopList",
    props:['storelist'],
    data(){
      return {
        active: 0,
      }
    },
    components:{shopCard},
    methods:{
      onChange(){
      },
      toUrl(id){
        wx.navigateTo({
          url: '/pages/shop/main?shopid='+id
          // url: `/pages/shop/main?shopid='${this.shop.id}`
        })
      }
    }
  };
</script>

<style scoped>

</style>
