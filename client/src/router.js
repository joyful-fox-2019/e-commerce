import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import AddProduct from './components/AddProduct.vue'
import Detail from './components/Detail.vue'
import SearchProduct from './views/SearchProduct.vue'
import EditProduct from './views/EditProduct.vue'
import FullDescription from './components/FullDescription.vue'
import FormEdit from './components/form/FormEdit.vue'
import Carts from './views/Cart.vue'
import Register from './views/Register.vue'
import Transaction from './views/Transaction.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/search',
    name: 'searchProduct',
    component: SearchProduct
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '/editProduct/:id',
    name: 'editProduct',
    component: EditProduct,
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'detail',
        component: FullDescription
      },
      {
        path: 'edit',
        component: FormEdit
      }
    ]
  },
  {
    path: '/cart',
    component: Carts,
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/transaction',
    component: Transaction
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
