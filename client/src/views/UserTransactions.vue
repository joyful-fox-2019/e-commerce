<template>
<div id="customer-transactions">
  <Navbar />
  <center>
    <img src="https://i.imgur.com/SKNMf7c.png" alt="" id="transaction">
    <div id="transactions-list">
      <div v-for="(trans, index) in myTransactions" :key="index" id="list">
        <div id="details">
          <h5 id="trans-id">Track Number: {{trans.trackNumber}}</h5>
          <div v-for="(product, index) in trans.product" :key="index" id="product-list">
            <p>{{product.name}} ({{product.qty}})</p> 
          </div>
          <span id="badge-total" class="badge">Total: ${{trans.total}}</span>
          <span class="badge badge-warning"><strong>{{trans.clearStatus}}</strong></span>
          <!-- {{trans.created_at}} -->
        </div>
        <button @click="confirm(trans._id)" id="confirm-btn" v-if="!trans.status" style="margin: 20px;" type="button" class="btn transaction-btns">Confirm</button>
        <button v-if="trans.status" style="margin: 20px;" type="button" class="btn transaction-btns">Completed</button>
      </div>
    </div>
  </center>
</div>
  
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'
import { config } from '../config'

export default {
  name: 'customertransactions',
  components: {
    Navbar
  },
  data() {
    return {
      myTransactions: []
    }
  },
  methods: {
    confirm(id) {
      axios({
        method: 'patch',
        url: `${config.host}/transactions/confirm/${id}`
      })
        .then(({data}) => {
          Swal.fire(
            'Transaction completed!',
            `Thank you!`,
            'success'
          )
          this.getTransactions()
        })
    },
    getTransactions() {
      const token = localStorage.getItem('token')

      axios({
        method: 'get',
        url: `${config.host}/transactions/user`,
        headers: {token}
      })
        .then(({data}) => {
          this.myTransactions = data.reverse()
        })
    }
  },
  created() {
    this.getTransactions()
  }

}
</script>

<style scoped>
#confirm-btn {
  background-color: #b71540;
}

#trans-id {
  border: 2px solid #227093;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  color: #227093;
  font-weight: bold;
}

#badge-total {
  width: 90px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c44569;
  color: white;
  margin-bottom: 10px;
}

.transaction-btns {
  background-color: #218c74;
  color: white;
  font-weight: bold;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px;
}

#product-list {
  border: 1px solid rgb(214, 203, 203);
  border-radius: 3px;
  margin-bottom: 8px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;;
  display: flex;  
  flex-direction: column;
  justify-content:left;
  font-weight: bold;
}

#transaction {
  margin-top: 30px;
}

#transactions-list {
  margin: 50px;
  padding: 20px;
  width: 1000px;
  border: 1px solid rgb(240, 233, 233);
  border-radius: 3px;
  box-shadow: 5px 8px 8px rgb(179, 169, 169);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#list {
  border: 3px solid black;
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 10px;
  width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>