import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Login from '../components/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
    // children: [{
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // }]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/login')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/register')
  },
  {
    path: '/mycart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart'),
    children: [
      {
        path: '',
        name: 'mycheckout',
        component: () => import(/* webpackChunkName: "mycheckout" */ '../components/ListItem')
      },
      {
        path: 'mylist',
        name: 'mylist',
        component: () => import(/* webpackChunkName: "mylist" */ '../components/myProduct')
      }
    ]
  },
  {
    path: '/addproduct',
    name: 'products',
    component: () => import(/* webpackChunkName: "products" */ '../views/products'),
    children : [
      {
        path: '',
        name: 'addproduct',
        component: () => import(/* webpackChunkName: "addproduct" */ '../components/AddProduct'),
      },
      {
        path: 'updateproduct',
        name: 'updateproduct',
        component: () => import(/* webpackChunkName: "updateproduct" */ '../components/UpdateProduct')
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
