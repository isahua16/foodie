<template>
    <div>
        <h3>{{message}}</h3>
        <section v-for="menu in menus" :key="menu[`id`]">
            <img :src="menu[`image_url`]">
            <h1>{{menu[`name`]}}</h1>
            <p>{{menu[`description`]}}</p>
            <h4>{{menu[`price`]}}</h4>
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
                console.log(res);
                this.message = undefined;
                this.menus = res[`data`];
            }).catch((err) => {
                console.log(err);
                this.message = `An error occured. Try again`
            });
        },
    }
</script>