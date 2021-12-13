import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/Index'
  },
  {
    path: '/Index',
    name: 'Sousuo',
    component: () => import(/* webpackChunkName: "Index" */ '@/views/Sousuo.vue')
  },
  {
    path: '/Zhanshi',
    name: 'Zhanshi',
    component: () => import(/* webpackChunkName: "Zhanshi" */ '@/views/Zhanshi.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
  },
  {
    path: '/RecycleBin',
    name: 'RecycleBin',
    component: () => import(/* webpackChunkName: "RecycleBin" */ '@/views/RecycleBin.vue')
  },
  {
    path: '/RecycleBinZs',
    name: 'RecycleBinZs',
    component: () => import(/* webpackChunkName: "RecycleBin" */ '@/views/RecycleBinZs.vue')
  },
  {
    path: '/Shuju',
    name: 'Shuju',
    component: () => import(/* webpackChunkName: "Shuju" */ '@/views/Shuju.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//路由守卫，拦截未登录页面
router.beforeEach((to, from, next) => {
  //用你的方式获取登录的用户信息
  const islogin = sessionStorage.islogin
  if(islogin=='islogin' || to.name === 'Login'){
      //如果存在用户信息，或者进入的页面是登录页面，则直接进入
      next()
  }else {
      //不存在用户信息则说明用户未登录，跳转到登录页面，带上当前的页面地址，登录完成后做回跳，
      //如未登录用户进入用户中心的页面地址，检测到未登录，
      //自动跳转到登录页面，并且带上用户中心的页面地址，登录完成后重新跳到个人中心页面。
      next({
        name: 'Login',
        query: {
          redirect: to.path
        }
      })
  }
})

export default router
