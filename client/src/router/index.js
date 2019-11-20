import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue'),
    children: [{
      path: 'register',
      name: 'formregister',
      component: () => import( /* webpackChunkName: "formregister" */ '../components/formLogin/FormRegister.vue')
    }]
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
        path: '',
        name: 'news',
        component: () => import( /* webpackChunkName: "news" */ '../components/landingPage/News.vue')
      },
      {
        path: 'itemmall',
        name: 'itemmall',
        component: () => import( /* webpackChunkName: "itemmall" */ '../components/landingPage/ItemMall.vue'),
        children: [{
            path: 'bestitem',
            name: 'bestitem',
            component: () => import( /* webpackChunkName: "bestitem" */ '../components/listItem/BestItem.vue')
          },
          {
            path: 'newitem',
            name: 'newitem',
            component: () => import( /* webpackChunkName: "newitem" */ '../components/listItem/NewItem.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
