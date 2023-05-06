<template>
    <div>
        <client-header></client-header>
        <h2>CHECKOUT PAGE</h2>
        <client-checkout></client-checkout>
    </div>
</template>

<script>
import ClientHeader from '@/components/ClientHeader.vue';
import ClientCheckout from '@/components/ClientCheckout.vue';
    export default {
        components: {
            ClientHeader,
            ClientCheckout
        }
    }
</script>

<style lang="scss" scoped>
        div {
        display: grid;
        place-items: center;
    }
</style>