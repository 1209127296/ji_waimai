// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    wxuserinfo: {},
    shopCart: [],//购物车
    code:'',//用于微信openid获取
    auth:false,//是否已经进行授权
    login:false,//是否已经登录
    token:'',
    nowActiveShopId:0,//用户当前浏览的商铺id(用于商铺页面展示购物车商品)
    addressId: 0,//用户当前地址
    cookie:"",
  },
  mutations: {
    setUserInfo (state,userInfo) {
      state.userInfo = userInfo
    },
    setCode(state,code){
      state.code = code
    },
    setToken(state,token){
      state.token = token
    },
    addGood (state,good){
      /*添加商品*/
      /*寻找是否已存在该商铺的购物车*/
      for(let i = 0;i<state.shopCart.length;i++){
        if(state.shopCart[i].shopId == good.shopId){
          /*存在该商铺的购物车*/
          for(let j = 0;j<state.shopCart[i].goodList.length;j++){
            /*寻找商铺购物车是否存在该商品*/
            if(state.shopCart[i].goodList[j].id == good.id&&state.shopCart[i].goodList[j].price == good.price){
              /*商铺购物车存在该商品,数量+1*/
              state.shopCart[i].goodList[j].total++
              return;
            }
          }
          /*商铺购物车不存在该商品,将商品推入商铺购物车*/
          let myGood = {
            image:good.image,
            id:good.id,
            dealName:good.dealName,
            total:1,
            price:good.price
          }
          state.shopCart[i].goodList.push(myGood)
          return;
        }
      }
      /*不存在该商铺的购物车,新建商铺和商铺购物车，推入购物车列表*/
      let myGood = {
        image:good.image,
        id:good.id,
        dealName:good.dealName,
        total:1,
        price:good.price
      }
      let myShopCart = {
          shopId:good.shopId,
          goodList:[myGood]
      }
      state.shopCart.push(myShopCart)
    },
    reduceGood(state,good){
      /*减少商品*/
      /*查询该商铺所属商铺*/
      for(let i = 0 ;i<state.shopCart.length;i++){
        if(state.shopCart[i].shopId == good.shopId){
          /*查找该商品*/
          for(let j = 0 ;j<state.shopCart[i].goodList.length;j++){
            /*如果商品数量大于1，直接减少数量*/
            if(state.shopCart[i].goodList[j].id == good.id){
              if(state.shopCart[i].goodList[j].total>1){
                state.shopCart[i].goodList[j].total--;
                return;
              }
              /*如果商品只有一个，删除该商品*/
              else{
                state.shopCart[i].goodList.splice(j,1);
                /*删除该商品后，如果商铺购物车已经清空，则删除该商店购物车*/
                if(state.shopCart[i].goodList.length == 0){
                  state.shopCart.splice(i,1)
                  return;
                }
                return;
              }
            }
          }
        }
      }
    },
    setAddressId(state, addressId) {
      state.addressId = addressId;
    },
    cleanShopCart(state,id){
      /*清空指定商铺的购物车*/
      for(let i = 0 ;i<state.shopCart.length;i++){
        if(state.shopCart[i].shopId == id){
          state.shopCart.splice(i,1)
          return;
        }
      }
    },
    cleanAllShopCart(state){
      state.shopCart=[]
    },
    setNowActiveShopId(state,id){
      /*设置当前浏览的商铺id*/
      state.nowActiveShopId = id;
    },
    setWxuserinfo(state,wxuserinfo){
      this.wxuserinfo = wxuserinfo
    },
    //保存cookie
    saveCookie(state,cookie){
      state.cookie=cookie
    }
  },
  getters:{
    nowShopCartList:function(state){
      //当前商铺购物车商品列表
      let goodList = [];
      for(let i = 0 ;i<state.shopCart.length;i++){
        if(state.shopCart[i].shopId == state.nowActiveShopId){
          goodList = state.shopCart[i].goodList;
          break;
        }
      }
      return goodList;
    },
    shopCartTotalGoods:function(state) {
      //当前商铺购物车总商品数
      let total = 0;
      for(let i = 0; i<state.shopCart.length;i++){
        if(state.shopCart[i].shopId == state.nowActiveShopId){
          for (let j = 0; j<state.shopCart[i].goodList.length;j++){
            total+=state.shopCart[i].goodList[j].total;
          }
          break;
        }
      }
      return total;
    },
    shopCartTotalPrice:function(state) {
      //当前商铺购物车商品总价
      let money = 0;
      for(let i = 0; i<state.shopCart.length;i++){
        if(state.shopCart[i].shopId == state.nowActiveShopId){
          for (let j = 0; j<state.shopCart[i].goodList.length;j++){
            money+=state.shopCart[i].goodList[j].total*state.shopCart[i].goodList[j].price;
          }
          break;
        }
      }
      return money;
    },
  },
  //接收cookie
  actions:{
    getCookie(context,cookie){
      context.commit("saveCookie",cookie)
    }
  }
})

/*
* 购物车数据结构
* shopCart:[
*               {
*                 id:商店id
*                 goodList:[]该商店下单的商品数组
*                 }
*           ]
* */

export default store
