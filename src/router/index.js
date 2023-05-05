import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientHomePage from '@/views/ClientHomePage.vue'
import ClientProfilePage from '@/views/ClientProfilePage.vue'
import ClientOrdersPage from '@/views/ClientOrdersPage.vue'
import ClientCheckoutPage from '@/views/ClientCheckoutPage.vue'
import BrowseRestaurantsPage from '@/views/BrowseRestaurantsPage.vue'
import RestaurantHomePage from '@/views/RestaurantHomePage.vue'
import RestaurantProfilePage from '@/views/RestaurantProfilePage.vue'
import RestaurantEditMenuPage from '@/views/RestaurantEditMenuPage.vue'
import RestaurantViewMenuPage from '@/views/RestaurantViewMenuPage.vue'
import RestaurantOrdersPage from '@/views/RestaurantOrdersPage.vue'

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
  },
  {
    path: `/restaurant-profile`,
    component: RestaurantProfilePage
  },
  {
    path: `/restaurant-menu`,
    component: RestaurantEditMenuPage
  },
  {
    path: `/menu/:id/:name`,
    component: RestaurantViewMenuPage
  },
  {
    path: `/restaurant-orders`,
    component: RestaurantOrdersPage
  }
]

const router = new VueRouter({
  routes
})

export default router
