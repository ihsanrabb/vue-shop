import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import { fb } from "./firebase";
import VueFirestore from 'vue-firestore'

import Swal from 'sweetalert2'

window.Swal = Swal;

Vue.use(VueFirestore);

Vue.component('Navbar', require('./components/Navbar.vue').default);

Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");

  }
})


