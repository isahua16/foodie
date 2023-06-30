<template>
  <div class="order_container">
    <h3>{{ message }}</h3>
    <div class="single_order" v-for="(order, i) in orders" :key="i">
      <p>Order: #{{ order[0][`order_id`] }}</p>
      <h4 v-if="order[0][`is_confirmed`] == 1 && order[0][`is_complete`] == 0">
        In Progess
      </h4>
      <h4 v-else-if="order[0][`is_complete`] == 1">Order Completed</h4>
      <h4 v-else>Awaiting Confirmation</h4>
      <div v-for="(item, i) in order" :key="i">
        <h2>{{ item[`name`] }}</h2>
        <h4>${{ item[`price`] }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      orders: undefined,
      message: undefined,
    };
  },
  mounted() {
    this.get_orders();
  },
  methods: {
    sort_orders: function (unsorted_orders) {
      //Sort orders according to matching order_ids to display on the page
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
      //get the orders from the api
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client-order`,
          headers: {
            token: cookies.get(`token`),
          },
        })
        .then((res) => {
          this.sort_orders(res[`data`]);
        })
        .catch(() => {
          this.message = `An error has occured, try again`;
        });
    },
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
