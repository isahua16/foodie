import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientHomePage from '@/views/ClientHomePage.vue'
import ClientProfilePage from '@/views/ClientProfilePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component: ClientHomePage
  },
  {
    path: `/profile`,
    component: ClientProfilePage
  }
]

const router = new VueRouter({
  routes
})

export default router
