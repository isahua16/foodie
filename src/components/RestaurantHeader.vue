<template>
    <nav>
        <router-link to="/browse"><button>Browse</button></router-link>
        <router-link to="/restaurant-menu"><button>Menu</button></router-link>
        <router-link to="/restaurant-profile"><button>Profile</button></router-link>
        <router-link to="/restaurant-orders"><button>Orders</button></router-link>
        <restaurant-log-out></restaurant-log-out>
    </nav>
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