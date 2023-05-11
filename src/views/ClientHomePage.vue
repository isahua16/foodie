<template>
  <div>
    <button @click="handle_customer_view">{{ button_message }}</button>
    <client-sign-up v-if="display_signup === true"></client-sign-up>
    <client-log-in v-else></client-log-in>
    <button @click="$router.push(`/restaurant`)">I am a restaurant</button>
  </div>
</template>

<script>
import ClientSignUp from "@/components/ClientSignUp.vue";
import ClientLogIn from "@/components/ClientLogIn.vue";
export default {
  methods: {
    handle_customer_view: function () {
      //Function to determine if the client should see the log in or sign up component
      this.display_signup = !this.display_signup;
      if (this.display_signup === true) {
        this.button_message = `I am a returning customer`;
      } else {
        this.button_message = `I am a new customer`;
      }
    },
  },
  data() {
    return {
      display_signup: true,
      button_message: `I am a returning customer`,
    };
  },
  components: {
    ClientSignUp,
    ClientLogIn,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>