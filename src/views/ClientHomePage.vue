<template>
    <div>
        <client-sign-up></client-sign-up>
    </div>
</template>

<script>
import ClientSignUp from '@/components/ClientSignUp.vue'

    export default {
        components: {
            ClientSignUp,
        },
        
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>