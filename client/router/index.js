import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/views/Home'
import MyCart from '../src/views/MyCart'
import FormSignInJoin from '../src/views/FormSignInJoin'
import store from '../src/store'
// import App from '../src/App'
// import HomeNoToken from '../src/views/HomeNoToken'
// import NavbarNoToken from '../src/components/NavbarNoToken'
// import SignInJoinView from '../src/views/SignInJoinView'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signinjoin',
      name: 'signInJoin',
      component: FormSignInJoin
    },
    {
      path: '/cart',
      name: 'cart',
      component: MyCart,
      beforeEnter: (to, from, next) => {
        store
          .dispatch("fetchMyCart")
          .then(next)
      }
    }
  ]
})