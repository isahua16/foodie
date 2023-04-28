<template>
    <div>
        <restaurant-header></restaurant-header>
        <h2>MENU</h2>
    </div>
</template>

<script>
import RestaurantHeader from '@/components/RestaurantHeader.vue'
    export default {
        components: {
            RestaurantHeader,
        }
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>