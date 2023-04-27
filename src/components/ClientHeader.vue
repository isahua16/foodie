<template>
    <nav>
        <router-link to="/browse"><button>Browse</button></router-link>
        <router-link to="/orders"><button>Orders</button></router-link>
        <router-link to="/checkout"><button>Checkout</button></router-link>
        <router-link to="/profile"><button>Profile</button></router-link>
        <client-log-out></client-log-out>
    </nav>
</template>

<script>
import ClientLogOut from '@/components/ClientLogOut.vue'
    export default {
        components: {
            ClientLogOut
        }
    }
</script>

<style lang="scss" scoped>
    
</style>