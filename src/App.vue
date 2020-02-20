<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="main-tab-bar"/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}

</script>

<style lang="less">
  @import "assets/css/base.css";
  .main-tab-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }
</style>
