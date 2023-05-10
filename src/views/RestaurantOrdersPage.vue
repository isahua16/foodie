<template>
  <div>
    <restaurant-header></restaurant-header>
    <h2>Orders</h2>
    <restaurant-orders></restaurant-orders>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import RestaurantHeader from "@/components/RestaurantHeader.vue";
import RestaurantOrders from "@/components/RestaurantOrders.vue";
export default {
  mounted() {
    this.is_logged_out();
  },
  methods: {
    is_logged_out: function () {
      if (cookies.get(`token`) === null) {
        this.$router.push(`/`);
      }
    },
  },
  components: {
    RestaurantHeader,
    RestaurantOrders,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>