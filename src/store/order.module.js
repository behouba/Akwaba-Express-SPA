export default {
  state: {
    loading: false
  },
  getters: {},
  mutations: {},
  actions: {
    sendOrder(context, order) {
      console.log("sending order to server ...");
      console.log(order);
      alert(JSON.stringify(order));
      // context.commit('sendOrder', order)
    }
  }
};
