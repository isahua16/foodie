<template>
    <div>
        <h3>{{message}}</h3>
        <h2>Add Menu Items</h2>
        <input placeholder="Name" type="text" ref="name_input">
        <input placeholder="Description" type="text" ref="description_input">
        <input placeholder="Image Url" type="text" ref="image_url_input">
        <input placeholder="Price" type="number" ref="price_input">
        <button @click="handle_add_menu">Submit</button>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        data() {
            return {
                message: undefined
            }
        },
        methods: {
            handle_add_menu: function() {
                if (this.$refs[`description_input`].value === `` || this.$refs[`image_url_input`].value === `` || this.$refs[`name_input`].value === `` || this.$refs[`name_input`].value === ``) {
                    this.message = `Please fill in all fields`; 
                } else {
                    this.message = undefined;
                    let new_item = {
                            description: this.$refs[`description_input`].value,
                            image_url: this.$refs[`image_url_input`].value,
                            name: this.$refs[`name_input`].value,
                            price: this.$refs[`price_input`].value
                    };

                    axios.request(
                    {
                        url: `https://foodie.bymoen.codes/api/menu`,
                        method: `POST`,
                        headers: {
                            'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,    
                            token: cookies.get(`token`)
                        },
                        data: new_item
                    }
                ).then((res) => {
                    console.log(res);
                    let item_id = res[`data`][0];
                    new_item[`menu_id`] = item_id;
                    this.$root.$emit(`add_menu_item`, new_item);
                    this.message = `Item successfully added`;
                    this.$refs[`description_input`].value = ``;
                    this.$refs[`image_url_input`].value = ``;
                    this.$refs[`name_input`].value = ``;
                    this.$refs[`price_input`].value = ``;
                }).catch((err) => {
                    console.log(err);
                    this.message = `An error occured. Please try again`;
                })
                }
                
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>