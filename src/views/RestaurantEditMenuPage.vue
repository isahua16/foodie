<template>
  <div>
    <restaurant-header></restaurant-header>
    <h2>MENU</h2>
    <all-menu-items></all-menu-items>
    <restaurant-create-menu></restaurant-create-menu>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import RestaurantHeader from "@/components/RestaurantHeader.vue";
import AllMenuItems from "@/components/AllMenuItems.vue";
import RestaurantCreateMenu from "@/components/RestaurantCreateMenu.vue";
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
    components: {
      RestaurantHeader,
      AllMenuItems,
      RestaurantCreateMenu,
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>