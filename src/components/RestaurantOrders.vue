<template>
    <div class="order_container">
        <div class="single_order" v-for="(order, i) in orders" :key="i">
            <p>Order: #{{order[`order_id`]}}</p>
            <h2>{{order[`name`]}}</h2>
            <button v-if="order[`is_confirmed`] === 0" @click="() => patch_order(`is_confirmed`, order[`order_id`])">Confirm Order</button>
            <button v-else-if="order[`is_complete`] === 0" @click="() => patch_order(`is_complete`, order[`order_id`])">Complete Order</button>
            <h4 v-else>Order is completed</h4>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';
    export default {
        data() {
            return {
                orders: undefined
            }
        },
        methods: {
            get_orders: function() {
                axios.request(
                    {
                        url: `https://foodie.bymoen.codes/api/restaurant-order`,
                        headers: {
                            'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                            token: cookies.get(`token`),
                        }
                    }
                ).then((res) => {
                    this.orders = res[`data`];
                }).catch((err) => {
                    console.log(err);
                });
            },
            patch_order: function(button_type, order_id) {
                let patch_data = {};
                patch_data[button_type] = `true`;
                patch_data[`order_id`] = order_id;

                axios.request(
                    {
                        url:`https://foodie.bymoen.codes/api/restaurant-order`,
                        method: `PATCH`,
                        headers: {
                            'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                            token: cookies.get(`token`),
                        },
                        data: patch_data
                    }
                ).then(() => {
                    this.get_orders();
                }).catch(() => {});
            }
        },
        mounted () {
            this.get_orders();
        },
        
    }
</script>

<style lang="scss" scoped>
div { 
    display: grid; 
    place-items: center;
}

.order_container {
    margin: 12px 0;
    row-gap: 12px;
}

.single_order {
    border: 1px solid black;
}

</style>