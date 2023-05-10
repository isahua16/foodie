<template>
<div>
    <button @click="handle_order_click">Add to order</button>
    <h3>{{message}}</h3>
</div>
</template>

<script>
import cookies from 'vue-cookies';
    export default {
        mounted () {
            this.get_order();
        },
        data() {
            return {
                order: undefined,
                message: undefined
            }
        },
        props: {
            menu_id: Number,
            restaurant_id: String
        },
        methods: {
            get_order: function() {
                if (cookies.get(`order`) !== null) {
                    this.order = cookies.get(`order`);
                } else {
                    this.order = {};
                    this.order[`restaurant_id`] = this.restaurant_id;
                    this.order[`menu_items`] = [];
                }
            },
            handle_order_click: function () {
                this.message = undefined;
                if (this.restaurant_id == this.order[`restaurant_id`]) {
                    this.order[`menu_items`].push(this.menu_id);
                    cookies.set(`order`, this.order);
                    this.message = `Item added to checkout`;
                } else {
                    this.message = `One restaurant order at a time only`;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>