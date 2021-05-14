import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue';
import Welcome from '../components/Welcome.vue';
import Events from '../components/staff/Events.vue';
import Resources from '../components/staff/Resources.vue'

Vue.use(VueRouter)

// module.exports = {
//   dev: {
//     // Paths
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     proxyTable: {
//       '/api': {
//         target: 'http://localhost:8088', // 后期可以改
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     } // 配置跨域支持
//   }
// }

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
        { path: '/welcome', component: Welcome },
        { path: '/1-1', component: Events},
        { path: '/1-2', component: Resources}
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
