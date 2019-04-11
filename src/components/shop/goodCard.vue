<template>
    <div class="goodCardBox">
        <div class="img">
          <img :src="url+image" @click="changeFlag()" :alt="dealName">
        </div>
        <div class="goodMsg">
          <div class="name">
            {{dealName}}
          </div>
          <div class="sellNum">
            月销售:{{monthSaleNum}}
          </div>
          <div class="moneyBox">
            <div class="money">
              <span>￥</span>{{price}}
            </div>
            <div class="operate">
              <span class="red" v-if="total>0"  @click="reduceGoods"> - </span>
              <span class="total" v-show="total>0" >{{total}}</span>
              <span class="add" @click="addGoods"> + </span>
            </div>
          </div>
        </div>

        

        <!-- 将图片放大 -->
        <div v-if="flag" class="img_div" @click="changeFlag()">
          <img :src="url+image" class="img_" />
        </div>
    </div>
</template>


<script>

  import cookie from '../saveCookie.js'

  export default {
    name: "goodCard",
    data () {
      return{
        flag:false,
        url:this.$url
      }
    },
    props:{
      dealName:{
        default:'商品名称'
      },
      price:{
        default: 0
      },
      image:{

      },
      dealId:{

      },
      shopId:{
        default:0
      },
      monthSaleNum:"",
      foodFormats:[],
    },
    methods:{
      addGoods (){
        let goodData = {
          shopId:this.shopId,
          price:this.price,
          id:this.dealId,
          image:this.image,
          dealName:this.dealName
        }
        if(this.foodFormats.length>0){
          this.$emit("select",this.foodFormats,goodData);
        }else{
          this.$store.commit('addGood',goodData)
        }
      },
      reduceGoods (){
        let goodData = {
          shopId:this.shopId,
          price:this.price,
          id:this.dealId,
          image:this.image,
          dealName:this.dealName
        }
        this.$store.commit('reduceGood',goodData)
      },
      changeFlag:function(){
        this.flag=!this.flag
      }
    },
    computed:{
      total:function() {
        let foodArray=[];
        let totalArray=[];
        let allTotal=null;
        var shopList=this.$store.getters.nowShopCartList.map((list,index)=>{
          if(list.id==this.dealId){
            foodArray.push(list)
          }
        })
        for(let i=0;i<foodArray.length;i++){
          totalArray.push(foodArray[i].total)
        }
        if(totalArray.length>0){
            allTotal=totalArray.reduce((a,b)=>{
              return a+b
          })
          return allTotal
        }
        // for (let i = 0; i<this.$store.getters.nowShopCartList.length;i++){
        //   if(this.$store.getters.nowShopCartList[i].id == this.dealId){
            
        //     return this.$store.getters.nowShopCartList[i].total;
        //   }
        // } ;
        return 0
      }
    }
  };
</script>

<style scoped>
  .goodCardBox{
    display: flex;
    background-color: white;
    padding: 5px;
  }
  .img{
    margin-right: 10px;
  }
  .img img{
    height: 80px;
    width: 80px;
  }
  .goodMsg{
    font-size: 14px;
    flex-grow: 1;
  }
  .goodMsg .name{
    font-weight: bold;
    margin-bottom: 10px;
  }
  .goodMsg .sellNum{
    font-size: 10px;
    color: #e1dfde;
    margin-bottom: 20px;
  }
  .goodMsg .moneyBox{
    display: flex;
    justify-content: space-between;
  }
  .goodMsg .money{
    font-size: 12px;
    color: orangered;
  }
  .goodMsg .money span{
    font-size: 14px;
  }
  .goodMsg .operate{
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }
  .goodMsg .operate .red{
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
  .goodMsg .operate .total{
    margin: 0 5px;
  }
  .goodMsg .operate .add{
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


.img_div{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0, 0, 0, .46);
  z-index:999;
}
.img_{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  display:block;
  margin:auto;
  height:750rpx;
  width:750rpx;
}
</style>
