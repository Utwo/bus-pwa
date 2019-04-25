import Vue from "vue"
import Router from "vue-router"
import BusLines from "./components/BusLines.vue"
import Favorite from "./components/Favorite.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "BusLines",
      component: BusLines
    },
    {
      path: "/bus/:line",
      name: "BusInformation",
      component: () =>
        import(/* webpackChunkName: "busInformation" */ "./components/BusInformation.vue")
    },
    {
      path: "/favorite",
      name: "Favorite",
      component: Favorite
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/About.vue")
    },
    {
      path: "/404",
      component: () =>
        import(/* webpackChunkName: "notFound" */ "./components/NotFound.vue")
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
