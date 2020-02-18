<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in title"
         :class="{active: index === currentIndex}" @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped lang="less">
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    padding-bottom: 9px;
    background-color: #ffffff;
    .active {
      color: var(--color-high-text);
      span {
        padding: 2px 4px;
        border-bottom: 2px solid var(--color-tint);
      }
    }
    .tab-control-item {
      flex: 1;
    }
  }
</style>