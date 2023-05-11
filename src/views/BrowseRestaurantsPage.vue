<template>
  <div>
    <!-- Display the right header depending on the stored cookie -->
    <client-header v-if="cookie !== null"></client-header>
    <restaurant-header v-else></restaurant-header>
    <h2>BROWSE RESTAURANTS</h2>
    <restaurant-list></restaurant-list>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import ClientHeader from "@/components/ClientHeader.vue";
import RestaurantHeader from "@/components/RestaurantHeader.vue";
import RestaurantList from "@/components/RestaurantList.vue";
export default {
  methods: {
    //Send user back to home page if logged out
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
    ClientHeader,
    RestaurantHeader,
    RestaurantList,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>