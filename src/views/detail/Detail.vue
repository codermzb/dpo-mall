<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"/>
    <scroll class="detail-scroll" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :top-images="topImages" @swiperImageLoad="swiperImageLoad"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" class="detail-info"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comments"/>
      <goods-list :goods="recommendInfo" ref="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="backShow"/>
    <detail-footer-bar @addCart="addToCart"/>
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
  import DetailFooterBar from 'views/detail/childComps/DetailFooterBar'
  import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'

  import GoodsList from "components/content/goods/GoodsList"

  import Scroll from "components/common/scroll/Scroll";

  import BackTop from "components/content/backTop/BackTop";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from "common/utils"
  import { mapActions } from "vuex"
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
      DetailFooterBar,
      DetailBottomBar,

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
        refresh1: null,
        getHeight: [],
        timer: 0,
        getHeightFunc: null
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
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
        this.recommendInfo = res.data.list
      })

      // this.$nextTick(() => {
      //   //根据最新的数据,对应的don是已经渲染出来,就执行函数体,但图片没有加载.只有下一次数据改变才会再次执行函数体.
      //   //图片加载出来也不会再次执行函数体,但是updateed会
      //   //拿到的高度不正确
      //   this.getHeight = []
      //   this.getHeight.push(0)
      //   this.getHeight.push(0)
      //   this.getHeight.push(0)
      // })
    },
    mounted() {
      //只是dom挂载,图片不一定就加载完了
      this.refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.getHeightFunc = debounce(() => {
      //     this.getHeight = []
      //     this.getHeight.push(0)
      //     this.getHeight.push(this.$refs.params.$el.offsetTop)
      //     this.getHeight.push(this.$refs.comments.$el.offsetTop)
      //     this.getHeight.push(this.$refs.recommends.$el.offsetTop)
      //     console.log(this.getHeight);
      //   })
       this.getHeightFunc =  () => {
          if(this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.getHeight = []
            this.getHeight.push(0)
            this.getHeight.push(this.$refs.params.$el.offsetTop)
            this.getHeight.push(this.$refs.comments.$el.offsetTop)
            this.getHeight.push(this.$refs.recommends.$el.offsetTop)
          }, 500)
        }
      //果然在回调中(且是多次执行的代码)通过$refs.名字去拿组件里面的数据或方法还是拿不到.
      //但是可以通过debounce防抖好像可以解决.
      //防抖还是不能解决
      this.$bus.$on('detailImageLoad',  () => {
        this.refresh()
        this.getHeightFunc()
      })
      this.refresh1 = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('imageLoad', () => {
        this.refresh1()
      })
    },
    updated() {
      //也是先加载dom图片还是没有完全加载进来.但是图片加载也是执行更新,只要界面发生更新就会执行函数
      //此方法可以获取正确的高度,但是第一次获取到的高度也不一定正确.界面需要再次刷新下才能再次得到正确高度.
      //最终方法还是监听图片的加载,只要图片加载完毕执行就可以拿到正确的高度.
      // this.getHeight = []
      // this.getHeight.push(0)
      // this.getHeight.push(this.$refs.params.$el.offsetTop)
      // this.getHeight.push(this.$refs.comments.$el.offsetTop)
      // this.getHeight.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.getHeight);
    },
    methods: {
      ...mapActions(['addCart']),
      backClick() {
        this.$refs.scroll.scrollTo(0, 0 , 300)
      },
      scroll(position) {
        this.backShow = position.y < -1500
        if(position.y <= 0 && position.y > -this.getHeight[1]) {
          this.$refs.nav.currentIndex = 0
        } else if(position.y <= -this.getHeight[1] && position.y > -this.getHeight[2]) {
          this.$refs.nav.currentIndex = 1
        } else if (position.y <= -this.getHeight[2] && position.y > -this.getHeight[3]) {
          this.$refs.nav.currentIndex = 2
        } else if(position.y <= -this.getHeight[3]) {
          this.$refs.nav.currentIndex = 3
        }
      },
      itemClick(index) {
          this.$refs.scroll.scrollTo(0, -this.getHeight[index], 400)
      },
      swiperImageLoad() {
        this.$refs.scroll.refresh()
      },
      addToCart() {

        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //异步操作里面的具体操作执行完之后再执行需要的操作
        this.addCart(product).then(res => {
          this.$toast.show(res, 1400)
        })
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
      bottom: 49px;
      overflow: hidden;
    }
    .toast {
    }
  }
</style>