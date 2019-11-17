<template>
  <div>
    <div class="box" style="border-radius:0px;">
      <div class="columns" style="background-color:#fafafa;margin:-19px;font-size:14px;">
        <div class="column">
          <p class="heading" style="color:#9c9c9c">NO. Treansaction</p>
          <p>TR-{{transaction._id.slice(6)}}</p>
          <p>{{moment(transaction.createdAt)}}</p>
        </div>
        <div class="column">
          <p class="heading">TOTAL Payment</p>
          <p>Rp.{{transaction.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</p>
        </div>
        <div class="column">
          <p class="heading">STATUS transaction</p>
          <div v-if="transaction.status == 'Delivered'">
            <p class="button is-success is-small">{{transaction.status}}</p>
          </div>
          <div v-else>
            <p class="button is-warning is-small">{{transaction.status}}</p>
          </div>
        </div>
        <div class="column">
          <p class="heading">ACTION</p>
          <div v-if="isAdmin">
            <div v-if="transaction.status == 'On Proccess'">
              <b-button
                type="is-danger is-small"
                @click="shipping(transaction._id)"
              >Confirm for Shipping</b-button>
            </div>
            <div v-else-if="transaction.status == 'Delivered'">
              <b-button
                type="is-danger is-small"
                @click="deleteHistoryAdm(transaction._id)"
              >Delete This Transaction History</b-button>
            </div>
            <div v-else>
              <p>-</p>
            </div>
          </div>
          <div v-else>
            <div v-if="transaction.status == 'Pending'">
              <b-button
                type="is-danger is-small"
                @click="payment(transaction._id)"
              >Confirm Your Payment</b-button>
            </div>
            <div v-else-if="transaction.status == 'Shipped'">
              <b-button
                type="is-danger is-small"
                @click="delivered(transaction._id)"
              >Confirm Recevied your product</b-button>
            </div>
            <div v-else-if="transaction.status == 'Delivered'">
              <b-button
                type="is-danger is-small"
                @click="deleteHistory(transaction._id)"
              >Delete This Transaction History</b-button>
            </div>
            <div v-else>
              <p>-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: row">
      <div class="box" style="border-radius:0px;margin: 0; width: 60vw;margin-top:-2.5vh;">
        <div
          class="columns"
          style="font-size:14px; margin-top:-2.5vh"
          v-for="(item, index) in transaction.products"
          :key="index"
        >
          <div class="column is-one-fifth">
            <p class="heading">Product</p>
            <div
              class="image is-96x96"
              style="max-height: 50px !important;max-width: 50px !important;margin:15px;"
            >
              <img :src="item.imgUrl" />
            </div>
          </div>
          <div class="column">
            <p class="heading">Product Name</p>
            <p>
              <b>{{item.name}}</b>
            </p>
            <p>Qty: {{transaction.carts[index].qty}}</p>
            <p>Total Price: {{transaction.carts[index].qty * transaction.products[index].price}}</p>
          </div>
          <div class="column">
            <p class="heading">Customer</p>
            <p>{{transaction.owner.username}}</p>
          </div>
        </div>
      </div>
      <div
        class="box"
        style="border-radius:0px;margin-top:-2.5vh;width:31vw;font-size:14px;border-top:none !important;"
      >
        <p class="heading">Address</p>
        <p>
          <b>{{transaction.owner.username}}</b>
        </p>
        <p>
          {{transaction.owner.address}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "DetailTransaction",
  props: ["transaction"],
  data() {
    return {
      isFullPage: true
    };
  },
  methods: {
    moment(date) {
      return moment(date).format("llll");
    },
    payment(id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        id: id
      };
      this.$store
        .dispatch("payment", payload)
        .then(_ => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Success, confim your payment!`,
              type: "is-success"
            });
          }, 1200);
          if (this.isAdmin) {
            this.$store.dispatch("getTransactionAdm");
          } else {
            this.$store.dispatch("getTransaction");
          }
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    },
    shipping(id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        id: id
      };
      this.$store
        .dispatch("shipping", payload)
        .then(_ => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Success, change status to Shipped!`,
              type: "is-success"
            });
          }, 1200);
          if (this.isAdmin) {
            this.$store.dispatch("getTransactionAdm");
          } else {
            this.$store.dispatch("getTransaction");
          }
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    },
    delivered(id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        id: id
      };
      this.$store
        .dispatch("delivered", payload)
        .then(_ => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Success, Your transaction is done!`,
              type: "is-success"
            });
          }, 1200);
          if (this.isAdmin) {
            this.$store.dispatch("getTransactionAdm");
          } else {
            this.$store.dispatch("getTransaction");
          }
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    },
    deleteHistory(id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        id: id
      };
      this.$store
        .dispatch("deleteHistory", payload)
        .then(_ => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Success, Delete your transaction histoy!`,
              type: "is-success"
            });
          }, 1200);
          if (this.isAdmin) {
            this.$store.dispatch("getTransactionAdm");
          } else {
            this.$store.dispatch("getTransaction");
          }
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    }
  },
  mounted() {
    if (this.isAdmin) {
      this.$store.dispatch("getTransactionAdm");
    } else {
      this.$store.dispatch("getTransaction");
    }
  },
  computed: {
    isAdmin: {
      get() {
        return this.$store.state.isAdmin;
      }
    }
  },
  watch: {
    isAdmin() {}
  },
  created() {
    if (this.$store.state.isAdmin) {
      this.$store.dispatch("getTransactionAdm");
    } else {
      this.$store.dispatch("getTransaction");
    }
  }
};
</script>
<style scoped>
.box-transaction {
  margin: 30px auto;
}
.heading {
  color: #9c9c9c;
}
</style>
