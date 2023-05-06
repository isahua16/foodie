<template>
    <div>        
        <client-header v-if="cookie !== null"></client-header>
        <restaurant-header v-else></restaurant-header>
        <restaurant-view-menu></restaurant-view-menu>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import RestaurantViewMenu from '@/components/RestaurantViewMenu.vue'
import ClientHeader from '@/components/ClientHeader.vue'
import RestaurantHeader from '@/components/RestaurantHeader.vue'
    export default {
                data() {
            return {
                cookie: undefined
            }
        },
        mounted () {
                this.cookie = cookies.get(`client_id`);
        },
        components: {
            RestaurantViewMenu,
            ClientHeader,
            RestaurantHeader
        }
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>