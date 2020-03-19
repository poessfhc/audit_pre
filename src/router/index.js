import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component:() => import('@/views/Main.vue')
  },
  {
    path: '/projectForm',
    name: 'projectForm',
    component:() => import('@/components/form/ProjectForm.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
