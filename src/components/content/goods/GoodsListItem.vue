<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <img src="~assets/img/common/collect.svg" alt="">
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('imageLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    computed: {
      showImage() {
        //BUG 换位置就获取不到数据
        return this.goodsItem.image || this.goodsItem.show.img
        // return this.goodsItem.show.img || this.goodsItem.image
      }
    }
  }
</script>

<style scoped lang="less">
  .goods-list-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
    img {
      height: 240px;
      width: 100%;
      border-radius: 6px 6px 0 0;
    }
    .goods-info {
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      font-size: 12px;
      overflow: hidden;
      text-align: center;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
      }
      .price {
        color: var(--color-high-text);
        margin-right: 20px;
      }
      img {
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
      }
    }
  }
</style>