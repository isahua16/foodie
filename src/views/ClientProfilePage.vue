<template>
    <div>
        <client-header></client-header>
        <client-edit-profile></client-edit-profile>
        <client-delete-account></client-delete-account>
    </div>
</template>

<script>
import ClientHeader from '@/components/ClientHeader.vue'
import ClientEditProfile from '@/components/ClientEditProfile.vue'
import ClientDeleteAccount from '@/components/ClientDeleteAccount.vue'

    export default {
        components: {
            ClientEditProfile,
            ClientDeleteAccount,
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