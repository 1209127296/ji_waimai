<template>
  <div >
    <van-search
      placeholder="请输入搜索关键词"
      use-action-slot
      @input="setKeyword"
      v-model = "keyword"
      @search="serach"
    >
      <!-- <view slot="action" @search="serach" @click="serach">搜索</view> -->
    </van-search>

    <div class="content">
      <shopList :storelist="shops"></shopList>
    </div>
  </div>
</template>

<script>
  import shopList from "@/components/index/shopList"

  export default {
    name: "index",
    components:{shopList},
    data(){
      return {
        action:true,
        keyword:'',
        shops:[],
        // isSearch:1
      }
    },
    mounted(){
      console.log('mounted')
      // this.isSearch = this.$root.$mp.query.isSearch;
      console.log(this.$root.$mp.query.isSearch==0)
      if (this.$root.$mp.query.isSearch==0){
        //从分类点进来的
        this.category()
      } ;
    },
    methods:{
      category(){
        this.fly.post('findShopByType',{type:this.$root.$mp.query.category_id}).then((res)=>{
          this.shops = res.data.obj
        })
      },
      serach(event){
        console.log(this.keyword)
        console.log(event.mp.detail)
        try{
          if(typeof(event.mp.detail)=="string")
          this.keyword=event.mp.detail
        }catch(error){
        }
       
        console.log(event)
        this.fly.post('findShopByName',{
          name:this.keyword
          }).then((res)=>{
            if(res.data.obj){
              this.shops = res.data.obj
            }else{
              wx.showToast({
                title:"没有搜索到你需要的搜索的内容",
                icon:"none"
              })
            }
        })
      },
      setKeyword(event){
        console.log(event.mp.detail)
        this.keyword = event.mp.detail;
      }
    }
  };
</script>

<style scoped>
  .content {
    margin: 0 10px;
    /*background-color: black;*/
  }
</style>
