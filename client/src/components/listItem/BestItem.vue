<template>
  <div>
    <div v-if="isAdmin" id="bestitem">
      <div id="cover_item" v-for="item in fetchItem" :key="item._id">
        <div @click="showModalAdmin(item._id)" id="item">
          <img :src="item.image" alt="bestitem1" width="100px" height="100px" />
        </div>
        <p @click="showModalAdmin(item._id)" id="itemName">{{ item.name }}</p>
        <p @click="showModalAdmin(item._id)" id="itemRps" style="color: red;">
          <img src="../../assets/images/rps.gif" alt="rps" />
          {{ item.rps }}
        </p>
        <!-- <p style="color: blue;">stock: {{ item.stock }}</p> -->
      </div>
    </div>
    <!--modalAdmin-->
    <b-modal v-if="isAdmin" ref="my-modal-admin" hide-footer title="Hello Admin">
      <div class="d-block text-center">
        <h3>Edit Or Delete Item Mall</h3>
      </div>
      <!--detailitem-->
      <div v-if="show" id="cover_item" style="display:flex; flex-direction:row;">
        <div id="item">
          <img :src="getDetailItem.image" alt="bestitem" width="100px" height="100px" />
        </div>
        <p id="itemName" style="margin-left:30px;">{{ getDetailItem.name }}</p>
        <p id="itemRps" style="color: red; margin-left:30px;">
          <img src="../../assets/images/rps.gif" alt="rps" />
          {{getDetailItem.rps}}
        </p>
        <p style="color: blue; margin-left:30px;">stock: {{getDetailItem.stock}}</p>
      </div>
      <!--enddetail-->
      <b-button
        @click="showModalAdminEdit({id:getDetailItem._id,name:getDetailItem.name})"
        class="mt-3"
        block
        variant="dark"
      >Edit Item</b-button>
      <b-button
        @click="deleteItem({id:getDetailItem._id,name:getDetailItem.name})"
        class="mt-3"
        block
        variant="warning"
      >Delete Item</b-button>
      <b-button class="mt-3" variant="danger" block @click="hideModalAdmin">Close Me</b-button>
    </b-modal>
    <!--emdmodalaDMIN-->
    <!--modalEditAdmin-->
    <b-modal v-if="isAdmin" ref="my-modal-admin-edit" hide-footer title="Hello Admin">
      <div class="d-block text-center">
        <h3>Form Edit Item</h3>
      </div>
      <b-form @submit.prevent="onEdit(getDetailItem._id)" v-if="show">
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
        <b-button class="mt-3" type="submit" variant="success" block>Edit Item</b-button>
      </b-form>
      <b-button class="mt-3" variant="danger" block @click="hideModalAdminEdit">Close Me</b-button>
    </b-modal>
    <!--endmodaleditadmin-->
    <!--customer-->
    <div v-if="!isAdmin" id="bestitem">
      <div id="cover_item" v-for="item in fetchItem" :key="item._id">
        <div @click="showModal(item._id)" id="item">
          <img :src="item.image" alt="bestitem1" width="100px" height="100px" />
        </div>
        <p @click="showModal(item._id)" id="itemName">{{ item.name }}</p>
        <p @click="showModal(item._id)" id="itemRps" style="color: red;">
          <img src="../../assets/images/rps.gif" alt="rps" />
          {{ item.rps }}
        </p>
        <!-- <p style="color: blue;">stock: {{ item.stock }}</p> -->
      </div>
      <!--modal-->
      <b-modal v-if="!isAdmin" ref="my-modal" hide-footer title="Hello Seal Lovers">
        <div class="d-block text-center">
          <h3>Add Item To Cart</h3>
        </div>
        <b-form @submit.prevent="addToCart(getDetailItem._id)" v-if="show">
          <!--detailitem-->
          <div id="cover_item" style="display:flex; flex-direction:row;">
            <div id="item">
              <img :src="getDetailItem.image" alt="bestitem" width="100px" height="100px" />
            </div>
            <p id="itemName" style="margin-left:30px;">{{ getDetailItem.name }}</p>
            <p id="itemRps" style="color: red; margin-left:30px;">
              <img src="../../assets/images/rps.gif" alt="rps" />
              {{getDetailItem.rps}}
            </p>
            <!-- <p style="color: blue; margin-left:30px;">stock: {{getDetailItem.stock}}</p> -->
          </div>
          <!--enddetail-->
          <b-form-group id="input-group-2" label="Buy Qty:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="qtyBuy"
              required
              placeholder="How Many You Want to Buy"
            ></b-form-input>
          </b-form-group>
          <b-button class="mt-3" type="submit" block variant="primary">Add To Cart</b-button>
        </b-form>
        <b-button class="mt-3" variant="danger" block @click="hideModal">Close Me</b-button>
      </b-modal>
      <!--emdmodal-->
    </div>
  </div>
