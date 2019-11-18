import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    children: [
      {
        path: '/',
        name: 'products',
        component: () => import(/* webpackChunkName: "products" */ '../views/Products')
      },
      {
        path: '/create',
        name: 'create',
        component: () => import(/* webpackChunkName: "create" */ '../views/Create')
      },
      {
        path: '/update/:id',
        name: 'update',
        component: () => import(/* webpackChunkName: "update" */ '../views/Update')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/Cart')
      },
      {
        path: '/history',
        name: 'history',
        component: () => import(/* webpackChunkName: "history" */ '../views/History')
      }
    ],
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.path === '/login') {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router
