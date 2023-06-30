<template>
  <div class="restaurant_container">
    <article
      class="restaurant_card"
      v-for="restaurant in restaurants"
      :key="restaurant[`id`]"
      @click="() => click_menu(restaurant[`id`], restaurant[`name`])"
    >
      <img :src="restaurant[`profile_url`]" />
      <h2>{{ restaurant[`name`] }}</h2>
      <h2>{{ message }}</h2>
    </article>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    get_restaurants: function () {
      //Get all restaurants from API and display them on the page
      this.message = undefined;
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurants`,
        })
        .then((res) => {
          this.restaurants = res[`data`];
        })
        .catch(() => {
          this.message = `An error occured. Try again.`;
        });
    },
    click_menu: function (restaurant_id, restaurant_name) {
      // Get the restaurant id and restaurant name from the menu that was clicked and send them as parameters in the url. This way, the restaurant view menu component can get these information in the URL. The router also expects those parameters to send the user to the right place.
      this.$router.push(`/menu/${restaurant_id}/${restaurant_name}`);
    },
  },
  data() {
    return {
      restaurants: undefined,
      message: undefined,
    };
  },
  mounted() {
    this.get_restaurants();
  },
};
</script>

<style lang="scss" scoped>
.restaurant_container {
  display: grid;
  row-gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.restaurant_card {
  display: grid;
  text-align: center;

  > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
}
</style>