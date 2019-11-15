import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainPage from '../views/MainPage.vue'
import HistoryPage from '../views/HistoryPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [

      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
      },
      {
        path: '',
        name: 'mainproduct',
        component: MainPage,
        children: [
          {
            path: '',
            name: 'allproduct',
            component: () => import (/* webpackChunkName: 'allproduct' */ '../views/AllProduct.vue')
          },
          {
            path: ':name',
            name: 'category',
            component: () => import (/* webpackChunkName: 'category' */ '../views/Category.vue')
          },
          {
            path: 'detail/:id',
            name: 'detail',
            component: () => import (/* webpackChunkName: 'detail' */ '../views/Detail.vue')
          },
          {
            path: '/profile/wishlist',
            name: 'wishlist',
            component: () => import(/* webpackChunkName: "wishlist" */ '../views/WishList.vue')
          },
          {
            path: '/history/list',
            name: 'history',
            component: HistoryPage,
            children: [
              {
                path: '',
                name: 'allhistory',
                component: () => import(/* webpackChunkName: "allhistory" */ '../views/History/AllHistory.vue')
              },
              {
                path: 'confirm',
                name: 'confirm',
                component: () => import(/* webpackChunkName: "confirm" */ '../views/History/ConfirmHistory.vue')
              },
              {
                path: 'process',
                name: 'process',
                component: () => import(/* webpackChunkName: "process" */ '../views/History/ProcessHistory.vue')
              },
              {
                path: 'sent',
                name: 'sent',
                component: () => import(/* webpackChunkName: "sent" */ '../views/History/SentHistory.vue')
              }
            ]
          }
        ]
      },
    ]
  },
  {
    path: '/store',
    name: 'store',
    component: () => import(/* webpackChunkName: "store" */ '../views/StorePage.vue')
  },
  {
    path: '/store/create',
    name: 'storecreate',
    component: () => import(/* webpackChunkName: "createstore" */ '../views/CreateStore.vue')
  },
  {
    path: '/product/create',
    name: 'createproduct',
    component: () => import(/* webpackChunkName: "createproduct" */ '../views/CreateProduct.vue')
  },
  {
    path: '/cart/list',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
