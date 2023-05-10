<template>
  <div>
    <client-header></client-header>
    <h2>CHECKOUT PAGE</h2>
    <client-checkout></client-checkout>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import ClientHeader from "@/components/ClientHeader.vue";
import ClientCheckout from "@/components/ClientCheckout.vue";
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
    ClientHeader,
    ClientCheckout,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>