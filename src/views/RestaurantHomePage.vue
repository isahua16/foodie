<template>
  <div>
    <button @click="handle_restaurant_view">{{ button_message }}</button>
    <restaurant-sign-up v-if="display_signup === true"></restaurant-sign-up>
    <restaurant-log-in v-else></restaurant-log-in>
    <button @click="$router.push(`/`)">I am a customer</button>
  </div>
</template>

<script>
import RestaurantSignUp from "@/components/RestaurantSignUp.vue";
import RestaurantLogIn from "@/components/RestaurantLogIn.vue";
export default {
  methods: {
    handle_restaurant_view: function () {
      //Function to determine if the user should see the log in or sign up component
      this.display_signup = !this.display_signup;
      if (this.display_signup === false) {
        this.button_message = `I am a new restaurant`;
      } else {
        this.button_message = `I am a returning restaurant`;
      }
    },
  },
  data() {
    return {
      button_message: `I am a returning restaurant`,
      display_signup: true,
    };
  },
  components: {
    RestaurantSignUp,
    RestaurantLogIn,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>