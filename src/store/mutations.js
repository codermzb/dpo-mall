export default {
  addCart(state,payload) {
   state.cartList.push(payload)
  },
  addCounter(state, payload) {
    payload.counter++
  }
}