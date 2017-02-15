import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'

import AllPerson from 'components/AllPerson'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    { path: '/persons', name: 'AllPerson', component: AllPerson }
  ]
})
