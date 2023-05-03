<template>
    <div class="restaurant_container">
        <article class="restaurant_card" v-for="restaurant in restaurants" :key="restaurant[`restaurant_id`]">
            <img :src="restaurant[`profile_url`]">
            <h2>{{restaurant[`name`]}}</h2>
            <h2>{{message}}</h2>
        </article>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                restaurants: undefined,
                message: undefined,
            }
        },
        mounted () {
            this.message = undefined;
            axios.request(
                {
                    url: `https://foodie.bymoen.codes/api/restaurants`,
                    headers: {
                        'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                    },
                }
            ).then((res) => {
                this.restaurants = res[`data`];
            }).catch(() => {
                this.message = `An error occured. Try again.`
            });
        },
    }
</script>

<style lang="scss" scoped>
    .restaurant_container {
        display:grid;
        row-gap: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .restaurant_card {
        display:grid;
        text-align: center;
        
        > img {
            width:200px;
            height:200px;
            object-fit: cover;
        }
    }
</style>