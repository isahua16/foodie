<template>
  <div class="order_container">
    <h3>{{message}}</h3>
    <div class="single_order" v-for="(order, i) in orders" :key="i">
        <p>Order: #{{ order[`order_id`]}}</p>
        <h2>{{ order[`name`] }}</h2>
        <h4>${{ order[`price`] }}</h4>
        <h4 v-if="order[`is_confirmed`] == 1 && order[`is_complete`] == 0 ">In Progess</h4>
        <h4 v-else-if="order[`is_complete`] == 1">Order Completed</h4>
        <h4 v-else>Awaiting Confirmation</h4>
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
    get_orders: function () {
      axios.request(
          {
            url: `https://foodie.bymoen.codes/api/client-order`,
            headers: {
              "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
              token: cookies.get(`token`),
            },
          }).then((res) => {
          this.orders = res[`data`];
          if(this.orders === undefined || this.orders.length < 1) {
            this.message = `Orders list is empty`
          } else {
            this.message = undefined;
          }
        }).catch(() => {
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
