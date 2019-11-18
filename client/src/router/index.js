import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue')
  },
  {
    path: '/product-manager',
    name: 'product-manager',
    component: () => import(/* webpackChunkName: "product-manager" */ '../views/ProductManager.vue'),
    beforeEnter: (to, from, next) => {
      let isAdmin = store.state.isAdmin
      if (isAdmin) {
        next()
      } else {
        store.state.Toast.fire({
          icon: 'error',
          title: 'Permission Denied'
        })
        next('/')
      }
    }
  },
  {
    path: '/form-product/:id',
    name: 'form-product',
    component: () => import(/* webpackChunkName: "form-product" */ '../views/FormProduct.vue'),
    beforeEnter: (to, from, next) => {
      let isAdmin = store.state.isAdmin
      if (isAdmin) {
        next()
      } else {
        store.state.Toast.fire({
          icon: 'error',
          title: 'Permission Denied'
        })
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
