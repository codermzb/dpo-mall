<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="detail-scroll" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" class="detail-info"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommendInfo"/>
    </scroll>
    <back-top @click.native="backClick" v-show="backShow"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import GoodsList from "components/content/goods/GoodsList"

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from "common/utils"
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        backShow: false,
        commentInfo: {},
        recommendInfo: [],
        refresh: null,
        refresh1: null
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        console.log(res);
        let data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shopInfo = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if(data.rate.cRate) {
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        console.log(res);
        this.recommendInfo = res.data.list
      })
    },
    mounted() {
      this.refresh = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('detailImageLoad',  () => {
        this.refresh()
      })
      this.refresh1 = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('imageLoad', () => {
        this.refresh1()
      })
    },
    methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0, 0 , 300)
      },
      scroll(position) {
        this.backShow = position.y < -1500
      }
    }
  }
</script>

<style scoped lang="less">
  .detail {
    position: relative;
    z-index: 99;
    height: 100vh;
    background-color: #fff;
    .detail-nav {
      position: relative;
      z-index: 1;
      background-color: #fff;
    }
    .detail-scroll {
      position: absolute;
      top:44px;
      left: 0;
      right: 0;
      bottom: 0px;
      overflow: hidden;
    }
  }
</style>