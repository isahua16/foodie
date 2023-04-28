<template>
    <div class="profile_container">
        <h2>Restaurant Profile</h2>
        <h4>{{error_message}}</h4>
        <div>
            <img :src="banner_url" class="banner_image">
            <input placeholder="Change Banner Image" type="text" ref="banner_url">
            <button field="banner_url" @click="handle_edit">Save</button>
        </div>
        <div>
            <img :src="profile_url" class="profile_image">
            <input placeholder="Change Profile Image" type="text" ref="profile_url">
            <button field="profile_url" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>{{name}}</p>
            <input placeholder="Change Name" type="text" ref="name">
            <button field="name" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>{{phone_number}}</p>
            <input placeholder="Change Phone Number" type="text" ref="phone_number">
            <button field="phone_number" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>{{email}}</p>
            <input placeholder="Change Email" type="text" ref="email">
            <button field="email" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>{{address}}</p>
            <input placeholder="Change Address" type="text" ref="address">
            <button field="address" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>{{city}}</p>
            <select name="restaurant_sign_up" ref="city">
                <option value=""></option>
                <option value="Vancouver">Vancouver</option>
                <option value="Calgary">Calgary</option>
                <option value="Toronto">Toronto</option>
            </select>
            <button field="city" @click="handle_edit">Save</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        methods: {
            handle_edit: function(event) {
                let data_key = event.target.getAttribute(`field`);
                let input_value = this.$refs[data_key].value;
                if (input_value != ``) {
                    let data = {};
                    data[data_key] = input_value;
                    axios.request(
                        {
                            url: `https://foodie.bymoen.codes/api/restaurant`,
                            method: `PATCH`,
                            headers: {
                                'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                                token: cookies.get(`token`)
                            },
                            data: data,
                        }
                    ).then(() => {
                        this[data_key] = input_value;
                        this.error_message = undefined;
                    }).catch((err) => {
                        console.log(err);
                        this.error_message = `Updating your info failed. Try again.`
                    });
                } else {
                    this.error_message = `Please fill out the field before saving`
                }
                this.$refs[data_key].value = ``;    
            }
        },
        mounted () {
            axios.request(
                {
                    url: `https://foodie.bymoen.codes/api/restaurant`,
                    headers: {
                        'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                    },
                    params: {
                        restaurant_id: JSON.parse(cookies.get(`restaurant_id`)),
                    }
                }
            ).then((res) => {
                console.log(res);
                this.error_message = undefined;
                this.banner_url = res.data[0].banner_url;
                this.profile_url = res.data[0].profile_url;
                this.name = res.data[0].name;
                this.phone_number = res.data[0].phone_number;
                this.email = res.data[0].email;
                this.address = res.data[0].address;
                this.city = res.data[0].city;

            }).catch((err) => {
                console.log(err);
                this.error_message = `An error occured. Try again.`
            });
        },
        data() {
            return {
                error_message: undefined,
                banner_url: undefined,
                profile_url: undefined,
                name: undefined,
                phone_number: undefined,
                email:undefined,
                address: undefined,
                city: undefined,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .profile_container {
        display: grid;
        place-items: center;
    }
    .profile_image {
        width:150px;
        height:150px;
        object-fit: cover;
    }
    .banner_image {
        width: 100%;
        height: 20vh;
        object-fit: cover;
    }

    div {
        width:100%;
        display: grid;
        place-items: center;
    }
</style>