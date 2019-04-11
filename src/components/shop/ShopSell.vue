<template>
  <div class="sellBox">
    <div class="blur" v-show="shopCartShow" @click="closeShopCart"></div>
    <div class="main">
      <scroll-view
        class="dabge"
        :style="'max-height:'+height+'px'"
        :scroll-y="true"
        @scrolltoupper="contentArriveTop">
        <div class="dabgeItem"
             v-for="(value,index) in goods" :key="index"
             :class="{ 'active': activeGroupId == value.id }"
             @click="changeActive(value.id)">
          <p>{{value.name}}</p>
        </div>
      </scroll-view>
      <scroll-view
        class="content"
        :style="'max-height:'+height+'px'"
        @scroll="contentDown"
        :scroll-y="true"
        @scrolltoupper="contentArriveTop"
      >
        <div class="goodBox" v-for="(value,index) in goods" :key="value.id" v-show="value.id == activeGroupId">
          <div class="title">
            {{value.name}}
          </div>
          <div class="goodList">
            <!-- <div class="groupEmtyp" v-if="value.food.length == 0">
              该目录还没有商品哦
            </div> -->
            <div class="goodCardItem" v-for="(v,i) in value.food " :key="v.id">
              <goodCard
                :shopId="shopId"
                :price="v.price"
                :dealName="v.name"
                :image="v.image"
                :dealId="v.id"
                :foodFormats="v.foodFormats"
                :monthSaleNum="v.monthSaleNum"
                @select="formatsSelect"
                v-if="v.status=='1'"
              >
              </goodCard>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="footer">
      <FooterBar
        :shopCart="shopCart"
        :shopCartShow="shopCartShow"
        :shopId="shopId"
        @clickShopCart="clickShopCart"
        :seller="seller"
      >
      </FooterBar>
    </div>
  </div>
</template>

<script>
  import FooterBar from "./FooterBar";
  import goodCard from "./goodCard";

  export default {
    name: "shopSell",
    components: {
      goodCard,
      FooterBar
    },
    props: {
      goods:{},
      height:{},
      shopId:{
        default:0
      },
      shopName:{
        default:'商店名称'
      },
      IsHaveScrollY:{
        default:false
      },
      seller:{}
    },
    data() {
      return {
        active: "active",
        activeGroupId:null,
        dabgeList: [],
        /*shopCart:[],*/
        shopCartShow:false
      };
    },

    methods: {
      formatsSelect(formats,goodData){
        this.$emit("changeSelect",formats,goodData)
      },
      contentDown:function(res){
        if(res.mp.detail.deltaY<0){
            this.$emit('contentDown')
        }
      },
      contentArriveTop:function(){
        this.$emit('contentArriveTop')
      },
      clickShopCart:function(){
        this.shopCartShow = !this.shopCartShow;
      },
      closeShopCart:function(){
        this.shopCartShow = false;
      },
      setInitActiveId:function(){
        // let keys = Object.keys(this.goods)
        var keys=[];
        for(let i=0;i<this.goods.length;i++){
          keys.push(this.goods[i].id)
        }
        this.activeGroupId = keys[0];
      },
      changeActive: function(id) {
        this.activeGroupId = id;
      },
      /*addGoods:function(good) {
        this.shopCart.push(good)
      },
      reduceGoods:function(good) {
        for(let i= 0; i<this.shopCart.length;i++){
          if(this.shopCart[i].id==good.id){
            this.shopCart.splice(i,1)
            return;
          }
        }
      }*/
    },
    watch:{
      goods:function() {
        this.setInitActiveId()
      },
    }
  };
</script>

<style scoped>
  .blur{
    position: fixed;
    z-index: 300;
    top: 0;
    left: 0;
    opacity: 0.3;
    height: 100vh;
    width: 100vw;
    background-color: #373737;
  }
  .main {
    min-height: 330px;
    background-color: #fbf9f8;
    display: flex;
  }

  .dabge {
    box-sizing: border-box;
    width: 100px;
    overflow-y: auto;
    padding-top: 5px;
    border-right: 0.1px #ebe9e8 solid;
    padding-bottom: 10px;
  }

  .dabgeItem {
    text-align: center;
    font-size: 14px;
    padding: 10px 5px;
  }

  .dabge .active {
    border-left: 3px #34aaff solid;
    color: #34aaff;
    padding-left: 2px;
    background-color: white;
  }

  .content {
    flex-grow: 1;
    overflow-y: auto;
  }

  .goodBox{
    padding-bottom: 10px;
  }
  .title {
    font-size: 14px;
    padding: 5px;
    background-color: #f6f6f6;
  }
  .groupEmtyp{
    color: silver;
    text-align: center;
    padding: 25px;
  }
  .goodCardItem {
    margin-bottom: 5px;
  }

  .footer {
    height: 42px;
  }
</style>
