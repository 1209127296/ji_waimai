<template>
  <div >
    <swiper
      :indicator-dots="false"
      :autoplay="true"
      :interval="5000"
      :duration="500"
      indicator-active-color="#34AAFF"
    >
      <swiper-item v-for="(value,index) in mySwiper" :key="index" @>
        <img @click="goWeb(value.url)" :src="url+value.image" class="swiper-item"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: "jlswiper",
    props:['mySwiper'],
    methods: {
      goWeb(url) {
        console.log(this.mySwiper)
        if (url.length > 0) {
          wx.navigateTo({
            url: "/pages/web/main?url=" + encodeURI(url)
          });
        } else {
          console.log("url is null");
        }
        ;

      }
    },
    data(){
      return {
        url:this.$url
      }
    }
  };
</script>

<style scoped>
  .swiper-item{
    width: 100%;
    height: 160px;
  }
</style>
