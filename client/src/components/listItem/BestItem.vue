<template>
  <div id="bestitem">
    <div id="cover_item" v-for="item in fetchItem" :key="item._id">
      <div @click="showModal(item._id)" id="item">
        <img :src="item.image" alt="bestitem1" width="100px" height="100px" />
      </div>
      <p @click="showModal(item._id)" id="itemName">{{ item.name }}</p>
      <p @click="showModal(item._id)" id="itemRps" style="color: red;">
        <img src="../../assets/images/rps.gif" alt="rps" />
        {{ item.rps }}
      </p>
      <p style="color: blue;">stock: {{ item.stock }}</p>
    </div>
    <!--modal-->
    <b-modal ref="my-modal" hide-footer title="Hello Seal Lovers">
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
          <p style="color: blue; margin-left:30px;">stock: {{getDetailItem.stock}}</p>
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
</template>

<script>
export default {
  name: "bestitem",
  data() {
    return {
      show: false,
      detailItem: null,
      qtyBuy: null
    };
  },
  methods: {
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
