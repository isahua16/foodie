<template>
    <article>
        <h2>{{error_message}}</h2>
        <img :src="user_image_url">
        <p>{{user_first_name}} {{user_last_name}}</p>
        <p>{{user_email}}</p>
    </article>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        data() {
            return {
                user_image_url: undefined,
                user_email: undefined,
                user_first_name: undefined,
                user_last_name: undefined,
                error_message: undefined,
            }
        },
        mounted () {
            axios.request(
                {
                    url: `https://foodie.bymoen.codes/api/client`,
                    headers: {
                        'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                    },
                    params: {
                        client_id: JSON.parse(cookies.get(`client_id`))
                    }
                }
            ).then((res) => {
                this.user_image_url = res.data[0].image_url;
                this.user_email = res.data[0].email;
                this.user_first_name = res.data[0].first_name;
                this.user_last_name = res.data[0].last_name;
            }).catch((err) => {
                err;
            });
        }
    }
</script>

<style lang="scss" scoped>
    article {
        display: grid;
        place-items: center;
        > img {
            width:200px;
            height:200px;
            object-fit: cover;
            object-position: top;
        }
    }
</style>