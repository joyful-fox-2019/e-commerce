import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/AdminPage.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/UserPage.vue'),
    children: [
      {
        path: 'cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "checkout" */ '@/views/CheckoutPage.vue')
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: () => import(/* webpackChunkName: "checkout" */ '@/views/TransactionPage.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/AuthPage.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login-form" */ '@/components/LoginForm.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register-form" */ '@/components/RegisterForm.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
