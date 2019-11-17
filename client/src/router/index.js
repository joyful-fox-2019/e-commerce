import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Histrorypage from '../views/Historypage.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Gamelist from '../views/Gamelist.vue'
import Addgame from '../views/Addgame.vue'
import Editgame from '../views/Editgame.vue'
import Purchased from '../views/Purchased.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cart/:id',
    name: 'cart',
    component: Cart
  },
  {
    path: '/mygame/:id',
    name: 'mygame',
    component: Histrorypage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: 'game-list',
        component: Gamelist
      },
      {
        path: 'add-game',
        component: Addgame
      },
      {
        path: 'edit-game/:id',
        component: Editgame
      },
      {
        path: 'purchased',
        component: Purchased
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
