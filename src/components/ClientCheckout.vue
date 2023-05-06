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
    delete_item: function (i, price) {
      this.menu_items.splice(i, 1);
      this.price_total -= price;
      this.order_items.menu_items.splice(i, 1);
      cookies.set(`order`, this.order_items);

      if (this.menu_items.length < 1) {
        this.order_items = null;
        this.message = `Your order is empty`;
        cookies.remove(`order`);
        this.menu_items = [];
      }
    },
    submit_order: function () {
      axios
        .request({
          url: `https://foodie.bymoen.codes/api/client-order`,
          method: `POST`,
          headers: {
            "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
            token: cookies.get(`token`),
          },
          data: {
            menu_items: this.order_items.menu_items,
            restaurant_id: this.order_items[`restaurant_id`],
          },
        })
        .then((res) => {
          console.log(res);
          this.message = `Thanks for you order!`;
          cookies.remove(`order`);
          this.menu_items = [];
          this.order_items = undefined;
          this.price_total = 0;
        })
        .catch((err) => {
          console.log(err);
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
    this.order_items = cookies.get(`order`);
    if (
      this.order_items === null ||
      this.order_items[`menu_items`].length < 1
    ) {
      this.order_items = null;
      this.message = `Your order is empty`;
    } else {
      axios
        .request({
          url: `https://foodie.bymoen.codes/api/menu`,
          headers: {
            "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
          },
          params: {
            restaurant_id: this.order_items[`restaurant_id`],
          },
        })
        .then((res) => {
          let all_items = res[`data`];
          for (let i = 0; i < this.order_items.menu_items.length; i++) {
            for (let y = 0; y < all_items.length; y++) {
              if (all_items[y].id === Number(this.order_items.menu_items[i])) {
                this.menu_items.push(all_items[y]);
                this.price_total =
                  this.price_total + Number(all_items[y][`price`]);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.message = `Your order is empty`;
        });
    }
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
