import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
//安装插件
Vue.use(toast)
FastClick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

