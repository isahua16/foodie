<template>
  <section>
    <h2>Restaurant Log In</h2>
    <h4>{{ error_message }}</h4>
    <input placeholder="Email" type="text" ref="input_email" />
    <input placeholder="Password" type="password" ref="input_password" />
    <button @click="handle_restaurant_login">Log In</button>
  </section>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      error_message: undefined,
    };
  },
  methods: {
    handle_restaurant_login: function () {
      //Send proper API call to log in a restaurant user on click
      this.error_message = undefined;
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant-login`,
          method: `POST`,
          data: {
            email: this.$refs[`input_email`].value,
            password: this.$refs[`input_password`].value,
          },
        })
        .then((res) => {
          //Store logged in status cookies
          cookies.set(
            `restaurant_id`,
            JSON.stringify(res.data[0].restaurant_id)
          );
          cookies.set(`token`, res.data[0].token);
          this.$router.push(`/restaurant-profile`);
        })
        .catch(() => {
          this.error_message = `Log in failed. Try again`;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  width: 80%;
  place-items: center;
}
</style>