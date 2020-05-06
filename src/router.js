import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import {fb} from './firebase';

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import(/* webpackChunkName: "admin" */ "./views/Admin.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: () => import(/* webpackChunkName: "admin" */ "./views/Overview.vue")
        },
        {
          path: "products",
          name: "products",
          component: () => import(/* webpackChunkName: "products" */ "./views/Products.vue")
        },
        {
          path: "profile",
          name: "profile",
          component: () => import(/* webpackChunkName: "profile" */ "./views/Profile.vue")
        },
        {
          path: "orders",
          name: "orders",
          component: () => import(/* webpackChunkName: "orders" */ "./views/Orders.vue")
        }
      ]
    },
    {
      path: "/loginAdmin",
      name: "loginAdmin",
      component: () => import(/* webpackChunkName: "loginAdmin" */ "./views/LoginAdmin.vue"),
    },
    {
      path: "/adminPage",
      name: "adminPage",
      component: () => import(/* webpackChunkName: "adminPage" */ "./views/AdminPage.vue"),
      beforeEnter: (to,from,next) => {
        const currentUser = fb.auth().currentUser;
        if (currentUser) {
          let uidUser = currentUser.uid;
          if (uidUser == 'KzW5BVel1oaG14WOJKO3zSCwwgF3') {
            next()
          } else {
            next("/loginAdmin")
          }
        } else {
          next("/loginAdmin")
        }
        
      },
      children: [
        {
          path: "informasi",
          name: "informasi",
          component: () => import(/* webpackChunkName: "informasi" */ "./sections/Informasi.vue")
        },
        {
          path: "chatList",
          name: "chatList",
          component: () => import(/* webpackChunkName: "chatList" */ "./sections/ChatList.vue")
        },
        {
          path: "adminChat",
          name: "adminChat",
          component: () => import(/* webpackChunkName: "adminChat" */ "./sections/AdminChat.vue")
        },
        {
          path: "transaksi",
          name: "transaksi",
          component: () => import(/* webpackChunkName: "transaksi" */ "./sections/Transaksi.vue")
        },
        {
          path: "akunPenjual",
          name: "akunPejual",
          component: () => import(/* webpackChunkName: "akunPenjual" */ "./sections/AkunPenjual.vue")
        },
        {
          path: "akunPembeli",
          name: "akunPembeli",
          component: () => import(/* webpackChunkName: "akunPembeli" */ "./sections/AkunPembeli.vue")
        }
      ]
    },
    {
      path: "/productDetail",
      name: "productDetail",
      component: () => import(/* webpackChunkName: "productDetail" */ "./views/ProductDetail.vue")
    },
    {
      path: "/pembayaran",
      name: "pembayaran",
      component: () => import(/* webpackChunkName: "pembayaran" */ "./views/Pembayaran.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/reviewPembayaran",
      name: "reviewPembayaran",
      component: () => import(/* webpackChunkName: "reviewPembayaran" */ "./views/ReviewPembayaran.vue")
    },
    {
      path: "/checkoutShipment",
      name: "checkoutShipment",
      component: () => import(/* webpackChunkName: "checkoutShipment" */ "./views/CheckoutShipment.vue")
    },
    {
      path: "/checkoutFinish",
      name: "checkoutFinish",
      component: () => import(/* webpackChunkName: "checkoutFinish" */ "./views/CheckoutFinish.vue")
    },
    {
      path: "/userOrder",
      name: "userOrder",
      component: () => import(/* webpackChunkName: "userOrder" */ "./views/UserOrder.vue")
    },
    {
      path: "/userProfile",
      name: "userProfile",
      component: () => import(/* webpackChunkName: "userProfile" */ "./views/UserProfile.vue")
    },
    {
      path: "/productPage",
      name: "productPage",
      component: () => import(/* webpackChunkName: "productPage" */ "./views/ProductPage.vue"),
      children: [
        {
          path: "product-list",
          name: "productList",
          component: () => import(/* webpackChunkName: "productList" */ "./sections/ProductList.vue")
        },
        {
          path: "alat-sholat",
          name: "alatSholat",
          component: () => import(/* webpackChunkName: "alatSholat" */ "./sections/AlatSholat.vue")
        },
        {
          path: "product-muslim",
          name: "productMuslim",
          component: () => import(/* webpackChunkName: "productMuslim" */ "./sections/ProductMuslim.vue")
        },
        {
          path: "product-muslimah",
          name: "productMuslimah",
          component: () => import(/* webpackChunkName: "productMuslimah" */ "./sections/ProductMuslimah.vue")
        },
        {
          path: "perlengkapan-mandi",
          name: "alatMandi",
          component: () => import(/* webpackChunkName: "productMuslimah" */ "./sections/AlatMandi.vue")
        }
      ]
    },
    {
      path: "/news",
      name: "news",
      component: () => import(/* webpackChunkName: "news" */ "./views/News.vue")
    },
    { 
      path: "/newsDetail",
      name: "newsDetail",
      component: () => import(/* webpackChunkName: "newsDetail" */ "./views/NewsDetail.vue")
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import(/* webpackChunkName: "chat" */ "./views/Chat.vue"),
      props: true
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import(/* webpackChunkName: "checkout" */ "./views/Checkout.vue")
        
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
        
    }
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

    if (requiresAuth && !currentUser) {
      next('/')
    } else if(requiresAuth && currentUser) {
      next()
    } else {
      next()
    }
   
})

export default router;
