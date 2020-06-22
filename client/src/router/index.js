import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: {
      guest: true
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {
      guest: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresSignIn: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router user flow
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresSignIn)) {
//     if (localStorage.getItem('token')) {
//       console.log('good')
//       next({
//         name: 'profile'
//       })
//     } else {
//       next('/sign-in')
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem('token') == null) {
//       next()
//     } else {
//       next('/profile')
//     }
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresSignIn)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next({ name: 'SignIn' })
  } else {
    next()
  }
})

export default router
