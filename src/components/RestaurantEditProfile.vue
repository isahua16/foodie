<template>
  <div class="profile_container">
    <h2>Restaurant Profile</h2>
    <h4>{{ error_message }}</h4>
    <div>
      <img :src="banner_url" class="banner_image" />
      <input placeholder="Change Banner Image" type="text" ref="banner_url" />
      <button field="banner_url" @click="handle_edit">Save</button>
    </div>
    <div>
      <img :src="profile_url" class="profile_image" />
      <input placeholder="Change Profile Image" type="text" ref="profile_url" />
      <button field="profile_url" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>{{ name }}</p>
      <input placeholder="Change Name" type="text" ref="name" />
      <button field="name" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>{{ phone_number }}</p>
      <input placeholder="Change Phone Number" type="text" ref="phone_number" />
      <button field="phone_number" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>{{ email }}</p>
      <input placeholder="Change Email" type="text" ref="email" />
      <button field="email" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>{{ address }}</p>
      <input placeholder="Change Address" type="text" ref="address" />
      <button field="address" @click="handle_edit">Save</button>
    </div>
    <div>
      <p>{{ city }}</p>
      <select name="restaurant_sign_up" ref="city">
        <option value=""></option>
        <option value="Vancouver">Vancouver</option>
        <option value="Calgary">Calgary</option>
        <option value="Toronto">Toronto</option>
      </select>
      <button field="city" @click="handle_edit">Save</button>
    </div>
    <div>
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
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant`,
          params: {
            restaurant_id: JSON.parse(cookies.get(`restaurant_id`)),
          },
        })
        .then((res) => {
          //Store the info inside variables to display in HTML
          this.error_message = undefined;
          this.banner_url = res.data[0].banner_url;
          this.profile_url = res.data[0].profile_url;
          this.name = res.data[0].name;
          this.phone_number = res.data[0].phone_number;
          this.email = res.data[0].email;
          this.address = res.data[0].address;
          this.city = res.data[0].city;
        })
        .catch(() => {
          this.error_message = `An error occured. Try again.`;
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
            url: `${process.env.VUE_APP_BASE_DOMAIN}/api/restaurant`,
            method: `PATCH`,
            headers: {
              token: cookies.get(`token`),
            },
            data: data,
          })
          .then(() => {
            //Update the varariable using the attribute from the button
            this[data_key] = input_value;
            this.error_message = undefined;
          })
          .catch(() => {
            this.error_message = `Updating your info failed. Try again.`;
          });
      } else {
        this.error_message = `Please fill out the field before saving`;
      }
      //Reset the input field to empty
      this.$refs[data_key].value = ``;
    },
  },
  mounted() {
    this.get_profile_data();
  },
  data() {
    return {
      error_message: undefined,
      banner_url: undefined,
      profile_url: undefined,
      name: undefined,
      phone_number: undefined,
      email: undefined,
      address: undefined,
      city: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile_container {
  display: grid;
  place-items: center;
}
.profile_image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.banner_image {
  width: 100%;
  height: 20vh;
  object-fit: cover;
}
div {
  width: 100%;
  display: grid;
  place-items: center;
}
</style>