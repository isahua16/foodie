<template>
    <div>
        <restaurant-header></restaurant-header>
        <h2>Orders</h2>
        <restaurant-orders></restaurant-orders>
    </div>
</template>

<script>
import RestaurantHeader from '@/components/RestaurantHeader.vue'
import RestaurantOrders from '@/components/RestaurantOrders.vue'
    export default {
        components: {
            RestaurantHeader,
            RestaurantOrders
        }
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>