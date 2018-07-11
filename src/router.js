import Vue from "vue"
import Router from "vue-router"
import BusLines from "./components/BusLines.vue"
import Favorite from "./components/Favorite.vue"

const About = () => import("./components/About.vue")
const NotFound = () => import("./components/NotFound.vue")
const BusInformation = () => import("./components/BusInformation.vue")

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "BusLines",
      component: BusLines
    },
    {
      path: "/bus/:line",
      name: "BusInformation",
      component: BusInformation
    },
    {
      path: "/favorite",
      name: "Favorite",
      component: Favorite
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/404",
      component: NotFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
