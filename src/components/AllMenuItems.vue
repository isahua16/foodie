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
        axios.request(
            {
                url: `https://foodie.bymoen.codes/api/menu`,
                headers: {
                    'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                },
                params: {
                    restaurant_id: cookies.get(`restaurant_id`)
                }
            }
        ).then((res) => {
            this.menu_items = res[`data`];
        }).catch(() => {
            this.message = `An error occured. Try again.`
        });
        this.$root.$on(`add_menu_item`, (item) => {
            this.menu_items.push(item);
        })
        },     
    }
</script>

<style lang="scss" scoped>

</style>