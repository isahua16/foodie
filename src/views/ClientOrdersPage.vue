<template>
  <div>
    <client-header></client-header>
    <h2>ORDERS PAGE</h2>
    <client-orders></client-orders>
  </div>
</template>

<script>
import ClientHeader from "@/components/ClientHeader.vue";
import ClientOrders from "@/components/ClientOrders.vue";
export default {
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
