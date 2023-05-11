<template>
  <div>
    <client-header></client-header>
    <client-edit-profile></client-edit-profile>
    <client-delete-account></client-delete-account>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import ClientHeader from "@/components/ClientHeader.vue";
import ClientEditProfile from "@/components/ClientEditProfile.vue";
import ClientDeleteAccount from "@/components/ClientDeleteAccount.vue";

export default {
  mounted() {
    this.is_logged_out();
  },
  methods: {
    //Send user back to home page if logged out
    is_logged_out: function () {
      if (cookies.get(`token`) === null) {
        this.$router.push(`/`);
      }
    },
  },
  components: {
    ClientEditProfile,
    ClientDeleteAccount,
    ClientHeader,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>