<template>
    <section>
        <h2>Client Log In</h2>
        <input placeholder="Email" type="text" name="client_log_in" ref="input_email">
        <input placeholder="Password" type="password" name="client_log_in" ref="input_password">
        <button @click="handle_client_login">Log In</button>
        <h4>{{error_message}}</h4>
    </section>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        data() {
            return {
                error_message: undefined
            }
        },
        methods: {
            handle_client_login: function () {
                this.error_message = undefined;
                axios.request(
                    {
                        url: `https://foodie.bymoen.codes/api/client-login`,
                        method: `POST`,
                        headers: {
                            'x-api-key': `9uOwrHiuKE6VUs8CIbJo`
                        },
                        data: {
                            email: this.$refs[`input_email`].value,
                            password: this.$refs[`input_password`].value
                        }
                    }
                ).then((res) => {
                    cookies.set(`client_id`, JSON.stringify(res.data.client_id));
                    cookies.set(`token`, res.data.token);
                    this.$router.push(`/profile`);
                }).catch(() => {
                    this.error_message = `Log in failed. Try again.`
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    section {
        display: grid;
        width: 80%;
        place-items: center;
    }
</style>