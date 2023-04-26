<template>
    <div class="profile_container">
        <h4>{{error_message}}</h4>
        <div>
            <img :src="user_image_url">
            <input placeholder="Change Image" type="text" ref="image_url">
            <button field="image_url" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>First Name: {{user_first_name}}</p>
            <input placeholder="Change First Name" type="text" ref="first_name">
            <button field="first_name" @click="handle_edit">Save</button>
        </div>
        <div>   
            <p> Last Name: {{user_last_name}}</p>
            <input placeholder="Change Last Name" type="text" ref="last_name">
            <button field="last_name" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>Email: {{user_email}}</p>
            <input placeholder="Change Email" type="text" ref="email">
            <button field="email" @click="handle_edit">Save</button>
        </div>
        <div>
            <p>Password: *******</p>
            <input placeholder="Change Password" type="text" ref="password">
            <button field="password" @click="handle_edit">Save</button>
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

                if(input_value != ``) {
                    let data = {};
                    data[data_key] = input_value;
                    axios.request(
                        {
                            url: `https://foodie.bymoen.codes/api/client`,
                            method: `PATCH`,
                            headers: {
                                'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                                token: cookies.get(`token`)
                            },
                            data: data
                        }
                    ).then((res) => {
                        res;
                    }).catch(() => {
                        this.error_message = `Updating your info failed. Try again.`
                    });
                } else {
                    this.error_message = `Please fill out the field before saving`
                }
            }
        },
        data() {
            return {
                user_image_url: undefined,
                user_email: undefined,
                user_first_name: undefined,
                user_last_name: undefined,
                error_message: undefined,
            }
        },
        mounted () {
            axios.request(
                {
                    url: `https://foodie.bymoen.codes/api/client`,
                    headers: {
                        'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                    },
                    params: {
                        client_id: JSON.parse(cookies.get(`client_id`))
                    }
                }
            ).then((res) => {
                this.user_image_url = res.data[0].image_url;
                this.user_email = res.data[0].email;
                this.user_first_name = res.data[0].first_name;
                this.user_last_name = res.data[0].last_name;
            }).catch(() => {
                this.error_message = `An error occured. Try again.`
            });
        }
    }
</script>

<style lang="scss" scoped>
    .profile_container {
        display: grid;
        place-items: center;
    }
    
    
    div {
        display: grid;
        place-items: center;
        > img {
            width:200px;
            height:200px;
            object-fit: cover;
            object-position: top;
        }

    }
</style>