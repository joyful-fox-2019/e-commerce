import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/create',
    name: 'create',
    component: () => import( /* webpackChunkName: "create" */ '../views/Create.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import( /* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( /* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: ':id',
      name: 'description',
      component: () => import( /* webpackChunkName: "description" */ '../components/DescriptionCard.vue')
    }]
  }]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
