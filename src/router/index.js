import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientHomePage from '@/views/ClientHomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component: ClientHomePage
  },


]

const router = new VueRouter({
  routes
})

export default router
