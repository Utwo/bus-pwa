import Vue from 'vue'
// import VueMaterial from 'vue-material'
import { MdCore, MdToolbar, MdIcon, MdButton, MdCard, MdLayout, MdSidenav, MdBackdrop, MdList, MdCheckbox, MdInputContainer, MdWhiteframe, MdDivider, MdTabs } from 'vue-material'
// import { MdButton } from 'vue-material/dist/components/mdButton'
import App from './App.vue'
import router from './router'
import './assets/main.scss'

Vue.config.productionTip = false

Vue.use(MdCore)
Vue.use(MdLayout)
Vue.use(MdButton)
Vue.use(MdToolbar)
Vue.use(MdSidenav)
Vue.use(MdBackdrop)
Vue.use(MdList)
Vue.use(MdCheckbox)
Vue.use(MdIcon)
Vue.use(MdInputContainer)
Vue.use(MdWhiteframe)
Vue.use(MdDivider)
Vue.use(MdCard)
Vue.use(MdTabs)
/* Vue.component(MdCore.name, MdCore)
Vue.component(MdButton.name, MdButton)
Vue.component(MdToolbar.name, MdToolbar)
Vue.component(MdIcon.name, MdIcon) */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  /* components: {
    MdCore,
    MdButton,
    MdToolbar,
    MdIcon
  }, */
  render: h => h(App)
})
