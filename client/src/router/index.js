import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import DetailProduct from '../views/DetailProduct.vue'
import AddProduct from '../views/AddProduct.vue'
import Admin from '../views/Admin.vue'
import Update from '../views/Update.vue'
import TransactionUser from '../views/TransactionUser.vue'
import TransactionAdmin from '../views/TransactionAdmin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'detailproduct',
    component: DetailProduct
  },
  {
    path: '/update/:id',
    name: 'update',
    component: Update
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    children: [
      {
        path: 'register',
        name: 'register',
        component: Register
      },
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: TransactionUser,
        beforeEnter: (to, from, next) => {
          if (!localStorage.getItem('token')) {
            next('/')
          } else {
            next()
          }
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next('/')
      } else {
        if (localStorage.getItem('email') === 'admin@mail.com') {
          next()
        } else {
          next('/')
        }
      }
    },
    children: [
      {
        path: 'addproduct',
        name: 'addproduct',
        component: AddProduct
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: TransactionAdmin
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
