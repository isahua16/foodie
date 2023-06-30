<template>
  <div>
    <single-menu-item
      v-for="item in menu_items"
      :key="item[`menu_id`]"
      :item="item"
    ></single-menu-item>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import SingleMenuItem from "@/components/SingleMenuItem.vue";

export default {
  methods: {
    get_all_items: function () {
      //On mounted, get all the restaurant's menu items, store them in a variable and display them on the page
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/menu`,
          params: {
            restaurant_id: cookies.get(`restaurant_id`),
          },
        })
        .then((res) => {
          this.menu_items = res[`data`];
        })
        .catch(() => {
          this.message = `An error occured. Try again.`;
        });
    },
  },
  components: {
    SingleMenuItem,
  },
  data() {
    return {
      menu_items: undefined,
      message: undefined,
    };
  },
  mounted() {
    this.get_all_items();
    //Listen for events and reload the menu items when it occurs
    this.$root.$on(`new_menu_item`, this.get_all_items);
    this.$root.$on(`delete_menu_item`, this.get_all_items);
  },
};
</script>

<style lang="scss" scoped>
</style>