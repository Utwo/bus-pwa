import Vue from 'vue'
import Router from 'vue-router'
import BusLines from '../components/BusLines.vue'
import BusInformation from '../components/BusInformation.vue'
import Favorite from '../components/Favorite.vue'
import About from '../components/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BusLines',
      component: BusLines
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
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
