<template>
  <div>
    <client-header></client-header>
    <h2>ORDERS PAGE</h2>
    <client-orders></client-orders>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import ClientHeader from "@/components/ClientHeader.vue";
import ClientOrders from "@/components/ClientOrders.vue";
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
    ClientHeader,
    ClientOrders,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>
