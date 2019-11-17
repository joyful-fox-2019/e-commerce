import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    // children: [{
    //   path: '/:id',
    //   name: 'productdetails',
    //   component: () => import(/* webpackChunkName: "productdetails" */ '../views/ProductDetails.vue'),
    //   props: true
    // }]
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductDetails.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
  },
  {
    path: '/admin',
    name: 'adminhome',
    component: () => import(/* webpackChunkName: "adminhome" */ '../views/AdminHome.vue')
  },
  {
    path: '/addproduct',
    name: 'addproduct',
    component: () => import(/* webpackChunkName: "addproduct" */ '../views/AddProduct.vue')
  },
  {
    path: '/editproduct',
    name: 'editproduct',
    component: () => import(/* webpackChunkName: "editproduct" */ '../views/EditProduct.vue')
  },
  {
    path: '/admin/transactions',
    name: 'adminTransactions',
    component: () => import(/* webpackChunkName: "adminTransactions" */ '../views/AdminTransactions.vue')
  },
  {
    path: '/home/transactions',
    name: 'usertransactions',
    component: () => import(/* webpackChunkName: "usertransactions" */ '../views/UserTransactions.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
