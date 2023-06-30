<template>
  <div>
    <h3>{{ message }}</h3>
    <h2>Add Menu Items</h2>
    <input placeholder="Name" type="text" ref="name_input" />
    <input placeholder="Description" type="text" ref="description_input" />
    <input placeholder="Image Url" type="text" ref="image_url_input" />
    <input placeholder="Price" type="number" ref="price_input" />
    <button @click="handle_add_menu">Submit</button>
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
  methods: {
    handle_add_menu: function () {
      //Check to see if all the fields are properly filled
      if (
        this.$refs[`description_input`].value === `` ||
        this.$refs[`image_url_input`].value === `` ||
        this.$refs[`name_input`].value === `` ||
        this.$refs[`name_input`].value === ``
      ) {
        this.message = `Please fill in all fields`;
      } else {
        this.message = undefined;
        //Otherwise, create an object to send along the API call with the input values
        let new_item = {
          description: this.$refs[`description_input`].value,
          image_url: this.$refs[`image_url_input`].value,
          name: this.$refs[`name_input`].value,
          price: this.$refs[`price_input`].value,
        };
        axios
          .request({
            url: `${process.env.VUE_APP_BASE_DOMAIN}/api/menu`,
            method: `POST`,
            headers: {
              token: cookies.get(`token`),
            },
            data: new_item,
          })
          .then(() => {
            //Reload the menu items on the page by emitting an event to sibling component
            this.$root.$emit(`new_menu_item`);
            //reset input fields
            this.$refs[`description_input`].value = ``;
            this.$refs[`image_url_input`].value = ``;
            this.$refs[`name_input`].value = ``;
            this.$refs[`price_input`].value = ``;
          })
          .catch(() => {
            this.message = `An error occured. Please try again`;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>