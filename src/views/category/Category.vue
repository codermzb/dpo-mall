<template>
    <div id="category">
      <div class="image">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </div>
</template>

<script>
  export default {
    name: "Category",
    components: {
    }
  }
</script>

<style scoped lang="less">
  #category {
    .image {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        background-color: red;
      }
    }
  }
</style>