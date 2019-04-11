import store from '../store/store'
import cookie from '../components/saveCookie'
const Fly=require("flyio/dist/npm/wx")
const fly=new Fly
// setTimeout(()=>{
//   if(cookie.loginCookie){
//   console.log(cookie.loginCookie)
//   }
// },600000)

  // var stringCookie=JSON.stringify(cookie.loginCookie)


// var replaceCookieOne=cookie.loginCookie
// console.log(replaceCookieOne)
// for(let c in cookie){
//   console.log(c)
// }
// var replaceCookieTwo=replaceCookieOne.replace("  ")
 //添加全局配置、拦截器等
//添加请求拦截器
fly.interceptors.request.use((request) => {


  /*wx.showLoading({
    title: "加载中",
    mask:true
  });*/
 // console.log(request);
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    "X-Tag": "flyio",
    'Cookie': cookie.loginCookie,
    'content-type': 'application/json;charset=utf-8'
  };
  // console.log('请求token:'+store.state.token)
if (store.state.token.length!=0){
     request.headers['token']= store.state.token
   }
  // request.headers['token']= 'abcdef'

  let authParams = {
    //公共参数
   /* "categoryType": "SaleGoodsType@sim",
    "streamNo": "wxapp153570682909641893",
    "reqSource": "MALL_H5",
    "appid": "string",
    "timestamp": new Date().getTime(),
    "sign": "string"*/
  };

  request.body && Object.keys(request.body).forEach((val) => {
    if(request.body[val] === ""){
      delete request.body[val]
    };
  });
  request.body = {
    ...request.body,
    ...authParams
  }
  return request;
});
//添加响应拦截器
fly.interceptors.response.use((response) => {
  // if(response.headers.vary){
  //   var cookie=JSON.stringify(response.headers);
  //   var newCookie=cookie.replace("set-cookie","cookie");
  //   var ihavacookie=JSON.parse(newCookie);
  //   var getCookie=ihavacookie.cookie;
  //   var saveCookie=getCookie[0].split(";")[0];
  //   wx.setStorageSync("cookie",saveCookie)
  // }
  
  //如果请求头里面有设置session id、 就把他保存下来到本地
    // wx.getStorage({
    //   key:"cookie",
    //   success(res){
    //     console.log(res)
    //   }
    // })
    // this.$store.dispatch("getCookie",saveCookie)
    return response;  //请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
    console.log('请求出错');
    console.log(err);
   // wx.hideLoading();
    if(err){
      return "请求失败";
    };
  }
);

fly.config.baseURL = 'https://wm.iooint.com/jl_wm';       //https://wm.iooint.com
export default fly;