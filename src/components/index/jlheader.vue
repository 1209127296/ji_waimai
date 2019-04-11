<template>
  <div class="bg">
   <!-- <van-row>
      <van-col span="24" ><p style="margin: 8px 0"><van-icon name="aim"/>定位中</p></van-col>
      <van-col span="24">
        <van-search
          :value="value"
          placeholder="请输入搜索关键词"
          @click="toSearch"
        />
      </van-col>


    </van-row>-->
    <div class="addressBox">
      <p><van-icon name="location" style="margin-right: 5px;" />莲花县</p>
    </div>
    <div class="searchBox">
      <!--<van-search
        :value="value"
        placeholder="请输入搜索关键词"
        @click="toSearch"
      />-->
      <MySearch></MySearch>
    </div>
  </div>

</template>

<script>
  import MySearch from '@/components/index/MySearch'
  export default {
    name: "jlheader",
    components:{
      MySearch
    },
    methods:{
      toSearch(){
        console.log('sousuo')
      }
    },
    data(){
      return {
        value:''
      }
    }
  };
</script>

<style scoped>
.bg{
  background-color: #34AAFF;
 /* height: 80px;*/
  color:white;
  padding: 10px 10px;

}
.addressBox{
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
