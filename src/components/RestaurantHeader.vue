<template>
    <div>
        <router-link to="/browse"><button>Browse</button></router-link>
        <router-link to="/restaurant-menu"><button>Menu</button></router-link>
        <router-link to="/restaurant-profile"><button>Profile</button></router-link>
        <restaurant-log-out></restaurant-log-out>
    </div>
</template>

<script>
import RestaurantLogOut from '@/components/RestaurantLogOut.vue'
    export default {
        components: {
            RestaurantLogOut
        }
    }
</script>

<style lang="scss" scoped>

</style>