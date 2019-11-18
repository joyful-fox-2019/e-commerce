import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
      children: [
        {
          path: 'editprofile',
          name: 'editprofile',
          component: () => import(/* webpackChunkName: "editprofile" */ './components/edit-profile.vue')
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: () => import(/* webpackChunkName: "wishlist" */ './components/wishlist.vue')
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import(/* webpackChunkName: "transactions" */ './components/transactions.vue')
        }
      ]
    },
    {
      path: '/mystore',
      name: 'mystore',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MyStore.vue'),
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import(/* webpackChunkName: "store-product" */ './components/store-products.vue')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import(/* webpackChunkName: "store-order" */ './components/store-order.vue')
        },
        {
          path: 'addproduct',
          name: 'addproduct',
          component: () => import(/* webpackChunkName: "store-add-product" */ './components/store-add-product.vue')
        },
        {
          path: ':id/editproduct',
          name: 'editproduct',
          component: () => import(/* webpackChunkName: "store-add-product" */ './components/store-edit-product.vue')
        }
      ]
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue')
    },
    {
      path: '/:id/productdetail',
      name: 'productdetail',
      component: () => import(/* webpackChunkName: "productdetail" */ './views/Product-detail.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) next('/')
        else next()
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
