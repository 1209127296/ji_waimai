<template>
  <!--<van-row>
    <van-col span="6">span: 8</van-col>
    <van-col span="6">span: 8</van-col>
    <van-col span="6">span: 8</van-col>
    <van-col span="6">span: 8</van-col>
  </van-row>-->
  <div class="category">
    <div class="categoryItem" v-for="(value,index) in categoryData" :key="index" :cid="value.id" @click="toUrl('/pages/search/main?isSearch=0&category_id='+value.id)">
      <img :src="url+value.images" :alt="value.name">
      <div class="name">{{value.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "category",
    props: ["categoryData"],
    watch: {
      "categoryData": function(val) {
      }
    },
    methods: {
      toUrl: function(url) {
        wx.navigateTo({
          url: url
        });
      }
    },
    data: function() {
      return {
        categoryList: new Array(5),
        url:this.$url,
      };
    }
  };
</script>

<style scoped>
  .category {
    display: flex;
  }

  .categoryItem {
    text-align: center;
    flex-grow: 1;
  }

  .categoryItem img {
    /*border: 1px black solid;*/
    height: 40px;
    width: 40px;
    border-radius: 500px;
  }

  .categoryItem .name {
    font-size: 14px;
    color: #767676;
  }
</style>
