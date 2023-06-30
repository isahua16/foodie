<template>
  <div class="order_container">
    <h3>{{ message }}</h3>
    <div class="single_order" v-for="(order, i) in orders" :key="i">
      <!-- Loop over the orders and display the first element's order_id. They should all share the same order_id since they were sorted accordingly -->
      <p>Order: #{{ order[0][`order_id`] }}</p>
      <!-- Provide buttons to confirm or complete orders depending on the current element's confirmed and complete status from the API. Again, all items within that order share the same confirmed and complete status. We are also sending props that are different depending on which button is displayed on the page -->
      <restaurant-handle-order
        v-if="order[0][`is_confirmed`] === 0"
        :button_type="`is_confirmed`"
        :order_id="order[0][`order_id`]"
        :button_text="`Confirm Order`"
      ></restaurant-handle-order>
      <restaurant-handle-order
        v-else-if="order[0][`is_complete`] === 0"
        :button_type="`is_complete`"
        :order_id="order[0][`order_id`]"
        :button_text="`Complete Order`"
      ></restaurant-handle-order>
      <h4 v-else>Order is completed</h4>
      <div v-for="(item, i) in order" :key="i">
        <!-- Loop over each order's items to display their name. -->
        <h2>{{ item[`name`] }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import RestaurantHandleOrder from "@/components/RestaurantHandleOrder.vue";
export default {
  components: {
    RestaurantHandleOrder,
  },
  data() {
    return {
      orders: undefined,
      message: undefined,
    };
  },
  methods: {
    sort_orders: function (unsorted_orders) {
      //Sort orders according to order id to display on page
      let sorted_orders = [];
      let order_ids = [];
      for (let i = 0; i < unsorted_orders.length; i++) {
        let index = order_ids.findIndex((order_id) => {
          return order_id === unsorted_orders[i][`order_id`];
        });
        if (index !== -1) {
          sorted_orders[index].push(unsorted_orders[i]);
        } else {
          sorted_orders.push([unsorted_orders[i]]);
          order_ids.push(unsorted_orders[i][`order_id`]);
        }
      }
      this.orders = sorted_orders;
      //Give the user a message if there are no orders
      if (this.orders === undefined || this.orders.length < 1) {
        this.message = `Orders list is empty`;
      } else {
        this.message = undefined;
      }
    },
    get_orders: function () {
      //Get orders from the API
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant-order`,
          headers: {
            token: cookies.get(`token`),
          },
        })
        .then((res) => {
          this.sort_orders(res[`data`]);
        })
        .catch(() => {
          this.message = `An error occured. Please try again`;
        });
    },
  },
  mounted() {
    this.get_orders();
    //Listen to an event, and reload the orders when triggered
    this.$root.$on(`order_status_changed`, this.get_orders);
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
.order_container {
  margin: 12px 0;
  row-gap: 12px;
}
.single_order {
  border: 1px solid black;
}
</style>