<template>
  <div id="admins">
    <div class="px-5">
      <div class="row">
        <div class="admin-left col-md-2 col-lg-2">
          <br />
        </div>
        <div class="col-8 pl-5">
          <router-link to="/admin/add">
            <button class="btnadmin btn-secondary btn">Add product</button>
          </router-link>
          <br />
          <br />
          <router-view v-on:geteditpage="geteditpage"></router-view>
          <br />
          <br />
          <div class="table-responsive">
            <table id="listprod" class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in this.$store.state.products" :key="index">
                  <th scope="row">{{index + 1}}</th>
                  <td>{{item.name}}</td>
                  <td>{{truncate(item.description)}}</td>
                  <td>
                    <img style="max-width:8vh;" :src="item.image" />
                  </td>
                  <td>{{item.stock}}</td>
                  <td>{{item.category.name}}</td>
                  <td>{{item.price}}</td>
                  <td>
                    <button
                      @click.prevent="updateProduct(item._id)"
                      class="btnaction btn mx-1 my-1"
                    >Edit</button>
                    <button
                      @click.prevent="deleteProduct(item._id)"
                      class="btnaction btn mx-1 my-1"
                    >Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <addProduct></addProduct>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "AdminDashboard",
  props: ["productList"],
  components: {},
  data() {
    return {
      currentProduct: {},
      panel: true,
      adprod: false,
      statLogin: false,
      statAdmin: true
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.statLogin = true;
    } else {
      this.statLogin = false;
    }
    if (localStorage.getItem("isAdmin") === false) {
      Swal.fire("Not Authorized", "You cant enter here", "error");
      this.$router.push("/");
    } else {
      this.statAdmin = true;
      this.fetchListProduct();
    }
  },
  methods: {
    truncate(content) {
      if (content.length > 55) {
        return content.substring(0, 55).concat("...");
      } else {
        return content;
      }
    },
    deleteProduct(id) {
      let payload = id;
      this.$store
        .dispatch("deleteProduct", payload)
        .then(data => {
          Swal.fire(
            `${data.name} has been deleted`,
            "You may proceed",
            "success"
          );
          this.$router.push("/admin");
          this.$store.dispatch("fetchProducts").then(data => {
            this.$router.push("/admin");
          });
          this.$emit("successdelete");
        })
        .catch(err => {
          Swal.fire(`Something went wrong`, "Please reload", "error");
        });
    },

    updateProduct(id) {
      this.$store
        .dispatch("setUpdateData", id)
        .then(data => {
          this.$store.dispatch("fetchProducts");
          Swal.fire(
            `${data.name} has been updated`,
            "You may proceed",
            "success"
          );
        })
        .catch(err => {
          Swal.fire(`Something went wrong`, "Please reload", "error");
        });
    },
    adprodd() {
      this.adprodd = true;
    },
    fetchListProduct() {
      this.$store.dispatch("fetchProducts").then(data => {});
    },
    togglePanel() {
      this.panel = true;
    },
    geteditpage(id) {
      this.axios
        .get(`/products/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.currentProduct = data;
          this.$router.push(`/admin/edit/${id}`);
        })
        .catch(err => {
          Swal.fire(`Something is wrong`, "Please reload", "error");
        });
    }
  },
  watch: {
    $route() {
      if (this.$route.path.username == "admin") {
        this.panel = false;
        this.fetchListProduct();
      }
    }
  },
  computed: {
    getstat() {
      if (localStorage.getItem("token")) {
        this.statLogin = true;
      } else {
        this.statLogin = false;
      }
      if (localStorage.getItem("isAdmin") === false) {
        Swal.fire("Not Authorized", "You cant enter here", "error");
        this.$router.push("/");
      } else {
        this.statAdmin = true;
        this.fetchListProduct();
      }
    }
  }
};
</script>

<style>
.container {
  width: 100%;
}
.tableadmin {
  border: 1px solid !important;
}
.table tr,
.table td,
.table th {
  border: 0 !important;
}
.table tr td:nth-child(2),
.btnadmin {
  background-color: transparent;
  font-size: 12px;
  width: 125px;
  display: inline-block;
  color: black;
  border-radius: 22px;
  letter-spacing: 0.18em;
  border-style: 1px solid rgb(233, 233, 233) !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0.5em;
}

.btnadmin:hover {
  background-color: rgb(230, 230, 230);

  opacity: 0.6;
}

.adminbtn {
  margin: 2px;
  display: inline-block;
  width: 130px;
  font-size: 16px;
  color: grey;
  border-style: 1px solid grey !important;
  border-radius: 22px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.adminbtn:hover {
  opacity: 0.6;
}

.admintitletbltxt {
  height: 2rem;
  font-weight: 600;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.admintabletxt {
  text-decoration: none;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
}

.admintabletxt:before {
  width: 60px;
  position: absolute;
  bottom: 0;
  right: 350px;
}

.admin-left {
  border-right: 1px solid grey;
}
#listprod {
  font-size: 13px;
}

.btnaction {
  border-style: 1px solid black !important;
  margin: 2px;
  display: inline-block;
  width: 130px;
  font-size: 12px;
  color: darkgrey;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.btnaction:hover {
  opacity: 0.6;
}
</style>

