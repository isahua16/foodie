<template>
    <div>
        <button @click="handle_logout_click">Logout</button>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
    export default {
        methods: {
            handle_logout_click: function() {
                cookies.remove(`token`);
                cookies.remove(`client_id`);
                this.$router.push(`/`);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>