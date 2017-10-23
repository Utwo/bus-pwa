import Vue from 'vue'
import Vuetify from 'vuetify/es5/components/Vuetify'
import VGrid from 'vuetify/es5/components/VGrid'
import VApp from 'vuetify/es5/components/VApp'
import VSubheader from 'vuetify/es5/components/VSubheader'
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
import VCard from 'vuetify/es5/components/VCard'
import VList from 'vuetify/es5/components/VList'
import VAvatar from 'vuetify/es5/components/VAvatar'
import VToolbar from 'vuetify/es5/components/VToolbar'
import VDivider from 'vuetify/es5/components/VDivider'
import VBtn from 'vuetify/es5/components/VBtn'
import VMenu from 'vuetify/es5/components/VMenu'
import VTabs from 'vuetify/es5/components/VTabs'
import VIcon from 'vuetify/es5/components/VIcon'
import VCheckbox from 'vuetify/es5/components/VCheckbox'
import VDataTable from 'vuetify/es5/components/VDataTable'
import VChip from 'vuetify/es5/components/VChip'
import VSelect from 'vuetify/es5/components/VSelect'
import Touch from 'vuetify/es5/directives/touch'
import App from './App.vue'
import router from './router'
import './assets/main.styl'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VToolbar,
    VDataTable,
    VDivider,
    VCard,
    VSelect,
    VMenu,
    VChip,
    VIcon,
    VAvatar,
    VList,
    VTabs,
    VSubheader,
    VCheckbox,
    VGrid,
    VBtn
  },
  directives: {
    Touch
  }
})

/* eslint no-new:0 */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
