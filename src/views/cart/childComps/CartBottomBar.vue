<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span class="total-counter">去计算:({{totalCounter}})</span>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((prev, item) => {
          return prev + item.price * item.counter
        }, 0).toFixed(2)
      },
      totalCounter() {
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((prev, item) => {
          return prev + item.counter
        }, 0)
      }
    }
  }
</script>

<style scoped lang="less">
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    display: flex;
    .check-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 65px;
      .check-button {
        margin-right: 5px;
        margin-left: 4px;
      }
    }
    .total-price {
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      flex: 1;
    }
    .total-counter {
      line-height: 40px;
      text-align: center;
      background-color: mediumvioletred;
      color: #fff;
      width: 90px;
      font-size: 15px;
    }
  }
</style>