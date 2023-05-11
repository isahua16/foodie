<template>
  <div>
    <button @click="handle_restaurant_logout">Logout</button>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      message: undefined,
    };
  },
  methods: {
    handle_restaurant_logout: function () {
      //On click, delete all logged in cookies and send user back to home page
      this.message = undefined;
      axios
        .request({
          url: `https://foodie.bymoen.codes/api/restaurant-login`,
          method: `DELETE`,
          headers: {
            "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
            token: cookies.get(`token`),
          },
        })
        .then(() => {
          cookies.remove(`token`);
          cookies.remove(`restaurant_id`);
          this.$router.push(`/restaurant`);
        })
        .catch(() => {
          this.message = `An error occured. Try again`;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>