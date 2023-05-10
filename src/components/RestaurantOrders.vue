<template>
    <div class="order_container">
        <h3>{{message}}</h3>
        <div class="single_order" v-for="(order, i) in orders" :key="i">
            <p>Order: #{{order[`order_id`]}}</p>
            <h2>{{order[`name`]}}</h2>
            <restaurant-handle-order v-if="order[`is_confirmed`] === 0" :button_type="`is_confirmed`" :order_id="order[`order_id`]" :button_text="`Confirm Order`"></restaurant-handle-order>
            <restaurant-handle-order v-else-if="order[`is_complete`] === 0" :button_type="`is_complete`" :order_id="order[`order_id`]" :button_text="`Complete Order`"></restaurant-handle-order>
            <h4 v-else>Order is completed</h4>
        </div>        
    </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';
import RestaurantHandleOrder from '@/components/RestaurantHandleOrder.vue';
    export default {
        components: {
            RestaurantHandleOrder
        },
        data() {
            return {
                orders: undefined,
                message : undefined
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
                    if(this.orders === undefined || this.orders.length < 1) {
                        this.message = `Orders list is empty`
                    } else {
                        this.message = undefined;
                    }
                }).catch(() => {
                    this.message = `An error occured. Please try again`;
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
                }).catch(() => {
                    this.message = `An error occured. Please try again.`;
                });
            }
        },
        mounted () {
            this.get_orders();
            this.$root.$on(`order_status_changed`, this.get_orders);
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