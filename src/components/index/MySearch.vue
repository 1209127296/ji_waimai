<template>
    <div class="mySearch" @click="toUrl('/pages/search/main?isSearch=1')">
        <div class="myIconBox">
          <van-icon name="search" class="myIcon" />
        </div>
        <div class="input">
          <input type="text" placeholder="请输入搜索关键字">
        </div>
    </div>
</template>

<script>
  export default {
    name: "MySearch",
    methods:{
      toUrl:function(url) {
        wx.navigateTo({
          url:url
        });
      }
    }
  };
</script>

<style scoped>
  .mySearch{
    display: flex;
    background-color: white;
    padding: 5px 10px 3px 10px;
    border-radius: 3px;
  }
  .myIconBox{
    color: #767676;
    margin-right: 10px;
    padding-top: 7rpx;
  }
  .input input{
    margin: auto 0;
    font-size: 14px;
  }
</style>
