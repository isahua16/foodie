<template>
    <div>
        <single-menu-item v-for="item in menu_items" :key="item[`menu_id`]" :item="item"></single-menu-item>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import SingleMenuItem from '@/components/SingleMenuItem.vue'

    export default {
        methods: {
            get_all_items: function () {
                axios.request({
                    url: `https://foodie.bymoen.codes/api/menu`,
                    headers: {
                        'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                    },
                    params: {
                        restaurant_id: cookies.get(`restaurant_id`)
                    }
                }).then((res) => {
                    this.menu_items = res[`data`];
                }).catch(() => {
                    this.message = `An error occured. Try again.`
                });
            }
        },
        components: {
            SingleMenuItem
        },
        data() {
            return {
                menu_items: undefined,
                message: undefined
            }
        },
        mounted () {
            this.get_all_items();
            this.$root.$on(`new_menu_item`, this.get_all_items);
            this.$root.$on(`delete_menu_item`, this.get_all_items);
        },     
    }
</script>

<style lang="scss" scoped>

</style>