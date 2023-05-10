<template>
  <div>
    <restaurant-header></restaurant-header>
    <restaurant-edit-profile></restaurant-edit-profile>
    <restaurant-delete-account></restaurant-delete-account>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import RestaurantHeader from "@/components/RestaurantHeader.vue";
import RestaurantEditProfile from "@/components/RestaurantEditProfile.vue";
import RestaurantDeleteAccount from "@/components/RestaurantDeleteAccount.vue";
export default {
  methods: {
    is_logged_out: function () {
      if (cookies.get(`token`) === null) {
        this.$router.push(`/`);
      }
    },
  },
  mounted() {
    this.is_logged_out();
  },
  components: {
    RestaurantEditProfile,
    RestaurantHeader,
    RestaurantDeleteAccount,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>