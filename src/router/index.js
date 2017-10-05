import Vue from 'vue'
import Router from 'vue-router'
import BusList from '../components/BusList'
import BusInformation from '../components/BusInformation'
import Favorite from '../components/Favorite'

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
      name: 'BusInformation',
      component: BusInformation
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    }
  ]
})
