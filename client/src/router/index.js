import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/add-comic',
    name: 'add-comic',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/comics/:id',
    name: 'comics',
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path: '/comics/:id/update',
    name: 'comics-update',
    component: () => import('../views/UpdateProduct.vue')
  },
  {
    path: '/carts',
    name: 'carts',
    component: () => import('../views/Carts.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
