<template>
    <div>
        <client-header></client-header>
        <h2>CHECKOUT PAGE</h2>
    </div>
</template>

<script>
import ClientHeader from '@/components/ClientHeader.vue'
    export default {
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