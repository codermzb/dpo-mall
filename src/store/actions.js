export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.counter = 1
        context.commit('addCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}