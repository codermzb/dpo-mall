import Toast from "./Toast"
const obj = {

}
obj.install = function (Vue) {
  //创建组件构造器
  const ToastConstructor = Vue.extend(Toast)
  //根据组件构造器,用new的方式,创建出一个组件对象
  const toast = new ToastConstructor()
  //将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast  //这个toast组件相当于是所有对象和节点
}
export default obj