import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

function guard (to, from, next) {
  if (store.state.isLoggedIn) {
    next()
  } else {
    next('/auth')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/macarons',
    name: 'macarons',
    component: () => import(/* webpackChunkName: "macarons" */ '../views/Macarons.vue')
  },
  {
    path: '/cakes',
    name: 'cakes',
    component: () => import(/* webpackChunkName: "cakes" */ '../views/Cakes.vue')
  },
  {
    path: '/products/:id',
    name: 'productDetail',
    component: () => import(/* webpackChunkName: "productDetail" */ '../views/ProductDetail.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    beforeEnter: guard,
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    beforeEnter: guard,
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
