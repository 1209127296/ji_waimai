<template>
    <div class="commentItem">
      <div class="userMsg">
        <div class="headerImg">
          <img src="https://service.sziitjx.cn/static/sziitjx/img/fuwuhao8cm.jpg" alt="">
        </div>
        <div class="userNameTimeStar">
          <div class="userNameTime">
            <div class="userName">
              猫族子弟
            </div>
            <div class="time">
              2019-01-19
            </div>
          </div>
          <div class="star">
            <van-rate value="5" disabled size="10" disabled-color="orangered"/>
          </div>
        </div>

      </div>

      <div class="content">
        <div class="commentText">
          好吃，非常好吃
        </div>
        <div class="commentImg">
          <img src="https://service.sziitjx.cn/static/sziitjx/img/fuwuhao8cm.jpg" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "commentItem"
  };
</script>

<style scoped>
  .commentItem{
    background-color: white;
    padding: 10px;
  }
  .userMsg{
    display: flex;
  }
  .userMsg .headerImg{
    padding-right: 10px;
  }
  .userMsg .headerImg img{
    height: 30px;
    width: 30px;
    border-radius: 500px;
  }
  .userMsg .userNameTimeStar{
    flex-grow: 1;
  }
  .userMsg .userNameTime{
    display: flex;
    justify-content: space-between;
  }
  .userMsg .userNameTime .userName{
    font-size: 12px;
  }
  .userMsg .userNameTime .time{
    font-size: 12px;
    color: #b8b8b8;
  }
  .content{
    padding-left: 40px;
  }
  .content .commentText{
    font-size: 14px;
  }
  .content .commentImg{
    margin-top: 10px;
    height: 100px;
    width: 100px;
  }
  .content .commentImg img{
    max-height: 100%;
    max-width: 100%;
  }
</style>
