<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" class="item-title"
           :class="{active: index===currentIndex}" @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      itemClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      }
    }
  }
</script>

<style scoped lang="less">
  .title {
    display: flex;
    font-size: 14px;
    .item-title {
      flex: 1;
    }
    .active {
      color: var(--color-high-text);
    }
  }
  .back {
    position: relative;
    top: 5px;
  }
</style>