import Vue from "vue";
import Vuetify from "vuetify/lib";
import "../../scss/main.scss";

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  iconfont: "md",
  theme: {
    disable: true
  }
});

export default new Vuetify({});
