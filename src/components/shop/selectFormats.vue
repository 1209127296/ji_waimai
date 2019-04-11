<template>
    <div>
        <div class="selectFormats">
            <p class="text">选择规格：</p>
            <div class="selectBox">
                <div v-for="(item,index) in formats" @click="selectFormats(index)" :class="[selectNum==index?'is-select':'']">{{item.name}}</div>
            </div>
            
            <p class="price">价格：{{selectPrice}}</p>
            <div class="add" @click="add">选择</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"selectFormats",
    props:["formats"],
    data(){
        return {
            selectNum:0,
            selectPrice:0.00,
            selectName:""
        }
    },
    created(){
        this.selectPrice=this.formats[this.selectNum].price;
    },
    methods:{
        selectFormats(index){
            this.selectNum=index;
            this.selectPrice=this.formats[index].price;
        },
        add(){
            this.$emit("addToCart",this.selectPrice)
        }
    }
}
</script>


<style scoped>
p{
    font-size: 30rpx;
}
.selectFormats{
    width: 600rpx;
    height: 400rpx;
    position: absolute;
    border-radius: 20rpx;
    background: rgb(255, 255, 255);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0px 7px 17px 2px rgba(112, 109, 109, 0.8);
}
.text{
    margin:20rpx 0 0 20rpx;
}
.selectBox{
    width: 100%;
    margin: 20rpx 0;
}
.selectBox div{
    width: 90rpx;
    height: 40rpx;
    border-radius: 20rpx;
    border: 2rpx solid #34aaff;
    margin:15rpx 29rpx;
    display: inline-block;
    text-align: center;
    line-height: 40rpx;
    font-size: 25rpx;
    overflow: hidden;
    vertical-align: middle;
}
.price{
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
}
.add{
    width: 100rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 30rpx;
    color: rgb(255, 255, 255);
    background: #34aaff;
    border-radius: 20rpx;
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;
}
.is-select{
    background: #34aaff;
    color: rgb(255, 255, 255);
}
</style>

