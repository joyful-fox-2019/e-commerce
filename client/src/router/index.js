import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import Cart from '../views/Cart.vue'
import MyProducts from '../views/MyProducts.vue'
import AddProducts from '../views/AddProducts'
import EditProduct from '../views/EditProduct'
import Checkout from '../views/Checkout'
import Transaction from '../views/Transaction'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/products/:id',
        name: 'Detail',
        component: Detail
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter(to, from, next){
      if(!localStorage.getItem('token')){
        next('/login')
      }
      else{
        next()
      }
    }
  },
  {
    path: '/myProducts',
    name: 'MyProducts',
    component: MyProducts,
    children: [
      {
        path: '/myProducts/add',
        name: 'AddProducts',
        component: AddProducts
      },
      {
        path: '/myProducts/edit/:id',
        name: 'EditProduct',
        component: EditProduct
      }
    ],
    beforeEnter(to, from, next){
      if(!localStorage.getItem('token')){
        next('/login')
      }
      else if (localStorage.getItem('role') === 'buyer'){
        next('/')
      }
      else{
        next()
      }
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    beforeEnter(to, from, next){
      if(!localStorage.getItem('token')){
        next('/login')
      }
      else{
        next()
      }
    }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transaction,
    beforeEnter(to, from, next){
      if(!localStorage.getItem('token')){
        next('/login')
      }
      else{
        next()
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
