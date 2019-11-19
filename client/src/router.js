import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Product from './views/Product.vue'
import Customer from './views/Customer.vue'
import ProductAll from './views/ProductAll.vue'
import Cart from './views/Cart.vue'
import Transaction from './components/Transaction'

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
    component: Register
  },
  {
    path: '/product/allProduct',
    name: 'allProduct',
    component: ProductAll
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
    children: [
      {
        path: ':_id',
        name: 'productId',
        component: Product
      }
    ]
  },
  {
    path: '/customer/cart',
    name: 'cart',
    component: Cart,
    children: [
      {
        path: 'transaction',
        name: 'Transaction',
        component: Transaction
      }
    ]
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let role = localStorage.getItem('role')
  if (localStorage.getItem('token') && role === 'Seller' && (to.name === 'login' || to.name === 'register' || to.name === 'home' || to.name === 'customer' || to.name === 'cart')) {
    next('/product')
  } else if (localStorage.getItem('token') && role === 'Buyer' && (to.name === 'login' || to.name === 'register' || to.name === 'home' || to.name === 'product' || to.name === 'allProduct' || to.name === 'productId')) {
    next('/customer')
  } else if (to.name === 'login' || to.name === 'register' || to.name === 'home') {
    next()
  } else if (localStorage.getItem('token')) {
    next()
  } else {
    next('/')
  }
})

export default router
