<template>
  <div class="rightMenu">
    <div @click="goItemMall" class="itemTitle">Item Mall</div>
    <div class="userTitle">InGame: "-{{$store.state.userNow}}-"</div>
    <div class="rpsTitle">
      <img src="../../assets/images/rps.gif" alt="rps" />
      {{$store.state.rpsNow}}
    </div>
    <div v-if="isAdmin" class="item">
      <p @click="showModal">Add Item</p>
    </div>
    <div v-if="!isAdmin" @click="showCart" class="item">
      <p>List Item In Cart</p>
    </div>
    <!--modal create-->
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
            aria-placeholder="select one"
            v-model="form.category"
            :options="categorys"
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
    <!--endmodalcreate-->
    <!--modal cart-->
    <b-modal ref="my-cart" hide-footer title="Hello Seal Lovers">
      <div class="d-block text-center">
        <h3>Detail List Item In Cart</h3>
      </div>
      <hr />
      <!--detailitem-->
      <div id="cover_item" v-for="item in listCart.detailCart" :key="item._id">
        <div id="item">
          <img :src="item.itemId.image" alt="bestitem1" width="100px" height="100px" />
        </div>
        <p id="itemName">{{ item.itemId.name }}</p>
        <p id="itemRps" style="color: red;">
          <img src="../../assets/images/rps.gif" alt="rps" />
          {{item.itemId.rps}}
        </p>
        <p style="color: blue;">qty: {{item.count}}</p>
        <b-button
          @click="deleteItem({id:item.itemId._id,name:item.itemId.name})"
          class="mt-3"
          variant="warning"
        >Delete From Cart</b-button>
        <hr />
      </div>
      <!--enddetail-->

      <b-button
        @click="checkOut"
        id="btn-checkout"
        class="mt-3"
        type="submit"
        block
        variant="success"
      >CheckOut Now : {{listCart.totalRpsCart}} rps</b-button>

      <b-button class="mt-3" variant="danger" block @click="hideModalCart">Close Me</b-button>
    </b-modal>
    <!--endmodalcart-->
    <!--modalCartZonk-->
    <b-modal ref="my-cart-zonk" hide-footer title="Hello Seal Lovers">
      <div class="d-block text-center">
        <h3>Oppsss...</h3>
      </div>
      <hr />
      <!--detailitem-->
      <div id="cover_item" style="display: flex; justify-content:center;">
        <p>
          Go Buy Some Item First :), click
          <span>
            <u style="color:red;">Here</u>
          </span>
        </p>
      </div>
      <!--enddetail-->
      <b-button class="mt-3" variant="danger" block @click="hideModalCart">Close Me</b-button>
    </b-modal>
    <!--modalCartZonk-->
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
      categorys: [{ text: "Select One", value: null }, "bestitem", "newitem"],
      isAdmin: localStorage.getItem("role") === "admin" ? true : false,
      showDetailCart: false
    };
  },
  methods: {
    deleteItem(item) {
      this.$snotify.confirm(`item: ${item.name}`, `Want Delete This?`, {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        buttons: [
          {
            text: "Yes",
            action: toast => {
              this.$store.dispatch("deleteItemInCart", item.id);
              // this.$store.dispatch("getDetailCart");
              this.$snotify.remove(toast.id);
              this.$snotify.success(
                `Success Delete ${item.name} from your cart`,
                {
                  timeout: 3000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: "leftTop"
                }
              );
            },
            bold: false
          },
          {
            text: "No",
            action: toast => {
              this.$snotify.info(`Cancel Delete ${item.name} from your cart`, {
                timeout: 3000,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                position: "leftTop"
              });
              this.$snotify.remove(toast.id);
            }
          },
          {
            text: "Close",
            action: toast => {
              console.log("Clicked: No");
              this.$snotify.remove(toast.id);
            },
            bold: true
          }
        ]
      });
    },
    showCart() {
      this.$store.dispatch("getDetailCart");
      // if (this.listCart.detailCart.length === 0) {
      // this.$refs["my-cart-zonk"].show();
      // this.showDetailCart = false;
      // } else {
      this.$refs["my-cart"].show();
      this.showDetailCart = true;
      // }
    },
    hideModalCart() {
      // this.$store.dispatch("getDetailCart");
      // if (this.listCart.detailCart.length == 0) {
      // this.$refs["my-cart-zonk"].hide();
      // } else {
      this.$refs["my-cart"].hide();
      // }
    },
    checkOut() {
      let rpsUser = 0;
      this.$store.dispatch("clearCart");
      this.$store
        .dispatch("checkOut")
        .then(() => {
          rpsUser = Number(this.fetchRps);
          return this.$store.dispatch("getDetailCart");
        })
        .then(() => {
          if (rpsUser < this.listCart.totalRpsCart) {
            this.$snotify.warning(
              `Your RPS: ${rpsUser} Less Then Total Payment RPS : ${this.listCart.totalRpsCart}`,
              {
                timeout: 5000,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                position: "leftTop"
              }
            );
            setTimeout(() => {
              this.$snotify.info(
                `Go Buy Some RPS in Menu Add RPS, OR Go Delete Some Item in Your List Cart :)`,
                {
                  timeout: 5000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: "leftTop"
                }
              );
            }, 3000);
          } else {
            return axios({
              url: baseUrl + `/users/addrps/${localStorage.getItem("email")}`,
              method: "PATCH",
              data: {
                rps: Number(rpsUser) - Number(this.listCart.totalRpsCart)
              }
            });
          }
        })
        .then(({ data }) => {
          this.$store.dispatch("addRps");
          this.hideModalCart();
          // console.log(this.listCart.detailCart);
          this.$snotify.success(
            `Thank's, For Buying Item's, Your Rps Now ${data.rps}`,
            {
              timeout: 3000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: "leftTop"
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    showModal() {
      this.$refs["my-modal"].show();
      this.show = true;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      this.form.name = "";
      this.form.stock = 0;
      this.form.category = null;
      this.form.rps = 0;
      this.image = null;
    },
    onSubmit() {
      let fd = new FormData();
      fd.append("name", this.form.name);
      fd.append("stock", this.form.stock);
      fd.append("category", this.form.category);
      fd.append("rps", this.form.rps);
      fd.append("image", this.form.image);
      // console.log(fd);
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
    },
    goItemMall() {
      this.$store.state.page = "itemmall";
      this.$store.state.title = "Item Mall";
      this.$router.push("/home/itemmall/bestitem");
    }
  },
  computed: {
    listCart() {
      let totalRpsCart = 0;
      this.$store.state.detailCart.forEach(item => {
        totalRpsCart += item.totalRps;
      });
      return { detailCart: this.$store.state.detailCart, totalRpsCart };
    },
    fetchRps() {
      return this.$store.state.rpsNow;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:500&display=swap");
#btn-checkout:hover {
  color: red;
}
.rightMenu {
  font-family: "Roboto", sans-serif;
  margin-top: 30px;
  width: 280px;
  display: flex;
  flex-direction: column;
  font-size: 25px;
}
.userTitle {
  background: #bdc3c7; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c3e50,
    #bdc3c7
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c3e50,
    #bdc3c7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 100px;
  color: white;
}
.rpsTitle {
  background: rgb(244, 46, 132);
  background: linear-gradient(
    90deg,
    rgba(244, 46, 132, 1) 0%,
    rgba(0, 97, 210, 0.5844712885154062) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 100px;
  color: white;
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
  cursor: pointer;
}
.itemTitle:hover {
  color: yellow;
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