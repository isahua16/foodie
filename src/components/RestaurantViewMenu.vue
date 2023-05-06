<template>
    <div>
        <h1>{{restaurant_name}} menu</h1>
        <h3>{{message}}</h3>
        <section v-for="menu in menus" :key="menu[`id`]">
            <img :src="menu[`image_url`]">
            <h1>{{menu[`name`]}}</h1>
            <p>{{menu[`description`]}}</p>
            <h3>${{menu[`price`]}}</h3>
            <button v-if="client_id !== null" :menu_id="menu[`id`]" @click="handle_order_click">Add to Order</button>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies'
    export default {
        methods: {
            handle_order_click: function(event) {
                if(this.restaurant_id === this.order[`restaurant_id`]) {
                    this.message = undefined;
                    this.order[`menu_items`].push(event[`target`].getAttribute(`menu_id`));
                    cookies.set(`order`, this.order);
                } else {
                    this.message = `You can only order from one restaurant at a time`;
                }
            }
        },
        data() {
            return {
                restaurant_id: undefined,
                restaurant_name: undefined,
                menus: undefined,
                message: undefined,
                client_id: undefined,
                order: undefined,
            }
        },
        mounted () {
            this.client_id = cookies.get(`client_id`);
            this.restaurant_id = this.$route.params.id;
            this.restaurant_name = this.$route.params.name;
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
            
            if(cookies.get(`order`) !== null) {
                this.order = cookies.get(`order`);
            } else {
                this.order = {};
                this.order[`restaurant_id`] = this.restaurant_id;
                this.order[`menu_items`] = [];
            }
        },
    }
</script>

<style lang="scss" scoped>
    section {
        display: grid;
        place-items: center;
        > img {
            width: 200px;
            height:200px;
            object-fit: cover;
        }
    }
</style>