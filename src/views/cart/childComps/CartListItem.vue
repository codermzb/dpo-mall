<template>
  <div class="cart-list-item">
    <div class="item-image">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="bottom">
        <div class="price">￥{{itemInfo.price}}</div>
        <div class="count">x{{itemInfo.counter}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartListItem",
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .cart-list-item {
    display: flex;
    padding: 5px;
    width: 100%;
    box-shadow: 0 1px  rgba(100,100,100, .5);
    .item-image {
      img {
        width: 80px;
        height: 100px;
        border-radius: 5px;
      }
    }
    .item-info {
      position: relative;
      overflow: hidden;
      padding: 5px 10px;
      font-size: 17px;
      color: #333;
      //white-space: nowrap ;在子盒子里面文字会撑开父盒子宽度父盒子撑开父盒子高度,看情况给hidden*/
      .item-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .item-desc {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #666;
        margin-top: 15px;
      }
      .bottom {
        height: 20px;
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        display: flex;
        .price {
          color: orangered;
        }
        .count {
          position: absolute;
          right: 0;
        }
      }
    }
  }
</style>