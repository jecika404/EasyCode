import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue')

  },
  {
    path: '/project',
    name: 'project',
    component: () => import('../views/Project.vue')
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('../views/Notes.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/Calendar.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
