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
    path: '/collections',
    name: 'collections',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "collections" */ '../views/Collections.vue')
  },
  {
    path: '/collections/:id',
    name: 'one-collections',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "detailed" */ '../views/DetailedProduct.vue')
  },
  {
    path: '/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
    children: [
      {
        path: 'register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "register" */ '../components/Register.vue')
      },
      {
        path: 'login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/products',
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    children: [
      {
        path: 'add',
        name: 'add',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "add" */ '../components/ProductAdd.vue')
      },
      {
        path: 'update/:id',
        name: 'update/:id',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "update" */ '../components/ProductUpdate.vue')
      }
    ]
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import(/* webpackChunkName: "transaction" */ '../views/Transaction.vue')
  }
  // {
  //   path: '/user',
  //   name: 'user',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
  //   children: [
  //     {
  //       path: 'register',
  //       name: 'register',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  //     },
  //     {
  //       path: 'login',
  //       name: 'login',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  //       children: [
  //         {
  //           path: 'justapage',
  //           name: 'justapage',
  //           // route level code-splitting
  //           // this generates a separate chunk (about.[hash].js) for this route
  //           // which is lazy-loaded when the route is visited.
  //           component: () => import(/* webpackChunkName: "justpage" */ '../views/JustPage.vue')
  //         }
  //       ]
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
