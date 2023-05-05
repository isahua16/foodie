<template>
    <article>
        <h3>{{message}}</h3>
        <div>
            <h2>{{name}}</h2>
            <input placeholder="Change Name" type="text" ref="name">
            <button :id="item[`id`]" field="name" @click="handle_edit">Save</button>
        </div>
        <div>
            <img :src="image_url">
            <input placeholder="Change Image" type="text" ref="image_url">
            <button :id="item[`id`]" field="image_url" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>{{description}}</p>
            <input placeholder="Change Description" type="text" ref="description">
            <button :id="item[`id`]" field="description" @click="handle_edit">Save</button>
        </div>
        <div>
            <h3>${{price}}</h3>
            <input placeholder="Change Price" type="text" ref="price">
            <button :id="item[`id`]" field="price" @click="handle_edit">Save</button>
        </div>
        <button>DELETE ITEM</button>
        </article>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        mounted () {
            this.name = this.item.name;
            this.image_url = this.item.image_url;
            this.description = this.item.description;
            this.price = this.item.price;
        },
        data() {
            return {
                message: undefined,
                name: undefined,
                image_url: undefined,
                description: undefined,
                price: undefined,
            }
        },
        methods: {
            handle_edit: function(event) {
                let menu_id = Number(event[`target`].getAttribute(`id`));
                let data_key = event[`target`].getAttribute(`field`);
                let input_value = this.$refs[data_key].value;

                if(input_value === ``) {
                    this.message = `The field cannot be empty`;
                } else {
                    this.message = undefined;

                    let data_object = {};
                    data_object[`menu_id`] = menu_id;
                    data_object[data_key] = input_value;

                    axios.request(
                        {
                            url: `https://foodie.bymoen.codes/api/menu`,
                            method: `PATCH`,
                            headers: {
                                'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                                token: cookies.get(`token`)
                            },
                            data: data_object
                        }
                    ).then(() => {
                        this[data_key] = input_value;
                        this.$refs[data_key].value = ``;
                    }).catch(() => {
                        this.message = `Edit was unsuccessful. Try again`;
                    });
                }
            }
        },
        props: {
            item: Object
        }
    }
</script>

<style lang="scss" scoped>

article {
    margin: 10px 0;   
    display:grid;
    text-align: center;
    place-items: center;
    border: 2px solid black;
}
div {
    display: grid;
    place-items: center;
}

img {
        width:100px;
        height:100px;
        object-fit: cover;
    }
</style>