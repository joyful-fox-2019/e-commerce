import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../components/Cart.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        Swal.fire({
          title: 'Opps ..',
          text: 'You must login to access cart',
          icon: 'warning'
        })
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import(/* webpackChunkName: "transaction" */ '../components/Transaction.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
