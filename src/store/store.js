import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  login: false,
  showLoginModal: false
}

const mutations = {
  userLogin (state) {
    state.login = true
  },
  userLogout (state) {
    state.login = false
  },
  showLoginModal (state) {
    state.showLoginModal = true
  },
  hideLoginModal (state) {
    state.showLoginModal = false
  }
}

// const actions = {
//   login: ({ commit }) => commit('login'),
//   logout: ({ commit }) => commit('logout')
// }

const getters = {
  loggedIn: state => state.login,
  loginModal: state => state.showLoginModal
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
