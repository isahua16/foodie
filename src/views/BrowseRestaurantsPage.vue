<template>
    <div>
        <client-header v-if="cookie != null"></client-header>
        <h2>BROWSE RESTAURANTS</h2>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import ClientHeader from '@/components/ClientHeader.vue'
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
            ClientHeader
        }
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>