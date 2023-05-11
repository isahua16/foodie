<template>
  <section>
    <h2>Restaurant Sign Up</h2>
    <h4>{{ error_message }}</h4>
    <input placeholder="Email" type="text" ref="input_email" />
    <input placeholder="Name" type="text" ref="input_name" />
    <input placeholder="Address" type="text" ref="input_address" />
    <input placeholder="Phone Number" type="text" ref="input_phone_number" />
    <input placeholder="Bio" type="text" ref="input_bio" />
    <select name="restaurant_sign_up" ref="input_city">
      <option value="Vancouver">Vancouver</option>
      <option value="Calgary">Calgary</option>
      <option value="Toronto">Toronto</option>
    </select>
    <input
      placeholder="Profile Image URL"
      type="text"
      ref="input_profile_url"
    />
    <input placeholder="Banner Image URL" type="text" ref="input_banner_url" />
    <input placeholder="Password" type="password" ref="input_password" />
    <button @click="handle_restaurant_signup">Sign Up</button>
  </section>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    handle_restaurant_signup: function () {
      //On click of sign up button, send the proper API call containing the info from the input tags as the data.
      this.error_message = undefined;
      axios
        .request({
          url: `https://foodie.bymoen.codes/api/restaurant`,
          method: `POST`,
          headers: {
            "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
          },
          data: {
            email: this.$refs[`input_email`].value,
            name: this.$refs[`input_name`].value,
            address: this.$refs[`input_address`].value,
            phone_number: this.$refs[`input_phone_number`].value,
            bio: this.$refs[`input_bio`].value,
            city: this.$refs[`input_city`].value,
            profile_url: this.$refs[`input_profile_url`].value,
            banner_url: this.$refs[`input_banner_url`].value,
            password: this.$refs[`input_password`].value,
          },
        })
        .then((res) => {
          //Store logged in statues cookies and send to profile page
          cookies.set(`restaurant_id`, JSON.stringify(res.data.restaurant_id));
          cookies.set(`token`, res.data.token);
          this.$router.push(`/restaurant-profile`);
        })
        .catch(() => {
          this.error_message = `An error occured. Try again`;
        });
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
section {
  display: grid;
  width: 80%;
  place-items: center;
}
</style>