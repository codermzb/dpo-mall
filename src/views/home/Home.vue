<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <scroll class="wrapper" ref="scroll">
        <HomeSwiper :banners="banners"/>
        <recommend-view :recommend="recommend"/>
        <feature-view/>
        <tab-control class="tab-control" :title="['流行', '新款', '精选']" @tabClick="tabClick"/>
        <goods-list :goods="showGoods"/>
      </scroll>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import HomeSwiper from './childrenComps/HomeSwiper'
  import RecommendView from './childrenComps/RecommendView'
  import FeatureView from './childrenComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from 'network/home'


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,

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
        currentType: 'pop'
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
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
          console.log(res);
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
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .home-nav {
      background-color: var(--color-tint);
      color: #ffffff;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .wrapper {
      position: absolute;
      top: 44px;
      bottom: 48px;
      left: 0;
      right: 0;
      /*height: calc(100%);*/
      /*overflow: hidden;*/
      /*height: 500px;*/
    }
  }

</style>