</template>

<script>
export default {
  name: "bestitem",
  data() {
    return {
      form: {
        name: "",
        stock: 0,
        category: null,
        rps: 0,
        image: null
      },
      categorys: [{ text: "Select One", value: null }, "bestitem", "newitem"],
      show: false,
      detailItem: null,
      qtyBuy: null,
      isAdmin: localStorage.getItem("role") === "admin" ? true : false
    };
  },
  methods: {
    onEdit(id) {
      let fd = new FormData();
      let category = "fetchBestItem";
      fd.append("name", this.form.name);
      fd.append("stock", this.form.stock);
      fd.append("category", this.form.category);
      fd.append("rps", this.form.rps);
      fd.append("image", this.form.image);
      this.$store.dispatch("editItem", { fd, id, category });
      // this.$store.dispatch("fetchBestItem");
      this.form.name = "";
      this.form.stock = 0;
      this.form.category = null;
      this.form.rps = 0;
      this.form.image = null;
      this.hideModalAdminEdit();
      this.hideModalAdmin();
      this.$snotify.success(`Success update Item Mall`, {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: "leftTop"
      });
    },
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
              this.$store.dispatch("deleteItem", item.id);
              this.$store.dispatch("fetchBestItem");
              this.hideModalAdmin();
              this.$snotify.remove(toast.id);
              this.$snotify.success(
                `Success Delete ${item.name} from Item Mall`,
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
              this.$snotify.info(
                `Cancel Delete ${item.name} from your Item Mall`,
                {
                  timeout: 3000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: "leftTop"
                }
              );
              this.$snotify.remove(toast.id);
            }
          },
          {
            text: "Close",
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: true
          }
        ]
      });
    },
    showModalAdminEdit(id) {
      this.$refs["my-modal-admin-edit"].show();
      this.$store.dispatch("getDetailItem", id);
      this.form.name = this.getDetailItem.name;
      this.form.stock = this.getDetailItem.stock;
      this.form.category = this.getDetailItem.category;
      this.form.rps = this.getDetailItem.rps;
      this.form.image = this.getDetailItem.image;
      this.show = true;
    },
    hideModalAdminEdit() {
      this.$refs["my-modal-admin-edit"].hide();
    },
    showModalAdmin(id) {
      this.$refs["my-modal-admin"].show();
      this.$store.dispatch("getDetailItem", id);
      this.show = true;
    },
    hideModalAdmin() {
      this.$refs["my-modal-admin"].hide();
    },
    showModal(id) {
      this.$refs["my-modal"].show();
      this.show = true;
      this.$store.dispatch("getDetailItem", id);
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      this.qtyBuy = null;
    },
    addToCart(idItem) {
      // this.$store.dispatch("getDetailCart");
      let payload = {
        idItem,
        qty: this.qtyBuy,
        totalRps: this.getDetailItem.rps
      };
      this.$store.dispatch("addCart", payload);
      this.hideModal();
      this.qtyBuy = null;
      this.$snotify.info(
        `Success Add Item : ${this.getDetailItem.name}, to Your Cart :)`,
        {
          timeout: 3000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: "leftTop"
        }
      );
    }
  },
  computed: {
    getInfoCart() {
      return this.$store.state.cartNow;
    },
    getDetailItem() {
      return this.$store.state.detailItem;
    },
    fetchItem() {
      return this.$store.state.bestItem;
    }
  },
  created() {
    this.$store.dispatch("fetchBestItem");
  }
};
</script>

<style scoped>
#bestitem {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
#item {
  padding: 8px 8px;
  background-color: #b2afaf;
}
#item:hover {
  cursor: pointer;
}
#itemName:hover {
  cursor: pointer;
  color: yellowgreen;
}
#itemRps:hover {
  cursor: pointer;
  color: yellow;
}
#cover_item {
  display: flex;
  flex-direction: column;
  max-width: 116px;
}
</style>
