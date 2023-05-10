<template>
    <div>
        <button @click="() => patch_data(button_type, order_id)">{{button_text}}</button>
        <h3>{{message}}</h3>
    </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';
    export default {
        methods: {
            patch_data: function (button_type, order_id) {
                this.message = undefined;
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
                    this.$root.$emit(`order_status_changed`);
                }).catch(() => {
                    this.message = `An error occured. Please try again.`;
                });
            },
        },
        data() {
            return {
                message: undefined
            }
        },
        props: {
            button_type: String,
            order_id: Number,
            button_text: String
        }
    }
</script>

<style lang="scss" scoped>

</style>