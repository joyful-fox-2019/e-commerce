import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import(/* webpackChunkName: "landing" */ './views/LandingPage.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "products" */ './views/ProductsPage.vue'),
      children: [
        {
          path: ':id',
          name: 'productDetail',
          component: () => import(/* webpackChunkName: "productDetail" */ './views/ProductDetail.vue')
        }
      ]
    },
    {
      path: '/myaccount',
      name: 'myAccount',
      component: () => import(/* webpackChunkName: "myAccount" */ './views/MyAccount.vue'),
      children: [
        {
          path: 'cart',
          name: 'cart',
          component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue')
        },
        {
          path: 'transaction',
          name: 'myTransaction',
          component: () => import(/* webpackChunkName: "transaction" */ './views/Transaction.vue')
        },
        {
          path: 'notification',
          name: 'notification',
          component: () => import(/* webpackChunkName: "notification" */ './views/Notification.vue')
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import(/* webpackChunkName: "favorites" */ './views/Favorites.vue'),
          children: [
            {
              path: ':id',
              name: 'favDetail',
              component: () => import(/* webpackChunkName: 'favDetail' */ './views/ProductDetail.vue')
            }
          ]
        }
      ],
      beforeEnter (to, from, next) {
        if (store.state.isLogin) next()
        else {
          next(from.fullPath)
          console.log(from)
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      children: [
        {
          path: 'transaction',
          name: 'adminTransaction',
          component: () => (/* webpackChunkName: "adminTransaction" */ './views/Transaction.vue')
        }
      ],
      beforeEnter (to, from, next) {
        if (store.state.isAdmin) next()
        else next('/')
      }
    }
  ]
})

export default router
