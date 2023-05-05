<template>
    <div>
        <h3>{{message}}</h3>
        <section v-for="menu in menus" :key="menu[`id`]">
            <img :src="menu[`image_url`]">
            <h1>{{menu[`name`]}}</h1>
            <p>{{menu[`description`]}}</p>
            <h3>${{menu[`price`]}}</h3>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                restaurant_id: undefined,
                menus: undefined,
                message: undefined
            }
        },
        mounted () {
            this.restaurant_id = this.$route.params.id;
            axios.request(
                {
                    url: `https://foodie.bymoen.codes/api/menu`,
                    headers: {
                        'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                    },
                    params: {
                        restaurant_id: this.restaurant_id
                    },
            
                }
            ).then((res) => {
                this.message = undefined;
                this.menus = res[`data`];
            }).catch(() => {
                this.message = `An error occured. Try again`
            });
        },
    }
</script>

<style lang="scss" scoped>
    section {
        display: grid;
        width: 80%;
        place-items: center;
        > img {
            width: 200px;
            height:200px;
            object-fit: cover;
        }
    }
</style>