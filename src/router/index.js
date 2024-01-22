import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomePage from '@/pages/HomePage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import Register from '@/components/RegisterView.vue'
import SignInViewVue from '@/components/SignInView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignInViewVue
    },
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/favorites',
      name: 'Favorite',
      component: FavoritesPage
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/AboutView.vue')
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/sign-in')
    }
  } else {
    next()
  }
})

export default router
