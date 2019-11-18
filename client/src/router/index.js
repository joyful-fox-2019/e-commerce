import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart', // /mycart
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
    },
    {
      path: '/topup',
      name: 'topup',
      component: () => import(/* webpackChunkName: "topup" */ '../views/TopUp.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue'),
      children: [
        {
          path: 'pendingpayment', // topay
          name: 'pendingpayment',
          component: () => import(/* webpackChunkName: "pendingpayment" */ '../views/PendingPayment.vue')
        },
        {
          path: 'pendingdelivery', // tosend
          name: 'pendingdelivery',
          component: () => import(/* webpackChunkName: "pendingdelivery" */ '../views/PendingDelivery.vue')
        },
        {
          path: 'delivered', // sent
          name: 'delivered',
          component: () => import(/* webpackChunkName: "delivered" */ '../views/Delivered.vue')
        },
        {
          path: 'received',
          name: 'received',
          component: () => import(/* webpackChunkName: "received" */ '../views/Received.vue')
        }
      ]
    }
  ]
})
