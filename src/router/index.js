import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("authToken");
  if (isLogin) {
    next();
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next("/login");
    }
  }
})

export default router
