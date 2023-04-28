<template>
    <div>
        <h3>Delete Account</h3>
        <h4>{{message}}</h4>
        <input placeholder="Password" type="password" ref="input_password">
        <button @click="handle_client_delete">Delete Account</button>
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
            handle_client_delete: function() {
                let password = this.$refs[`input_password`].value;
                if (password === ``) {
                    this.message = `Please enter your password`
                } else {
                    axios.request(
                        {
                            url: `https://foodie.bymoen.codes/api/client`,
                            method: `DELETE`,
                            headers: {
                                'x-api-key': `9uOwrHiuKE6VUs8CIbJo`,
                                token: cookies.get(`token`)
                            },
                            data: {
                                password: password
                            }
                        }
                    ).then((res) => {
                        res;
                        this.message = undefined;
                        this.$router.push(`/`);
                    }). catch((err) => {
                        err;
                        this.message = `An error occured. Try again`
                    });
                }
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>