<template>
    <div>
        <button @click="handle_logout_click">Logout</button>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'
    export default {
        methods: {
            handle_logout_click: function() {
                axios.request(
                    {
                        url :`https://foodie.bymoen.codes/api/client-login`,
                        method: `DELETE`,
                        headers: {
                            'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                            token: cookies.get(`token`)
                        }
                    }
                ).then(() => {
                    cookies.remove(`token`);
                    cookies.remove(`client_id`);
                    this.$router.push(`/`);
                }).catch((err) => {
                    err;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>