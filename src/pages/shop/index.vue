<template>
  <div>
    <div class="loading" id="loading" v-show="isLoading" :style="{heigth:loadingHeight}">
        <img src="https://wm-1253155025.cos.ap-guangzhou.myqcloud.com/uploadFiles/20150210104950809.gif" alt="">
    </div>
    <scroll-view class="shopIndex" :scroll-y="true" :scroll-into-view="topId" @scroll="pageScroll" v-show="isLoading==false">
      <div class="header" id="header">
        <ShopHeader :shopName="shop.name" :image="shop.logo" :deliveryPrice="shop.specialDeliveryPrice" :minPrice="shop.minFree"></ShopHeader>
      </div>
      <div class="main">
        <div class="myTab" id="myTab">
          <div :class="{'active': page=='ShopSell'}" @click="changePage('ShopSell')">
            外卖
          </div>
          <!--<div :class="{'active': page=='comment'}" @click="changePage('comment')">
            评价
          </div>-->
          <div :class="{'active': page=='ShopDetail'}" @click="changePage('ShopDetail')" >
            详情
          </div>
        </div>
        <div class="mainContent">
          <div class="shopSellBox" v-show="page=='ShopSell'">
            <ShopSell
              :shopName="shop.name"
              :height="contentNeedHeight"
              :goods="foodType"
              @contentDown="sellContentDown"
              @contentArriveTop="sellContentArriveTop"
              :seller="shop"
              :shopId="shopId"
              @changeSelect="changeHasFormats">
            </ShopSell>
          </div>
          <div class="commentBox" v-show="page=='comment'">
            <comment :height="contentNeedHeight"></comment>
          </div>
          <div class="shopDetailBox" v-show="page=='ShopDetail'">
            <ShopDetail :shop="shop"></ShopDetail>
          </div>
        </div>
      </div>

      <selectFormats v-if="hasFormats"
      :formats="showFormats"
      @addToCart="addToCart"
      >
      </selectFormats>
    </scroll-view>
  </div>
</template>

<script>
  import ShopHeader from '@/components/shop/ShopHeader'
  import ShopSell from '@/components/shop/ShopSell'
  import FooterBar from '@/components/shop/FooterBar'
  import comment from '@/components/shop/comment'
  import ShopDetail from '@/components/shop/ShopDetail'
  import selectFormats from '@/components/shop/selectFormats'

  export default {
    name: "index",
    components:{
      ShopHeader,
      ShopSell,
      FooterBar,
      comment,
      ShopDetail,
      selectFormats
    },
    data () {
      return{
        foodType:"",
        page: 'ShopSell',
        topId:'',
        shopId:0,
        goods:[],
        seller:{},
        headerIsShow:true,
        contentNeedHeight:0,
        headerHeight:0,
        shop:{},
        hasFormats:false,
        showFormats:"",
        goodData:"",
        isLoading:true,
        loadingHeight:""
      }
    },
    onUnload(){
      this.$store.commit("cleanAllShopCart");
      this.foodType=[];
      this.goods=[];
      this.isLoading=true
    },
    methods:{
      // getShopMsg(bis_id){

      //   this.fly.get("/wxapp/shop/getShopMsg?shopid=" + bis_id+"&time="+new Date().getTime()).then((res) => {
      //     this.shop = res.data
      //   })
      // },

      addToCart(selectPrice){
        this.goodData.price=selectPrice;
        this.$store.commit('addGood',this.goodData);
        this.hasFormats=false;
      },
      changeHasFormats(getFormats,goodData){
        this.hasFormats=true;
        this.showFormats=getFormats;
        this.goodData=goodData
      },
      sellContentDown (){
        /*商品滑动*/
        this.topId = 'myTab'
      },
      sellContentArriveTop (){
        /*商品列表或种类列表滑动到顶部*/
        this.topId = ''
      },
      pageScroll:function(e){
        /*页面滑动*/
        if(e.mp.detail.deltaY>0){
          this.topId = ''
        }
      },
      changePage: function(pageName){
        this.page = pageName;
      },
      //获取所有商品
      getGoods(){
        this.fly.post("protalShop",{id:this.shopId}).then((res)=>{
          this.foodType=res.data.obj[0].foodType;
          this.shop=res.data.obj[0].shop;
          this.isLoading=false
          
          // this.goods = res.data
        })
      },
      //获取商店信息
      // getSeller(){
      //   this.seller = {}
      //   this.fly.get('/sell/api/seller?bis_id='+this.shopId).then((res)=>{
      //     /*console.log(res)*/
      //     this.seller = res.data
      //     // console.log(this.seller)
      //   })
      // },
      /*获取内容部分（商品和评论等）所需高度*/
      getContentHeightNeed:function() {
        let that = this;
        wx.getSystemInfo({
          success: function(res) {
            let windowHeight = res.windowHeight;
            let query = wx.createSelectorQuery()
            that.loadingHeight=windowHeight;
            query.select("#myTab").boundingClientRect();
            query.select("#header").boundingClientRect();
            query.exec((res)=> {
              let tabHeight = res[0].height
              let headerHeight = res[1].height
              that.headerHeight = headerHeight;
              that.contentNeedHeight = windowHeight - tabHeight*2;
            })
          }
        });
      },
      setNowActiveShopId:function() {
        /*设置当前商铺id*/
        this.$store.commit('setNowActiveShopId',this.shopId);
      }
    },
    watch:{
      contentNeedHeight:function() {
        console.log(this.contentNeedHeight);
      }
    },
    beforeMount(){
      // this.getShopMsg(this.$root.$mp.query.shopid)
    },
    mounted(){
      this.shop=[];
      this.foodType=[];
      this.shopId = this.$root.$mp.query.shopid;
      this.$store.commit('cleanShopCart',this.shopId);
      this.getGoods();
      this.getContentHeightNeed();
      // this.getSeller()
      this.setNowActiveShopId();
    },
  };
</script>

<style scoped>
  .shopIndex{
    height: 100vh;
  }
  .main{
    background-color: #fbf9f8;
  }
  .myTab{
    background-color: white;
    display: flex;
    border-top: 0.3px #e1dfde solid;
  }
  .myTab div{
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    padding: 10px;
  }
  .myTab .active{
    border-bottom: 3px #34aaff solid;
    color: #34aaff;
  }
  .loading{
    background: rgba(255, 255, 255, .5);
    z-index: 999;
  }
  .loading img{
    width: 80rpx;
    height: 80rpx;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>
