import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store  from './store';
import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import { fb } from "./firebase";
import VueFirestore from 'vue-firestore'
import VueChatScroll from 'vue-chat-scroll'
import Vuelidate from 'vuelidate'
import VueZoomer from 'vue-zoomer'

import Swal from 'sweetalert2'
import Vue2Filters from 'vue2-filters'
Vue.use(Vuelidate)
Vue.use(VueZoomer)

window.$ = window.jQuery = jQuery;
 
Vue.use(Vue2Filters)
Vue.use(VueChatScroll)

Vue.use(VueFirestore, {
  key: 'id',         
  enumerable: true  
})
Vue.use(VueFirestore);
Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Footer', require('./components/Footer.vue').default);
Vue.component('MiniCart', require('./components/MiniCart.vue').default);
Vue.component('Login', require('@/components/Login.vue').default);
Vue.component('LoginToko', require('@/components/LoginToko.vue').default);

Vue.config.productionTip = false;
window.Swal = Swal;

let app = '';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


window.Toast = Toast;

fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

  }
})


