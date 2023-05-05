<template>
    <div>
        <restaurant-view-menu></restaurant-view-menu>
    </div>
</template>

<script>
import RestaurantViewMenu from '@/components/RestaurantViewMenu.vue'
    export default {
        components: {
            RestaurantViewMenu
        }
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>