import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import BusLine from '@/components/BusLine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/bus/:line',
      name: 'BusLine',
      component: BusLine
    }
  ]
})
