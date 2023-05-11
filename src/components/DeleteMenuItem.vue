<template>
  <div>
    <button @click="delete_item">DELETE ITEM</button>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      message: undefined,
    };
  },
  props: {
    item_id: Number,
  },
  methods: {
    delete_item: function () {
      this.message = undefined;
      //Get the item's id from the props, and send it in the API call
      axios
        .request({
          url: `https://foodie.bymoen.codes/api/menu`,
          method: `DELETE`,
          headers: {
            "x-api-key": `9uOwrHiuKE6VUs8CIbJo`,
            token: cookies.get(`token`),
          },
          data: {
            menu_id: this.item_id,
          },
        })
        .then(() => {
          //If the update is successfull, emit this event that will reload from the API and reflect the change
          this.$root.$emit(`delete_menu_item`);
        })
        .catch(() => {
          this.message = "An error occured, try again.";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>