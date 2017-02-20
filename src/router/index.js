import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'

import AllPerson from 'components/AllPerson'
import Login from 'components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/persons'
    },
    { path: '/persons', name: 'AllPerson', component: AllPerson },
    { path: '/login', name: 'Login', component: Login }
  ]
})
