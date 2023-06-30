<template>
  <div>
    <button @click="() => patch_data(button_type, order_id)">
      {{ button_text }}
    </button>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    patch_data: function (button_type, order_id) {
      // Get the button type and the order id from the props
      this.message = undefined;
      //Create a new data object to be sent in the patch API call
      let patch_data = {};
      patch_data[button_type] = 1;
      patch_data[`order_id`] = order_id;
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant-order`,
          method: `PATCH`,
          headers: {
            token: cookies.get(`token`),
          },
          data: patch_data,
        })
        .then(() => {
          //Emit an event to reload the orders to reflect the orders status change
          this.$root.$emit(`order_status_changed`);
        })
        .catch(() => {
          this.message = `An error occured. Please try again.`;
        });
    },
  },
  data() {
    return {
      message: undefined,
    };
  },
  props: {
    button_type: String,
    order_id: Number,
    button_text: String,
  },
};
</script>

<style lang="scss" scoped>
</style>