import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#6cc14a",
        secondary: "#ed905b",
      },
      dark: {
        primary: "#389018",
        secondary: "#b7622f",
      },
    },
  },
});
