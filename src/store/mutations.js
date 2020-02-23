export default {
  addCart(state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  addCounter(state, payload) {
    payload.counter++
  }
}