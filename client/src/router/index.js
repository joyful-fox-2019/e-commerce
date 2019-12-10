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
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/detail/:id',
    name: 'detailProduct',
    component: () => import(/* webpackChunkName: "detailProduct" */ '../views/DetailProduct.vue')
  },
  {
    path: '/add',
    name: 'addProduct',
    component: () => import(/* webpackChunkName: "addProduct" */ '../views/AddProduct.vue')
  },
  {
    path: '/product',
    name: 'myProduct',
    component: () => import(/* webpackChunkName: "myProduct" */ '../views/MyProduct.vue'),
    children: [
      {
        path: 'edit/:id',
        name: 'editProduct',
        component: () => import(/* webpackChunkName: "editProduct" */ '../views/EditProduct.vue')
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
