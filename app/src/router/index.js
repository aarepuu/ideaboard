import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

// Auth
import Auth from '@/components/auth/Auth'
import Reset from '@/components/auth/Reset'

// Pages
import About from '@/components/pages/About'
import Terms from '@/components/pages/Terms'
import Privacy from '@/components/pages/Privacy'
import Profile from '@/components/pages/Profile'

// Ideas
import Create from '@/components/ideas/Create'
import Explore from '@/components/ideas/Explore'
import Idea from '@/components/ideas/Idea'

import config from '@/config'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function (resolve) {
        const subdomain = window.location.hostname.split('.')[0]
        const instance = ((subdomain === 'localhost') || (subdomain === config.domain.split('.')[0])) ? config.instances.default : subdomain.toLowerCase() // subdomain
        require([`@/components/instances/${instance}.vue`], resolve)
      }
    },
    {
      path: '/learn',
      name: 'about',
      component: About
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/profile/:id?',
      name: 'profile',
      component: Profile,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/explore/:category?',
      name: 'explore',
      component: Explore
    },
    {
      path: '/idea/:id',
      name: 'idea',
      component: Idea,
      props: true
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/reset/:code?',
      name: 'reset',
      component: Reset,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(Store.getters.isAuthenticated)
    if (!Store.getters.isAuthenticated) {
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
