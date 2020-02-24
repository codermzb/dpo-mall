<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkClick">
      <check-button class="check-button" :isChecked="isCheckedAll"/>
      <span>全选</span>
    </div>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span class="total-counter" @click="countPrice">去计算:({{totalCounter}})</span>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        if(this.isCheckedAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      countPrice() {
        if(!this.isCheckedAll) {
          this.$toast.show('请选择要购买的商品', 1000)
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((prev, item) => {
          return prev + item.price * item.counter
        }, 0).toFixed(2)
      },
      totalCounter() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((prev, item) => {
          return prev + item.counter
        }, 0)
      },
      isCheckedAll() {
        //遍历所有也要判断初始有没有长度
        // return !(this.$store.getters.cartList.filter(item => !item.checked).length)
        //找到既返回该元素并停止查找,若找不到则返回undefind
        return this.cartList.length? !this.cartList.find(item => !item.checked): false
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