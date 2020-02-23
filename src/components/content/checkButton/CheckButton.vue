<template>
  <div class="check-button" :class="{active: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .check-button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #aaa;
    img {
      width: 100%;
    }
  }
  .active {
    border-color: red;
    background-color: red;
  }
</style>