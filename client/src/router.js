import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
import AddProduct from './views/admin/AddProduct.vue'
import Transactions from './views/admin/Transactions.vue'
import UpdateProduct from './views/admin/UpdateProduct.vue'
import Cart from './views/user/Cart.vue'
import UserTransaction from './views/user/UserTransaction.vue'
import Wishlist from './views/user/Wishlist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "ProfileAdmin" */ './views/ProfileAdmin.vue'),
      beforeEnter (to, from, next) {
        if (store.state.admin || localStorage.getItem('admin')) {
          next()
        } else {
          next('/')
        }
      },
      children: [
        {
          path: 'addproduct',
          name: 'addProduct',
          component: AddProduct
        },
        {
          path: 'updateproduct',
          name: 'updateProduct',
          component: UpdateProduct
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: Transactions
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      },
      children: [
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: UserTransaction
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: Wishlist
        }
      ]
    },
    {
      path: '/product/:productId',
      name: 'productDetail',
      component: () => import(/* webpackChunkName: "profileDetail" */ './views/ProductDetail.vue'),
      props: true
    }
  ]
})

// path: '/about',
// name: 'about',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
