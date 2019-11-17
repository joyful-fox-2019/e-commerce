<template>
  <b-container>
    <b-row class="mt-5">
      <b-col>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col"># Transaction</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Products</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction._id">
              <th scope="row">{{`# ${transaction._id.slice(0,8)}`}}</th>
              <td>{{transaction.UserId.name}}</td>
              <td>
                <ol>
                  <li
                    v-for="item in transaction.productsList"
                    :key="item._id"
                  >{{item.product.name}} - {{item.quantity}} pcs</li>
                </ol>
              </td>
              <td>{{rupiah(transaction.totalCost)}}</td>
              <td>{{transaction.status.toUpperCase()}}</td>
              <td>
                <b-button
                  v-if="transaction.status==='paid'"
                  variant="success"
                  align="center"
                  @click="deliverItem(transaction._id)"
                >Deliver Item</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import server from "../api/server";
export default {
  data() {
    return {
      transactions: []
    };
  },
  methods: {
    getTransactions() {
      server({
        method: "get",
        url: "/transactions/admin",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.transactions = data;
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    deliverItem(transactionId) {
      server({
        method: "patch",
        url: `/transactions/admin/${transactionId}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          status: "delivered"
        }
      })
        .then(({ data }) => {
          this.getTransactions();
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    rupiah(price) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(price);
    }
  },
  created() {
    this.getTransactions();
  }
};
</script>

<style scoped>
</style>
