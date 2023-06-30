<template>
  <div class="profile_container">
    <h4>{{ message }}</h4>
    <h2>My profile</h2>
    <div>
      <img :src="image_url" />
      <input placeholder="Change Image" type="text" ref="image_url" />
      <button field="image_url" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>First Name: {{ first_name }}</p>
      <input placeholder="Change First Name" type="text" ref="first_name" />
      <button field="first_name" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>Last Name: {{ last_name }}</p>
      <input placeholder="Change Last Name" type="text" ref="last_name" />
      <button field="last_name" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>Email: {{ email }}</p>
      <input placeholder="Change Email" type="text" ref="email" />
      <button field="email" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>Password: *******</p>
      <input placeholder="Change Password" type="text" ref="password" />
      <button field="password" @click="handle_edit">Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  methods: {
    get_profile_data: function () {
      //Called on mounted, get the user's profile information and add it to the page
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
          params: {
            client_id: JSON.parse(cookies.get(`client_id`)),
          },
        })
        .then((res) => {
          this.image_url = res.data[0].image_url;
          this.email = res.data[0].email;
          this.first_name = res.data[0].first_name;
          this.last_name = res.data[0].last_name;
        })
        .catch(() => {
          this.message = `An error occured. Try again.`;
        });
    },
    handle_edit: function (event) {
      //Each profile element has an input field and a button that runs this function on click.
      let data_key = event.target.getAttribute(`field`);
      //Get field name from the html
      let input_value = this.$refs[data_key].value;
      //Get the data from the input string
      if (input_value != ``) {
        //If its not an empty string, create an object with a key value pair of the field's name and the value from the field
        let data = {};
        data[data_key] = input_value;
        //Make the patch API call with the above object as the data
        axios
          .request({
            url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client`,
            method: `PATCH`,
            headers: {
              token: cookies.get(`token`),
            },
            data: data,
          })
          .then(() => {
            //Update the varariable using the attribute from the button
            this[data_key] = input_value;
            this.message = undefined;
          })
          .catch(() => {
            this.message = `Updating your info failed. Try again.`;
          });
      } else {
        this.message = `Please fill out the field before saving`;
      }
      //Reset the input field to empty
      this.$refs[data_key].value = ``;
    },
  },
  data() {
    return {
      image_url: undefined,
      email: undefined,
      first_name: undefined,
      last_name: undefined,
      message: undefined,
    };
  },
  mounted() {
    this.get_profile_data();
  },
};
</script>

<style lang="scss" scoped>
.profile_container {
  display: grid;
  place-items: center;
}
div {
  display: grid;
  place-items: center;
  > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: top;
  }
}
</style>