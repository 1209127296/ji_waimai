<template>
    <div>
      <div id="user">
        <div id="userInfo">
          <open-data type="userAvatarUrl"  width="100%" id="headImg" ></open-data>
            <!--<img src="https://service.sziitjx.cn/static/sziitjx/img/fuwuhao8cm.jpg" width="100%" id="headImg">-->
          <div id="username">
            <!--<p>手机号：</p>-->
            <small>
             <open-data type="userNickName"></open-data>
            </small>
          </div>
        </div>

        <div class="menus">
          <van-cell-group>
           <button  class="cell-by-vant">
            <van-cell
              size="large"
              title="收货地址"
              is-link
              @click="to('/pages/address/main')"
            >
              <view slot="icon">
                <van-icon
                  name="map-marked"
                  class="myIcon"
                  custom-style="line-height: 24px;"
                />
              </view>
            </van-cell>
            </button>


          <button open-type="contact" class="cell-by-vant">
            <van-cell
              size="large"
              title="在线客服"
              is-link
            >
              <view slot="icon">
                <van-icon
                  name="service"
                  class="myIcon"
                  custom-style="line-height: 24px;"
                />
              </view>
            </van-cell>
            </button>

            <button class="cell-by-vant" @click="call">
            <van-cell
              size="large"
              title="电话客服"
              is-link
              
            >
              <view slot="icon">
                <van-icon
                  name="service"
                  class="myIcon"
                  custom-style="line-height: 24px;"
                />
              </view>
            </van-cell>
            </button>
            <!--<van-cell
              size="large"
              title="个人资料"
              is-link
            >-->
              <view slot="icon">
                <van-icon
                  name="friends"
                  class="myIcon"
                  custom-style="line-height: 24px;"
                />
              </view>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
      <jlfooter :index="this.$root.$mp.query.index"></jlfooter>
    </div>
</template>

<script>
  import jlfooter from '@/components/jlfooter'

  export default {
    components:{jlfooter},
    computed: {

    },
    methods: {
      call(){
        wx.makePhoneCall({
          phoneNumber: '07997223199'
        })
      },
      to(url){
        wx.navigateTo({
          url:url
        })
      }
    },
    mounted () {
     console.log(this.$root.$mp.query.index)
    },
    data(){
      return {

      }
    }
  };
</script>

<style scoped>
.asd{
  background-color: black;
  color: white;
}
  #user{
    height: 110px;
    /*background-color: #34AAFF;*/
  }
  #userInfo{
    display:flex;
    align-items:center;/*垂直居中*/
    /*justify-content: center;!*水平居中*!*/
    width:100%;
    height:100%;
    background: #34AAFF
  }
  #headImg{
    margin-left: 10px;
    border-radius:40px;
    /*background-color: #34AAFF;*/
    width: 80px;
    height: 80px;
  }
  #username{
    margin-left: 10px;
    color: white;
  }
  .menus{
    font-size: 16px;
  }
  .menus .myIcon{
    font-size: 20px;
    line-height: 24px;
    margin-right: 10px;
    color:#34AAFF;
  }
  .cell-by-vant{
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    border-radius: 0;
    display: inline;
  }
</style>
