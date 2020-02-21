<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="" @load="swiperImageLoad">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        tem: false
      }
    },
    methods: {
      swiperImageLoad() {
        if(!this.tem) {
          this.$emit('swiperImageLoad')
          this.tem = true
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .detail-swiper {
    height: 250px;
    overflow: hidden;
  }
</style>