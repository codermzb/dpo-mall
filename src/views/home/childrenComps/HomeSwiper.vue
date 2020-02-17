<template>
    <swiper>
      <swiper-item v-for="item in banners">
        <img :src="item.image" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>