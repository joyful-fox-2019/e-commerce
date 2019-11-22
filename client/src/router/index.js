import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/main-page',
    name: 'mainpage',
    component: () => import(/* webpackChunkName: "mainpage" */ '@/views/MainPage.vue')
  },
  {
    path: '/admin-page',
    name: 'adminpage',
    component: () => import(/* webpackChunkName: "adminpage" */ '@/views/AdminPage.vue')
  },
  {
    path: '/customer-page',
    name: 'customerpage',
    component: () => import(/* webpackChunkName: "customerpage" */ '@/views/CustomerPage.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '@/views/ListCart.vue')
  },
  {
    path: 'edit-product',
    name: 'editproduct',
    component: () => import(/* webpackChunkName: "editproduct" */ '../components/EditProduct.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})

export default router
