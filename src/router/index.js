import Vue from 'vue'
import Router from 'vue-router'
import BusList from '@/components/BusList'
import BusItem from '@/components/BusItem'
import Favorite from '@/components/Favorite'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BusList',
      component: BusList
    },
    {
      path: '/bus/:line',
      name: 'BusItem',
      component: BusItem
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    }
  ]
})
