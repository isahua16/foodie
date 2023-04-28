<template>
    <div>
        <restaurant-edit-profile></restaurant-edit-profile>
    </div>
</template>

<script>
import RestaurantEditProfile from '@/components/RestaurantEditProfile.vue'
    export default {
        components: {
            RestaurantEditProfile
        }
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>