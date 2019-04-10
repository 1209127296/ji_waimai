<template>
  <div>

    <van-cell-group>
      <van-field @input="setName" :value="name" required clearable label="姓名" placeholder="请输入姓名" right-icon="question-o"  maxlength="8"/>
      <van-field @input="setMobile" :value="mobile" required clearable label="手机号" placeholder="请输入手机号码" type="number" maxlength="11"/>
      <!-- <div style="padding:5px 5px 0 15px;font-size:13px;color:rgb(120,120,120)" @click="openMap">打开地图选择地址:{{location}}</div> -->
      <van-field
      :value="location"
      required
      label="地址"
      readonly
      placeholder="请选择地址"
      icon="location-o"
      @click="openMap"
      >
      </van-field>
      <van-field
        @input="setAddressDetail"
        :value="address_detail"
        required
        clearable
        label="详细地址"
        placeholder="请输入详细地址"
      />
    </van-cell-group>
    <van-switch-cell title="设为默认地址" :checked="checked" @change="onChange"/>
    <div class="save">
      <van-button type="primary" size="large" @click="saveAddress">保存</van-button>
    </div>
    <div class="delete" v-if="isedit">
      <van-button size="large" style="margin-top:20px;" @click="delAddress">删除地址</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      address: { name: "", mobile: "", address_detail: "" },
      name:'',
      mobile:'',
      address_detail:'',
      id:'',
      checked: false,
      isedit:false,
      latitude:"",
      longitude:"",
      location:""
    };
  },
  beforeMount(){
    if(this.$root.$mp.query.isedit=='true'){
      this.isedit=true
      this.name=this.$root.$mp.query.username
      this.mobile=this.$root.$mp.query.mobile
      var addressAll=this.$root.$mp.query.address.split("-")
      this.location=addressAll[0]
      this.address_detail=addressAll[1]
      this.id=this.$root.$mp.query.id
      this.checked=this.$root.$mp.query.is_default==='true'?true:false
    }else{
      this.isedit=false
      this.name=""
      this.mobile=""
      this.address_detail=""
      this.id=""
      this.is_default=""
      this.location=""
      this.checked=false
    }
  },
  // onShow(){
  //   this.address=this.chooseLocationRes.name;
  // },
  methods:{
    openMap(){
      var _this=this;
      wx.chooseLocation({
          success(res){
            console.log(res.name)
            _this.location=res.name
            _this.address_detail=res.address;
            _this.latitude=res.latitude;
            _this.longitude=res.longitude
            _this.chooseLocationRes=res
          }
        })
    },
    onChange(){
      this.checked=!this.checked
    },
    setName(event){

      this.name = event.mp.detail;
    },
    setMobile(event){
      this.mobile = event.mp.detail;
    },
    // setLocation(e){
    //   this.location=e.mp.detail
    // },
    setAddressDetail(event){
      this.address_detail = event.mp.detail;
    },
    delAddress(){
        this.fly.post("address/delAddress",{
          id:this.id
        }).then((res)=>{
          wx.navigateBack({
              delta: -1
          });
        });
    },
    saveAddress(){
      var is_default
      if(this.checked===true){
        is_default=1
      }else{
        is_default=false
      }
      if(this.isedit==false){
        this.fly.post("address/addAddress",{
          name:this.$root.name,
          phone:this.mobile,
          location:this.location+'-'+this.address_detail,
          isDefault:is_default,
          latitude:this.latitude,
          longitude:this.longitude
        }).then((res)=>{
          wx.redirectTo({
              delta: -1
          });
        }); 
      }
      else if(this.isedit==true){
        this.fly.post("address/updateAddress",{
          name:this.$root.name,
          phone:this.mobile,
          location:this.address_detail,
          isDefault:is_default,
          id:this.id
        }).then((res)=>{
          wx.navigateBack({
              delta: -1
          });
        });
      }
    }
  }
};
</script>

<style scoped>
.save{
  padding:0 30rpx;
  margin-top:20px;
  margin-bottom:30px;
}
.delete{
  padding:0 30rpx;
}
</style>
