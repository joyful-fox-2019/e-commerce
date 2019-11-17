<template>
<div id="admin-transactions">
  <AdminNavbar />
  <center>
    <img src="https://imgur.com/IQ4Vtrx.png" alt="" id="transaction">
    <div id="transactions-list">
      <div v-for="(trans, index) in uncompletedTransactions" :key="index" id="list">
        <div id="details">
          <h5 id="trans-id">Track Number: {{trans.trackNumber}}</h5>
          <div v-for="(product, index) in trans.product" :key="index" id="product-list">
            <p>{{product.name}} ({{product.qty}})</p> 
          </div>
          <span id="badge-total" class="badge badge-secondary">Total: ${{trans.total}}</span>
          <span class="badge badge-warning"><strong>{{trans.clearStatus}}</strong></span>
          <!-- {{trans.created_at}} -->
        </div>
        <!-- Button trigger modal -->
        <button type="button" v-if="!trans.trackNumberFilled" id="filledtracknumber-btn" class="btn transaction-btns" data-toggle="modal" data-target="#addtracknumber">
          Input Track Number
        </button>
        <button type="button" v-if="trans.trackNumberFilled" id="tracknumber-btn" class="btn transaction-btns">
          Track Number Filled
        </button>

        <!-- Modal -->
        <div class="modal fade" id="addtracknumber" tabindex="-1" role="dialog" aria-labelledby="addtracknumberLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addtracknumberLabel">Input Track Number</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Track Number</p><input v-model="trackNumber" class="form-control" type="text" placeholder="Input the track number here">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" @click="inputTrackNumber(trans._id, index)" data-dismiss="modal" class="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(trans, index) in completedTransactions" :key="index" id="list">
        <div id="details">
          <h5 id="trans-id">Track Number: {{trans.trackNumber}}</h5>
          <div v-for="(product, index) in trans.product" :key="index" id="product-list">
            <p>{{product.name}} ({{product.qty}})</p> 
          </div>
          <span id="badge-total" class="badge badge-secondary">Total: ${{trans.total}}</span>
          <span class="badge badge-warning"><strong>{{trans.clearStatus}}</strong></span>
          <!-- {{trans.created_at}} -->
        </div>
         <button type="button" id="tracknumber-btn" class="btn transaction-btns">
          Track Number Filled
        </button>
      </div>
    </div>
  </center>


</div>
  
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import AdminNavbar from '../components/AdminNavbar'
import { config } from '../config'

export default {
  name: 'adminauthorized',
  components: {
    AdminNavbar
  },
  data () {
    return {
      completedTransactions: [],
      uncompletedTransactions: [],
      trackNumber: '',
    }
  },
  methods: {
    inputTrackNumber(id, index) {
      axios({
        method: 'patch',
        url: `${config.host}/transactions/tracknumber/${id}`,
        data: {
          trackNumber: this.trackNumber
        }
      })
        .then(({data}) => {
          Swal.fire(
            'Track Number sent!',
            `Success!`,
            'success'
          )
          this.trackNumber = ''
          this.uncompletedTransactions[index].trackNumberFilled = true
          this.getCompletedTransactions()
          this.getUncompletedTransactions()
        })
    },
    getCompletedTransactions() {
      axios({
        method:'get',
        url: `${config.host}/transactions/completed`
      })
        .then(({data}) => {
          for (let i = 0; i < data.length; i++) {
            data[i].trackNumberFilled = false
            if(data[i].status) {
              data[i].clearStatus = 'Completed'
            } else {
              if (!data[i].status) {
                data[i].clearStatus = 'Processed'
              }
            }
          }
          this.completedTransactions = data.reverse()
        })
    },
    getUncompletedTransactions() {
      axios({
        method: 'get',
        url: `${config.host}/transactions/uncompleted`
      })
        .then(({data}) => {
          for (let i = 0; i < data.length; i++) {
            if(data[i].status) {
              data[i].clearStatus = 'Completed'
            } else {
              if (!data[i].status) {
                data[i].clearStatus = 'Processed'
              }
            }
          }
          this.uncompletedTransactions = data.reverse()
        })
    }
  },
  created() {
    this.getCompletedTransactions()
    this.getUncompletedTransactions()
  }
}
</script>

<style scoped>
#tracknumber-btn {
  margin: 20px;
  width: 180px;
  background-color: #0a3d62;
}

#filledtracknumber-btn {
  margin: 20px;
  width: 180px;
  background-color: #079992;
}

#transaction {
  margin-top: 30px;
}

#transactions-list {
  margin: 50px;
  border: 1px solid rgb(240, 233, 233);
  border-radius: 3px;
  box-shadow: 5px 8px 8px rgb(179, 169, 169);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#list {
  border: 3px solid black;
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 10px;
  width: 700px;
  display: flex;
  justify-content: space-between;
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
  align-items: center;
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