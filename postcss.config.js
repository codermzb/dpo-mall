module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,   //精确单位
      viewportUnit: 'vw',
      // selectorBlackList: ['.ignore', '.tab-bar', '.tab-bar-item'], //指定不需要转化的类
      minPixelValue: 1, //单位小于1px不需要转化
      mediaQuery: false, //不允许在媒体查询中使用转换
      // exclude: [/TabBar/] //指定不需要的转化的文件
    }
  }
}
