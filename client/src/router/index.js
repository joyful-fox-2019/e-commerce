import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'mainproduct',
        component: () => import (/* webpackChunkName: 'mainproduct' */ '../views/MainPage.vue'),
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
          }
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
      }
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
