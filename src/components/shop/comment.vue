<template>
    <div class="comment":style="'max-height:'+height+'px'">
      <!--空的-->
      <div class="empty" v-show="false">
        <p class="myIcon">
          <van-icon name="comment" />
        </p>
        <p>暂无评论</p>
      </div>
      <div class="commentContent">
        <div class="commentList">
          <div class="commentItem">
            <commentItem></commentItem>
          </div>
          <div class="commentItem">
            <commentItem></commentItem>
          </div>
          <div class="commentItem">
            <commentItem></commentItem>
          </div>
          <div class="commentItem">
            <commentItem></commentItem>
          </div>
          <div class="commentItem">
            <commentItem></commentItem>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import commentItem from './commentItem'
  export default {
    name: "comment",
    components:{
      commentItem
    },
    props:{
      height:{
        default:0
      }
    }
  };
</script>

<style scoped>
  .comment{
    padding-top: 10px;
    background-color: #fbf9f8;
    overflow-y: auto;
  }
  .empty{
    padding-top: 30px;
    text-align: center;
    font-size: 18px;
    color: #b8b8b8;
  }
  .myIcon{
    font-size: 80px;
  }
  .commentList{
    padding-bottom: 30px;
  }
  .commentItem{
    margin-bottom: 10px;
  }
</style>
