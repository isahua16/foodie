<template>
  <div>
    <button @click="handle_order_click">Add to order</button>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  mounted() {
    this.get_order();
  },
  data() {
    return {
      order: undefined,
      message: undefined,
    };
  },
  props: {
    menu_id: Number,
    restaurant_id: String,
  },
  methods: {
    get_order: function () {
      //If there is an order in progress, store it in a variable from the cookie jar
      if (cookies.get(`order`) !== null) {
        this.order = cookies.get(`order`);
      } else {
        //Otherwise, create a new object that container two value pairs. (1) restaurant_id and give it a value of the restaurant_id from the url, and (2) menu_items which is an empty array.
        this.order = {};
        this.order[`restaurant_id`] = this.restaurant_id;
        this.order[`menu_items`] = [];
      }
    },
    handle_order_click: function () {
      //When user clicks an item to add to their cart, check to see if the current restaurant's id matches the one contained in the order object. If it does, push the item's menu_id from the props onto the menu_items array and set the order as a cookie
      this.message = undefined;
      if (this.restaurant_id == this.order[`restaurant_id`]) {
        this.order[`menu_items`].push(this.menu_id);
        cookies.set(`order`, this.order);
        this.message = `Item added to checkout`;
      } else {
        //Otherwise, tell the user that they cannot order from two different restaurants at once.
        this.message = `One restaurant order at a time only`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>