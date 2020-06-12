import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart')


export default new Vuex.Store({
    state: {
      cart: cart ? JSON.parse(cart) : [],
      quantity: 0,
      nameUser: '',
      user: {
        loggedIn: false,
        data: null
      }
    },
    getters: {
      user(state) {
        return state.user
      }
    },
    mutations: {
      increment(state) {
        state.quantity++
      },
      addToCart(state,item, quantity) {

        let found = state.cart.find(product => product.product_Id == item.product_Id)

        if (found) {
          found.productQuantity += item.productQuantity
        } else {
          state.cart.push(item);
        }
          this.commit('saveData')
      },
      saveData(state) {
        window.localStorage.setItem('cart' , JSON.stringify(state.cart))
      },
      removeFromCart(state, item) {
        let index = state.cart.indexOf(item)
        state.cart.splice(index, 1)
        this.commit('saveData')
      },
      setNameUser(state, payload) {
        state.nameUser = payload
      },
      SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value
      },
      SET_USER(state, data) {
        state.user.data = data
      }
    },
    actions: {
      fetchUser({commit}, user) {
        commit("SET_LOGGED_IN", user !== null)
        if(user) {
          commit("SET_USER", {
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            postcode: user.postcode
          })
        } else {
          commit("SET_USER", null)
        }
      }
    }
  })