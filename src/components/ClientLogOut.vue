<template>
  <div>
    <button @click="handle_logout_click">Logout</button>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      message: undefined,
    };
  },
  methods: {
    handle_logout_click: function () {
      //On click, delete logged in cookies and send back to home page
      this.message = undefined;
      axios
        .request({
          url: `https://foodie.bymoen.codes/api/client-login`,
          method: `DELETE`,
          headers: {
            "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
            token: cookies.get(`token`),
          },
        })
        .then(() => {
          cookies.remove(`token`);
          cookies.remove(`client_id`);
          this.$router.push(`/`);
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