import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useIndexStore } from '../store'
import SignUp from '../pages/Signup.vue'
import Profile from '../pages/Profile.vue'
import SignIn from '../pages/Signin.vue'
import Error from '../pages/Error.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/signup'
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/:catchAll(.*)*',
    name: '/error',
    component: Error,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) =>
{
  const noAuthRoutes: String[] = ['signup', 'signin']
  const store = useIndexStore();
  store.updateAuthenticated();
  if (
    !store.isAuthenticated && !noAuthRoutes.includes(to.name as string)
  )
  {
    return { name: 'signup' }
  }
  if (
    store.isAuthenticated &&
    noAuthRoutes.includes(to.name as string)
  )
  {
    return { name: 'profile' };
  }
})

export default router
