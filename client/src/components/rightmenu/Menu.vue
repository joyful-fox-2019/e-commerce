<template>
  <div class="rightMenu">
    <div class="itemTitle">Item Mall</div>
    <div v-if="isAdmin" class="item">
      <p @click="showModal">Add Item</p>
    </div>
    <div class="item">
      <p>Check Out</p>
    </div>
    <!--modal-->
    <b-modal ref="my-modal" hide-footer title="Hello Admin">
      <div class="d-block text-center">
        <h3>Add New Item</h3>
      </div>
      <b-form @submit.prevent="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Item Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Stock:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.stock" required placeholder="Enter Stock"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Category:" label-for="input-3">
          <b-form-select
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="form.category"
            :options="{ 'bestitem' : 'bestitem', 'newitem' : 'newitem' }"
            id="inline-form-custom-select-pref"
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4" label="Rps:" label-for="input-4">
          <b-form-input id="input-4" v-model="form.rps" required placeholder="Enter Rps"></b-form-input>
        </b-form-group>

        <b-form-file v-model="form.image" class="mt-3" plain></b-form-file>
        <div class="mt-3">Selected file: {{ image ? image.name : '' }}</div>
        <b-button class="mt-3" type="submit" block variant="outline-primary">Submit</b-button>
      </b-form>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000";
export default {
  name: "rightmenu",
  data() {
    return {
      show: false,
      form: {
        name: "",
        stock: 0,
        category: null,
        rps: 0,
        image: null
      },
      isAdmin: localStorage.getItem("role") === "admin" ? true : false
    };
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
      this.show = true;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    onSubmit() {
      let fd = new FormData();
      fd.append("name", this.form.name);
      fd.append("stock", this.form.stock);
      fd.append("category", this.form.category);
      fd.append("rps", this.form.rps);
      fd.append("image", this.form.image);
      console.log(fd);
      axios({
        url: baseUrl + "/items",
        method: "POST",
        data: fd,
        headers: {
          token: localStorage.getItem("token"),
          role: localStorage.getItem("role")
        }
      })
        .then(respone => {
          this.$store.dispatch("fetchNewItem");
          this.$store.dispatch("fetchBestItem");
          this.hideModal();
          this.form.name = "";
          this.form.stock = 0;
          this.form.category = "";
          this.form.rps = 0;
          this.form.image = null;
          this.$snotify.success(`Success Add New Item`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          this.$snotify.danger(`Failed Add New Item`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:500&display=swap");
.rightMenu {
  font-family: "Roboto", sans-serif;
  margin-top: 30px;
  width: 280px;
  display: flex;
  flex-direction: column;
  font-size: 25px;
}
.itemTitle {
  background: rgb(0, 97, 210);
  background: linear-gradient(
    90deg,
    rgba(0, 97, 210, 0.5844712885154062) 100%,
    rgba(238, 174, 202, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 100px;
  color: white;
}
.item {
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.item p:hover {
  color: green;
  text-decoration: none;
  cursor: pointer;
}
</style>