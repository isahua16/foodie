<template>
  <div>
    <h1>{{restaurant_name}} menu</h1>
    <h3>{{message}}</h3>
    <section v-for="menu in menus" :key="menu[`id`]">
      <img :src="menu[`image_url`]" />
      <h1>{{menu[`name`]}}</h1>
      <p>{{menu[`description`]}}</p>
      <h3>${{menu[`price`]}}</h3>
      <order-button v-if="client_id !== null" :menu_id="menu[`id`]" :restaurant_id="restaurant_id"></order-button>
    </section>
  </div>
</template>

<script>
import OrderButton from '@/components/OrderButton.vue'
import axios from "axios";
import cookies from "vue-cookies";
export default {
  components: {
    OrderButton
  },
  methods: {
    get_menu_items: function(){
        this.client_id = cookies.get(`client_id`);
        this.restaurant_id = this.$route.params.id;
        this.restaurant_name = this.$route.params.name;
        axios.request({
            url: `https://foodie.bymoen.codes/api/menu`,
            headers: {
              "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
            },
            params: {
              restaurant_id: this.restaurant_id,
            },
          }).then((res) => {
            this.message = undefined;
            this.menus = res[`data`];
          }).catch(() => {
            this.message = `An error occured. Try again`;
          });
    }
  },
  data() {
    return {
      restaurant_id: undefined,
      restaurant_name: undefined,
      menus: undefined,
      message: undefined,
      client_id: undefined,
    };
  },
  mounted() {
    this.get_menu_items();
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
  text-align: center;
}
section {
  display: grid;
  place-items: center;
  > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
}
</style>
