<template>
  <div>
    <h3>Delete Account</h3>
    <h4>{{ error_message }}</h4>
    <input
      placeholder="Confirm Password"
      type="password"
      ref="input_password"
    />
    <button @click="handle_restaurant_delete">Delete Account</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    handle_restaurant_delete: function () {
      //If the password input field is not empty, send the api key to update the user's password, send them back to home page and delete their cookies
      let password = this.$refs[`input_password`].value;
      if (password != ``) {
        axios
          .request({
            url: `https://foodie.bymoen.codes/api/restaurant`,
            method: `DELETE`,
            headers: {
              "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
              token: cookies.get(`token`),
            },
            data: {
              password: password,
            },
          })
          .then(() => {
            this.error_message = undefined;
            this.$router.push(`/restaurant`);
            cookies.remove(`token`);
            cookies.remove(`restaurant_id`);
          })
          .catch(() => {
            this.error_message = `Could not delete your account. Try again`;
          });
      } else {
        this.error_message = `Please enter your password.`;
      }
    },
  },
  data() {
    return {
      error_message: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>