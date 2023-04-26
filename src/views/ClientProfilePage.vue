<template>
    <div>
        <client-edit-profile></client-edit-profile>
    </div>
</template>

<script>
import ClientEditProfile from '@/components/ClientEditProfile.vue'

    export default {
        components: {
            ClientEditProfile
        }
    }
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        place-items: center;
    }
</style>