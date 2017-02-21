import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  login: false,
  showLoginModal: false,
  allUserData: [],
  token: '7af0c47082929962643074d0174e1f1947eb0272c06f079304db84a923dfe820',
  authURL: 'https://joinus.zjuqsc.com/api/auth',
  detailURL: 'https://joinus.zjuqsc.com/api/detail',
  manageURL: 'https://joinus.zjuqsc.com/api/manage',
  deleteURL: 'https://joinus.zjuqsc.com/api/delete',
  recycleURL: 'https://joinus.zjuqsc.com/api/recycle',
  deletedPersons: []
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
    console.log(data)
  },
  login (state, info) {
    axios.post(state.authURL, info).then(response => {
      state.token = response.data.message
    })
  },
  setToken (state, token) {
    state.token = token
  },
  setDeleted (state, data) {
    state.deletedPersons = data
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
  detailURL: state => state.detailURL,
  manageURL: state => state.manageURL,
  deleteURL: state => state.deleteURL,
  recycleURL: state => state.recycleURL,
  deletedPersons: state => state.deletedPersons
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
