import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'App',
    component: Home,
    children: [
      {
        path: '/products',
        name: 'AllProducts',
        component: () => import(/* webpackChunkName: "AllProducts" */ '../components/AllProducts.vue'),
      },
      {
        path: '/products/user',
        name: 'UserProducts',
        component: () => import(/* webpackChunkName: "UserProducts" */ '../components/UserProducts.vue'),
      },
      {
        path: '/product/:id',
        name: 'EditProduct',
        component: () => import(/* webpackChunkName: "EditProduct" */ '../components/EditProduct.vue'),
      },
      {
        path: '/product/detail/:id',
        name: 'DetailProduct',
        component: () => import(/* webpackChunkName: "EditProduct" */ '../components/DetailProduct.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "Cart" */ '../components/Cart.vue'),
      },
      {
        path: '/transactions',
        name: 'Transactions',
        component: () => import(/* webpackChunkName: "Transactions" */ '../components/Transactions.vue'),
      },
    ],
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignUp.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const currentUser = localStorage.getItem('user');
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//   if (requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('home')
//   else next()
// })

export default router;
