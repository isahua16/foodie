<template>
  <section>
    <h2>Customer Sign Up</h2>
    <input
      placeholder="Email"
      type="text"
      name="client_sign_up"
      ref="input_email"
    />
    <input
      placeholder="First Name"
      type="text"
      name="client_sign_up"
      ref="input_first_name"
    />
    <input
      placeholder="Last Name"
      type="text"
      name="client_sign_up"
      ref="input_last_name"
    />
    <input
      placeholder="Image link"
      type="text"
      name="client_sign_up"
      ref="input_image_url"
    />
    <input
      placeholder="Username"
      type="text"
      name="client_sign_up"
      ref="input_username"
    />
    <input
      placeholder="Password"
      type="password"
      name="client_sign_up"
      ref="input_password"
    />
    <button @click="handle_client_signup">Sign Up</button>
    <h4>{{ error_message }}</h4>
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
    handle_client_signup: function () {
      //On signup click take the data from the input fields and make the appropriate API call.
      this.error_message = undefined;
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          method: `POST`,
          data: {
            email: this.$refs[`input_email`].value,
            first_name: this.$refs[`input_first_name`].value,
            last_name: this.$refs[`input_last_name`].value,
            image_url: this.$refs[`input_image_url`].value,
            username: this.$refs[`input_username`].value,
            password: this.$refs[`input_password`].value,
          },
        })
        .then((res) => {
          //Set cookies to confirm logged in status and send to client profile page
          cookies.set(`client_id`, JSON.stringify(res.data.client_id));
          cookies.set(`token`, res.data.token);
          this.$router.push(`/profile`);
        })
        .catch(() => {
          this.error_message = `Sign up failed. Try again.`;
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