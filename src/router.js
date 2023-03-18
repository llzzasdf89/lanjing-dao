/**
 * 控制所有界面的视图和路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Market from './pages/Market.vue'
import Join from './pages/Join.vue'
import Detail from './pages/Detail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'market', //组件的命名
    component:Market
  },
  {
    path: '/join',
    name: 'join',
    component:Join
  },
  {
    path:'/detail/:commodityId',
    name:'detail',
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
