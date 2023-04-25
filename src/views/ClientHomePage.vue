<template>
    <div>
        <client-sign-up></client-sign-up>
        <client-log-in></client-log-in>
    </div>
</template>

<script>
import ClientSignUp from '@/components/ClientSignUp.vue'
import ClientLogIn from '@/components/ClientLogIn.vue'
    export default {
        components: {
            ClientSignUp,
            ClientLogIn
        },
        
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>