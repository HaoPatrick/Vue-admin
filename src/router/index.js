import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'

import AllPerson from 'components/AllPerson'
import Login from 'components/Login'
import Delete from 'components/Delete'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/persons'
    },
    { path: '/persons', name: 'AllPerson', component: AllPerson },
    { path: '/login', name: 'Login', component: Login },
    { path: '/delete', name: 'Delete', component: Delete }
  ]
})
