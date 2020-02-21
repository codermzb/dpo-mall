<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control class="tab-control" :title="['流行', '新款', '精选']"
                   @tabClick="tabClick" ref="tab1" v-show="tabShow"/>
      <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="scroll"
              :pullUpLoad="true" @pullingUp="pullingUp">
        <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommend="recommend"/>
        <feature-view/>
        <tab-control :title="['流行', '新款', '精选']" @tabClick="tabClick" ref="tab2"/>
        <goods-list :goods="showGoods"/>
      </scroll>
    <back-top @click.native="backClick" v-show="backShow"/>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from "common/utils";


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        backShow: false,
        refresh: null,
        tabShow: false,
        tabOffsetTop: 0,
        leaveHeight: 0,
        imageLister: null
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    //被缓存的组件第二次进来不会执行created函数以及mounted函数
    mounted() {

    },

    activated() {
      //被缓存的组件,在初始化时也会在mounted之后执行adtivated()
      this.$refs.scroll.scrollTo(0, this.leaveHeight, 0)
      //*********bug没有组件缓存(keep-alive)的情况下,在回调函数里拿不到子组件数据.
      this.refresh = debounce(this.$refs.scroll.refresh,300)
      this.imageLoad = () => {
        this.refresh()
      }
      this.$bus.$on('imageLoad', this.imageLoad)
    },
    deactivated() {
      this.leaveHeight = this.$refs.scroll.scroll.y
      //取消全局图片加载事件
      this.$bus.$off('imageLoad', this.imageLoad)
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },
      tabClick(index) {
        switch(index) {
          case 0 :
            this.currentType = 'pop'
            break
          case 1 :
            this.currentType = 'new'
            break
          case 2 :
            this.currentType = 'sell'
            break
        }
        this.$refs.tab1.currentIndex = index
        this.$refs.tab2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 400)
      },
      scroll(position) {
        this.backShow = position.y <= -1500
        this.tabShow = -this.tabOffsetTop > position.y
      },
      pullingUp() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tab2.$el.offsetTop
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }

</script>

<style scoped lang="less">
  #home {
    height: 100vh;
    .home-nav {
      background-color: var(--color-tint);
      color: #ffffff;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .tab-control {
      position: relative;
      z-index: 1;
    }
    .wrapper {
      position: absolute;
      top: 44px;
      bottom: 48px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
  }

</style>