import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  login: false,
  showLoginModal: false,
  allUserData: [],
  token: '0a6cbb6ad91ffd6efe4163ef70a58c3b6da11de4e57ef96288021d34c1410938',
  authURL: 'https://joinus.zjuqsc.com/api/auth',
  detailURL: 'https://joinus.zjuqsc.com/api/detail'
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
  },
  getUserData (state) {
    axios.get('https://joinus.zjuqsc.com/api/detail', {
      params: {
        cookie: '65gv1zvcSHlc8iNu',
        exclude: 1
      }
    }).then(response => {
      console.log(response)
      state.allUserData = response.data
    })
  },
  setUserData (state, data) {
    state.allUserData = data
  },
  login (state, info) {
    axios.post(state.authURL, info).then(response => {
      state.token = response.data.message
    })
  },
  setToken (state, token) {
    state.token = token
  }
}

// const actions = {
//   login: ({ commit }) => commit('login'),
//   logout: ({ commit }) => commit('logout')
// }

const getters = {
  loggedIn: state => state.login,
  loginModal: state => state.showLoginModal,
  allUsers: state => state.allUserData,
  authURL: state => state.authURL,
  getToken: state => state.token,
  detailURL: state => state.detailURL
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
