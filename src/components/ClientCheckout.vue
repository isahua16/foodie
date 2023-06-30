<template>
  <div>
    <h2>{{ message }}</h2>
    <div v-for="(item, i) in menu_items" :key="i">
      <img :src="item[`image_url`]" />
      <h3>{{ item[`name`] }}</h3>
      <h3>${{ item[`price`] }}</h3>
      <button @click="() => delete_item(i, item[`price`])">remove</button>
    </div>
    <h2>Total: ${{ price_total }}</h2>
    <button v-if="order_items !== null" @click="submit_order">
      Confirm Order
    </button>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";

export default {
  methods: {
    get_order: function () {
      this.order_items = cookies.get(`order`);
      //Display a message if order is empty. We check if the order_items is null first, and then check its length to avoid checking the length on undefined
      if (
        this.order_items === null ||
        this.order_items[`menu_items`].length < 1
      ) {
        //Set the order_items to null in the case where order_items array is empty
        this.order_items = null;
        this.message = `Your order is empty`;
      } else {
        //Get all current order's restaurant menu items from the API in order to display the current orders total price
        axios
          .request({
            url: `${process.env.VUE_APP_BASE_DOMAIN}/api/menu`,
            params: {
              restaurant_id: this.order_items[`restaurant_id`],
            },
          })
          .then((res) => {
            let all_items = res[`data`];
            for (let i = 0; i < this.order_items.menu_items.length; i++) {
              //For each menu items in the order
              for (let y = 0; y < all_items.length; y++) {
                //compare them to all the restaurant's menu items
                if (
                  all_items[y].id === Number(this.order_items.menu_items[i])
                ) {
                  //if the restaurant's menu item's id matches the current menu_item's id, push that item onto an array. This array is used to display the items on the page
                  this.menu_items.push(all_items[y]);
                  //Update the total price of the order
                  this.price_total =
                    this.price_total + Number(all_items[y][`price`]);
                }
              }
            }
          })
          .catch(() => {
            this.message = `An error occured. Try again`;
          });
      }
    },
    delete_item: function (i, price) {
      //This function receives the index and price of the menu_item from the html
      this.menu_items.splice(i, 1);
      //Splice the menu items at the index
      this.price_total -= price;
      //subtract the price from the total price
      this.order_items.menu_items.splice(i, 1);
      //Splice the order's menu_items as well so they stay the same
      cookies.set(`order`, this.order_items);
      //Reset the cookie containing the updated order
      if (this.menu_items.length < 1) {
        //If the menu_items array that is used to display on the page is ever empty, set the order cookie to null, delete the cookie, reset the menu_items array and give the user a message
        this.order_items = null;
        this.message = `Your order is empty`;
        cookies.remove(`order`);
        this.menu_items = [];
      }
    },
    submit_order: function () {
      //On click, send the order's contents as data to the api
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client-order`,
          method: `POST`,
          headers: {
            token: cookies.get(`token`),
          },
          data: {
            menu_items: this.order_items.menu_items,
            restaurant_id: this.order_items[`restaurant_id`],
          },
        })
        .then(() => {
          //On success, give the user a message and reset the order
          this.message = `Thanks for you order!`;
          cookies.remove(`order`);
          this.menu_items = [];
          this.order_items = undefined;
          this.price_total = 0;
        })
        .catch(() => {
          this.message = `An error occured. Try again.`;
        });
    },
  },
  data() {
    return {
      order_items: undefined,
      message: undefined,
      menu_items: [],
      price_total: 0,
    };
  },
  mounted() {
    this.get_order();
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  text-align: center;
}
img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>
