import { mockContacts } from "./mocks";
export default {
  state: {
    loading: false,
    contacts: []
  },
  getters: {
    contacts(state) {
      return state.contacts;
    }
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    }
  },
  actions: {
    sendOrder(context, order) {
      console.log("sending order to server ...");
      console.log(order);
      alert(JSON.stringify(order));
      // context.commit('sendOrder', order)
    },

    fetchContacts(context, query) {
      var contacts = mockContacts();

      if (query) {
        contacts = contacts.filter(
          v => v.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      }

      context.commit("setContacts", contacts);
    }
  }
};
