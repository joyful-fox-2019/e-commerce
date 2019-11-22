import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Addproduct from "./views/Addproduct.vue"
import Addadmin from "./views/Addadmin.vue"
import Updateproduct from "./views/Updateproduct.vue"
import Transactions from "./views/Transactions.vue"
import Pending from "./views/Pending.vue";
import Approved from "./views/Approved.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart
        }
      ]
    },
    {
      path:'/login',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: Login
        },
        {
          path:'/register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path:'/addproduct',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'addproduct',
          component: Addproduct
        },
        {
          path:'/addadmin',
          name: 'addadmin',
          component: Addadmin
        },
        {
          path:'/update/:id',
          name: 'updateproduct',
          component: Updateproduct,
          props: true
        },
      ]
    },
    {
      path:'/transactions',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'transactions',
          component: Transactions
        },
        {
          path:'/pending',
          name: 'penidng',
          component: Pending
        },
        {
          path:'/approved',
          name: 'approved',
          component: Approved
        },
      ]
    }
    
  ]
})
