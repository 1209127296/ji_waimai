<template>
    <div class="ItemBox">
      <div class="name">
        {{dealName}}
      </div>
      <div class="totalOperate">
        <div class="totalPrice">
          <span>￥</span>{{price*total}}
        </div>
        <div class="operate">
          <span class="red" v-if="total>0"  @click="reduceGoods"> - </span>
          <span class="total" v-show="total>0">{{total}}</span>
          <span class="add" @click="addGoods"> + </span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "ShopCartGoodItem",
    data (){
      return{

      }
    },
    methods:{
      addGoods (){
        let goodData = {
          price:this.price,
          shopId:this.shopId,
          id:this.id,
          image:this.image,
          dealName:this.dealName
        }
        this.$store.commit('addGood',goodData)
      },
      reduceGoods (){
        let goodData = {
          price:this.price,
          shopId:this.shopId,
          id:this.id,
          image:this.image,
          dealName:this.dealName
        }
        this.$store.commit('reduceGood',goodData)
      }
    },
    props:{
      dealName:{
        default:'商品名称'
      },
      price:{
        default:0
      },
      id:{

      },
      total:{
        default:0
      },
      image:{

      },
      shopId:{
        default:0
      }
    }
  };
</script>

<style scoped>
  .ItemBox{
    font-size: 14px;
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
  }
  .totalOperate{
    display: flex;
  }
  .totalPrice{
    margin-right: 20px;
    color: orangered;
  }
  .totalPrice span{
    font-size: 10px;
  }
  .operate{
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }
  .operate .red{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 16px;
    display: inline-block;
    height: 18px;
    width: 18px;
    color: #34aaff;
    border-radius: 500px;
    border: 1px #34aaff solid;
  }
  .operate .total{
    margin: 0 5px;
  }
  .operate .add{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 16px;
    display: inline-block;
    height: 18px;
    width: 18px;
    border-radius: 500px;
    background-color: #34aaff;
    border: 1px #34aaff solid;
    color: white;
  }
</style>
