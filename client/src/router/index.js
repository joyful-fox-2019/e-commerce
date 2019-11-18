import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import(/* webpackChunkName: "landing" */ '../views/Landing.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "Register" */ '../components/ModalRegister.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Register" */ '../components/ModalLogin.vue')
    },
    {
      path: '/products',
      name: 'product',
      component: () => import(/* webpackChunkName: "productcategory" */ '../views/ProductPage.vue')
    },
    {
      path: '/products/:id',
      name: 'singleproduct',
      component: () => import(/* webpackChunkName: "productcategory" */ '../views/SingleProduct.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import(/* webpackChunkName: "about" */ '../views/CartPage.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
      meta: {
        requiresAuth: true,
        isAdmin: true
      },
      children: [
        {
          path: 'add',
          name: 'add',
          component: () => import(/* webpackChunkName: "addproduct" */ '../components/AdminAddProduct.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import(/* webpackChunkName: "editproduct" */ '../components/AdminAddProduct.vue'),
        },
        {
          path: 'listproduct',
          name: 'listproduct',
          component: () => import(/* webpackChunkName: "listproduct" */ '../views/Admin.vue'),
        }
      ]
    }
  ]
})


// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router
