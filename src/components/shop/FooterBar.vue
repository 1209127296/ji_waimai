<template>
    <div class="footerBox">
      <!--购物车商品列表-->
      <div class="goodsListBox" v-show="shopCartShow">
        <div class="title">
          <span>已选商品</span>
          <span @click="cleanShopCart">清空</span>
        </div>
        <div class="goodsList">
          <div class="emptyMsg" v-show="goodTotal == 0">
            购物车空空如也
          </div>
          <div class="goodsItem" v-for="(value,index) in goodsList" :key="index">
            <shopCartGoodItem
              :shopId="shopId"
              :dealName="value.dealName"
              :price="value.price"
              :image="value.image"
              :id="value.id"
              :total="value.total"
            ></shopCartGoodItem>
          </div>
        </div>
      </div>
      <div class="footerBar" @click="clickShopCart">
        <div class="shopCart" :class="{'noEmpty': goodTotal != 0}">
          <van-icon name="shopping-cart" />
          <span class="mylabel" v-if="goodTotal!=0">{{goodTotal}}</span>
        </div>
        <div class="moneyBox">
          <div class="money">
            ￥{{totalMoney}}
          </div>
          <div class="deliveryMoney">
            配送费{{seller.specialDeliveryPrice}}元
          </div>
        </div>
        <div class="payButton">
          <div :class="{'empty': payButtonText.status == 0}"  @click.stop="toPlaceOrders">{{payButtonText.text}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import shopCartGoodItem from './ShopCartGoodItem'
  export default {
    name: "FooterBar",
    components:{
      shopCartGoodItem
    },
    data (){
      return{
        goodNums:"",
      }
    },
    props:{
      shopCartShow:{
        default:false
      },
      shopId:{
        default:0
      },
      seller:{}
    },
    
    methods:{
      toPlaceOrders(){
        // console.log(this.totalMoney)
        // console.log(this.seller)
        // console.log(this.$store.getters.shopCartTotalGoods)
        if (this.payButtonText.status==0){
          return
        } ;
        if (this.$store.getters.shopCartTotalGoods >= 1 && this.totalMoney >= this.seller.minFree) {
          console.log(this.seller.name+this.shopId+this.totalMoney)
          wx.navigateTo({
            url:"/pages/placeOrders/main?deliverMoney="+this.seller.specialDeliveryPrice+"&shopName="+this.seller.name+"&shopId="+this.shopId+"&totalMoney="+this.totalMoney
          })
        }
      },  
      clickShopCart:function() {
        this.$emit('clickShopCart')
      },
      cleanShopCart:function(){
        this.$store.commit('cleanShopCart',this.shopId)
      }
    },
    computed:{
      totalMoney:function(){
       return Math.floor(this.$store.getters.shopCartTotalPrice * 100)/100
      },
      goodTotal:function() {
       return this.$store.getters.shopCartTotalGoods
      },
      goodsList:function() {
        return this.$store.getters.nowShopCartList;
      },
      payButtonText:function() {
        if(this.seller.open == true){
          if(this.totalMoney<this.seller.minFree){
            return {
              status:0,
              text:"还差"+Math.floor((this.seller.minFree - this.totalMoney)*100)/100+ "元起送"
            }
          }
          else{
            return{
              status:1,
              text:"结算"
            }
          }
        } 
        else{
          return{
            status:0,
            text:"未营业"
          }
        }
      }
    }
  };
</script>

<style scoped>
  .goodsListBox{
    z-index: 350;
    background-color: white;
    padding-bottom: 45px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .goodsListBox .title{
    font-size: 14px;
    padding: 10px 15px;
    background-color: #e1dfde;
    color: #555555;
    display: flex;
    justify-content: space-between;
  }
  .goodsList{
    max-height: 250px;
    overflow-y: auto;
  }
  .goodsList .goodsItem{
    border-bottom: 0.5px #ebe9e8 solid;
  }
  .goodsList .goodsItem:last-child{
    border: none;
  }
  .emptyMsg{
    color: silver;
    text-align: center;
    padding: 20px;
  }
  .footerBar{
    z-index: 350;
    background-color: #686868;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
  }
  .shopCart{
    position: absolute;
    bottom: 5px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 500px;
    background-color: #373737;
    border: 5px #555555 solid;
    font-size: 25px;
    color: #c3c1c0;
    text-align: center;
    line-height: 48px;
  }
  .noEmpty{
    background-color: #34aaff;
    color: white;
  }
  .shopCart .mylabel{
    border-radius: 500px;
    position: absolute;
    font-size: 10px;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    height: 15px;
    padding: 0 5px;
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .moneyBox{
    margin-left: 90px;
    padding: 5px 0;
  }
  .moneyBox .money{
    font-size: 14px;
    color: white;
  }
  .moneyBox .deliveryMoney{
    font-size: 11px;
    color:#c3c1c0;
  }
  .payButton{
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
  }
  .payButton div{
    font-family: '微软雅黑';
    font-size: 15px;
    font-weight: bold;
    padding: 0 25px;
    display: flex;
    color:white;
    background-color: #34aaff;
    align-items:center;
  }
  .payButton .empty{
    background-color: #c3c3c3;
  }
</style>
