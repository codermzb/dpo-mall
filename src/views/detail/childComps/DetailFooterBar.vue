<template>
  <div class="detail-footer-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart">
        加入购物车
      </div>
      <div class="buy">
        购买
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailFooterBar"
  }
</script>

<style scoped lang="less">
  .detail-footer-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0px;
    background-color: #fff;
    height: 49px;
    display: flex;
    text-align: center;
    .bar-item {
      flex: 1;
    }
    .bar-left {
      display: flex;
      font-size: 13px;
      div {
        flex: 1;
      }
      .icon {
        display: block;
        width: 22px;
        height: 22px;
        margin: 4px auto 6px;
        background: url("~assets/img/detail/detail_bottom.png") 0 0;
        background-size: 100%;
      }
      .service {
        background-position: 0 -54px;
      }
      .shop {
        background-position: 0 -98px;
      }
    }
    .bar-right {
      display: flex;
      line-height: 49px;
      text-align: center;
      font-size: 15px;
      div {
        flex: 1;
      }
      .cart {
        background-color: #ffe817;
        color: #333;
      }
      .buy {
        background-color: #f69;
      }
    }
  }
</style>