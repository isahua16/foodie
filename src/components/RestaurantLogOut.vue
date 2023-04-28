<template>
    <div>
        <button @click="handle_restaurant_logout">Logout</button>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        methods: {
            handle_restaurant_logout: function() {
                axios.request(
                    {
                        url: `https://foodie.bymoen.codes/api/restaurant-login`,
                        method: `DELETE`,
                        headers: {
                            'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                            token: cookies.get(`token`)
                        }
                    }
                ).then(() => {
                    cookies.remove(`token`);
                    cookies.remove(`restaurant_id`);
                    this.$router.push(`/restaurant`);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>