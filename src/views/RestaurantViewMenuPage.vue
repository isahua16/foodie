<template>
  <div>
    <!-- Based on the cookie type, display the right header -->
    <client-header v-if="cookie !== null"></client-header>
    <restaurant-header v-else></restaurant-header>
    <restaurant-view-menu></restaurant-view-menu>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import RestaurantViewMenu from "@/components/RestaurantViewMenu.vue";
import ClientHeader from "@/components/ClientHeader.vue";
import RestaurantHeader from "@/components/RestaurantHeader.vue";
export default {
  methods: {
    //Send user back to home page if they are not logged in
    is_logged_out: function () {
      if (cookies.get(`token`) === null) {
        this.$router.push(`/`);
      }
    },
  },
  data() {
    return {
      cookie: undefined,
    };
  },
  mounted() {
    this.is_logged_out();
    this.cookie = cookies.get(`client_id`);
  },
  components: {
    RestaurantViewMenu,
    ClientHeader,
    RestaurantHeader,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>