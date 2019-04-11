<template>
  <div>
    <jlheader></jlheader>
    <div class="content">
      <div class="categoryBox">
        <category :categoryData="categoryData"></category>
      </div>
      <div class="swiperBox">
        <jlswiper :mySwiper="mySwiper"></jlswiper>
      </div>

      <div class="shopListBox">
        <shopList :storelist="storelist"></shopList>
      </div>
      <van-dialog :show="authDialog" message="点击获取授权，开始使用！"
        confirmButtonText="获取授权"
        confirmButtonOpenType="getUserInfo"
        @getuserinfo="bindGetUserInfo"
        open-type="getUserInfo" lang="zh_CN"
        async-close>
      </van-dialog>
      <van-dialog :show="getPhone" message="请再授权一下手机号哟~"
        confirmButtonText="获取手机号"
        confirm-button-open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        open-type="getPhoneNumber"
        async-close>

      </van-dialog>
      <!--<van-button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">用户授权
      </van-button>
      <van-button type="primary" @click="getopenid">openid获取</van-button>
      <van-button type="primary" @click="login">微信登录</van-button>
      <van-button type="primary" @click="dumpUser">打印用户</van-button>
      <van-button type="primary" @click="checkAuth">检查授权</van-button>
      <van-button type="primary" @click="authDialog = true">打开授权提示</van-button>
      <van-button type="primary" @click="callPay">微信支付</van-button>
      <van-button type="primary" @click="cart">购物车</van-button>-->
      <div style="height: 2rem"></div>
    </div>
    
    <div class="iAmAbox"></div>
    
    <jlfooter></jlfooter>
  </div>
</template>

<script>
  import jlfooter from "@/components/jlfooter";
  import jlheader from "@/components/index/jlheader";
  import category from "@/components/index/category";
  import shopList from "@/components/index/shopList";
  import jlswiper from "@/components/index/jlswiper";

  export default {
    data() {
      return {
        mySwiper: new Array({ src: "" }),
        userInfo: {},
        categoryData: [],//分类的数组
        storelist: [],//商铺列表
        authDialog: false,
        wxuserinfo:{},
        aaa:'bbb',
        getPhone:false,
        userPhone:"",
      };
    },
    beforeMount() {
      // this.initData();
      wx.showShareMenu({
        withShareTicket: false
      });
    },
    mounted() {
      console.log(this.$refs.authD);
    },
    components: { jlfooter, jlheader, category, shopList, jlswiper },
    methods: {
      cart(){
        console.log(this.$store.state.shopCart)
      },
      callPay() {
        this.fly.get("/wxapp/pay/callpay?order_num=").then((res) => {
          wx.requestPayment(
            {
              "timeStamp": res.data.timeStamp,
              "nonceStr": res.data.nonceStr,
              "package": res.data.package,
              "signType": "MD5",
              "paySign": res.data.paySign,
              "success": function(res) {
                console.log("支付成功");
              },
              "fail": function(res) {
                console.log("支付失败");
              },
              "complete": function(res) {
              }
            });
        });
      },
  
      bindGetUserInfo(e) {
        let that = this;
        wx.getSetting({
          success(res) {
            if (res.authSetting["scope.userInfo"]) {
              console.log(e.mp.detail.userInfo);
              that.getopenid();
              that.authDialog = false;
              console.log("用户授权成功");
            } else {
              console.log("用户拒绝了授权");
              //todo 待完善
              setTimeout(function() {
                that.authDialog = true;
              }, 1000);
              that.authDialog = false;

              // that.authDialog = true;
            }
          }
        });
      },


      //获取手机号
      getPhoneNumber(res){
        var that=this
        console.log(res)
        console.log(this.$cookie.loginCookie)
        this.fly.post(
          "user/getPhoneNumber",
          {
            encryptedData:res.mp.detail.encryptedData,
            iv:res.mp.detail.iv
          },
        ).then((res)=>{
          console.log(res)
          this.userPhone=res.data.obj;
          if(res.data.code>0){
            this.fly.post("user/wxRegister",
              {
                userInfo:this.userInfo,
                userPhone:this.userPhone
              }
              ).then((res)=>{
                console.log(res.data)
              })
            setTimeout(() => {
              this.getPhone=false;
            }, 1000);

          }
        })
      },


      //检查授权
      checkAuth() {
        let that = this;
        wx.getSetting({
          success(res) {
            if (res.authSetting["scope.userInfo"]) {
              console.log("用户已经授权");
              that.authDialog = false;
              that.getopenid();
            } else {
              console.log("用户没授权");
              that.authDialog = true;
              //弹出提示框
            }
          }
        });
      },
      //初始化首页的数据
      initData() {
        this.fly.get("index").then((res) => {
          console.log("初始化首页数据");
          this.categoryData = res.data.obj.types;
          this.mySwiper = res.data.obj.carousels;
          this.storelist = res.data.obj.shopList;
        });
      },
      // dumpUser() {
      //   this.fly.post("/wxapp/user/dumpuser").then((res) => {
      //     console.log(res);
      //   });
      // },
      //授权后进行登录
      login() {
        let that = this
        console.log(this.$root.wxuserinfo.iv)
        // console.log('iv:'+that.$store.state.wxuserinfo.iv)
        this.fly.post("user/decodeUserInfo",
          {
            code: this.$store.state.code,
            iv: this.wxuserinfo.iv,
            encryptedData: this.wxuserinfo.encryptedData,
          }).then((res) => {
            this.userInfo=res.data.userInfo;
            if(res.data.isExist==true){
              that.getPhone=false;
            }else if(res.data.isExist==false){
              that.getPhone=true;
            }
            //储存cookie到$cookie
            var cookie=JSON.stringify(res.headers);
            var newCookie=cookie.replace("set-cookie","cookie");
            var ihavacookie=JSON.parse(newCookie);
            var getCookie=ihavacookie.cookie;
            var saveCookie=getCookie[0].split(";")[0];
            this.$cookie.loginCookie=saveCookie;
            // this.initData();
          if (res.data.status == 1) {
            // let token = res.data.token;
            // this.$store.commit("setToken", token);
            // console.log("token:" + token);
            console.log("登录成功");
          } else {
            console.log("登录失败");
            //this.checkAuth();
          }
          ;
        }).catch((error) => {
          console.log(error)
          console.log("登录请求异常");
          //this.checkAuth();
        });
      },
      //openid
      getopenid() {
        let that = this;
        wx.login({
          success(res) {
            // console.log(res);
            wx.getUserInfo({
              withCredentials: true,
              success(wxuserinfo) {
                // console.log(wxuserinfo);
                that.$store.commit("setWxuserinfo", wxuserinfo);
                that.wxuserinfo = wxuserinfo
                that.$store.commit("setCode", res.code);
                //code 换openid
                that.login();
              }
            });
           /* if (res.code) {
              //  that.state.commit('setCode',res.code)
              that.$store.commit("setCode", res.code);

              //code 换openid
              that.login();
              //进行登录

            } else {
              console.log("登录失败！" + res.errMsg);
            }*/
          }
        });
      }
    },
    
    created() {
      // 调用应用实例的方法获取全局数据
      this.initData();
      this.checkAuth();
    }
  };
</script>

<style scoped>
  .content {
    margin: 0 10px;
    /*background-color: black;*/
  }

  .categoryBox {
    margin: 15px 0;
  }

  .swiperBox {
    height: 160px;
  }

  .iAmAbox{
    width: 100%;
    height: 100rpx;
  }
</style>
