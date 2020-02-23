<template>
    <div id="cart">
      <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
      <scroll class="wrapper" ref="scroll">
        <cart-list/>
      </scroll>
      <cart-bottom-bar class="cart-bottom-bar"/>
    </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar"
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar"
  import Scroll from "components/common/scroll/Scroll"
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped lang="less">
  #cart {
    position: relative;
    height: 100vh;
    .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
      font-weight: 700;
    }
    .wrapper {
      position: absolute;
      top: 44px;
      bottom: 89px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .cart-bottom-bar {
      position: absolute;
      bottom: 49px;
      left: 0;
      right: 0;
    }
  }
</style>