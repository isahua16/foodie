import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientHomePage from '@/views/ClientHomePage.vue'
import ClientProfilePage from '@/views/ClientProfilePage.vue'
import ClientOrdersPage from '@/views/ClientOrdersPage.vue'
import ClientCheckoutPage from '@/views/ClientCheckoutPage.vue'
import BrowseRestaurantsPage from '@/views/BrowseRestaurantsPage.vue'
import RestaurantHomePage from '@/views/RestaurantHomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component: ClientHomePage
  },
  {
    path: `/profile`,
    component: ClientProfilePage
  },
  {
    path: `/orders`,
    component: ClientOrdersPage
  },
  {
    path: `/checkout`,
    component: ClientCheckoutPage
  },
  {
    path: `/browse`,
    component: BrowseRestaurantsPage
  },
  {
    path: `/restaurant`,
    component: RestaurantHomePage
  }
]

const router = new VueRouter({
  routes
})

export default router
