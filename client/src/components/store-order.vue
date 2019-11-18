<template>
  <div>
    <h1 class="my-3">WELCOME TO ORDER</h1>

    <div class="order-container d-flex flex-column justify-content-center align-items-center">

     <div v-for="(order, i) in orders" :key="i" >
        <div v-for="item in order.items" :key="item._id">

        <div v-if="item.productId" class="order-card">
          <div class="order-date d-flex align-items-center">{{ dateFormat(order.createdAt) }}</div>

        <div class="store-and-status d-flex">
          <div class="order-store w-50 text-left">
            <span class="text-dark" >buyer: </span>
            <p>{{ order.userId.email }}</p>
          </div>
          <div class="order-status w-50 text-left">
            <p class="text-secondary ml-2">Action</p>
            <div class="d-flex">
              <input v-if="item.status === 'Order accepted'" class="mr-2 rounded px-2" type="text" placeholder="Enter Resi" required>
              <button @click="changeStatus(item.productId._id, 'Order accepted')" class="btn btn-info" v-if="item.status === 'Order is on proccess'" >Accept order</button>
              <button @click="changeStatus(item.productId._id, 'Shipped')" class="btn btn-success" v-if="item.status === 'Order accepted'" >Enter Resi</button>
              <button class="btn btn-secondary" v-if="item.status === 'Shipped'" readonly>Shipped</button>
              <button class="btn btn-secondary" v-if="item.status === 'Done'" readonly>Done</button>
            </div>
          </div>
        </div>

        <div class="d-flex">

          <div class="order-product d-flex">
            <img src="https://bit.ly/355433T" alt="">

            <div>
              <p class="product-name">{{ item.productId.name }}</p>
              <p class="price">{{ item.productId.price  }}</p>
              <p class="qty">{{ item.qty  }} pcs</p>
            </div>

          </div>

          <div class="d-flex">
             <div class="total-harga">
              <p >Total harga Produk</p>
              <p class="price">${{ item.productId.price * item.qty }}</p>
            </div>
          </div>

        </div>
        </div>

      </div>
     </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['orders'])
  },
  methods: {
    changeStatus (id, status) {
      this.$store.dispatch('CHANGE_STATUS', { id, status })
    },
    dateFormat (date) {
      let event = new Date(date)
      let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }

      return event.toLocaleDateString('en-US', options)
    }
  },
  created () {
    this.$store.dispatch('GET_ORDERS')
  }
}
</script>

<style>
.order-container{
  width: 100%;
}

.order-card{
  margin: 10px 0;
  width: 1000px;
  height: 300px;
  border: .6px solid rgb(172, 172, 172);
  border-radius: 15px;
  box-shadow: 6px 4px 15px 0px rgba(0, 0, 0, 0.137);
}

.order-date{
  width: 100%;
  height: 30px;
  font-size: 13px;
  padding: 0 15px;
}

.store-and-status{
  height: 100px;
  border: .6px solid rgba(172, 172, 172, 0.322);
  padding: 30px;
}

.order-store{
  height: 50px;
  border-right: .6px solid rgba(172, 172, 172, 0.671);
  color: rgb(33, 182, 22);
  font-weight: 600;
  padding: 0 10px;
}

.order-status{
  height: 50px;
  padding: 0 10px;
}

.order-status p{
  margin: 0;
}

.order-product{
  width: 50%;
  padding: 30px;
  border-right: .6px solid rgba(172, 172, 172, 0.671);
}

.order-product img{
  height: 100px;
  width: auto;
}

.product-name{
  color: rgb(33, 182, 22);
  font-weight: 600;
}

.price{
  text-align: left;
  font-size: 15px;
  color: #FF6535;
}

.qty{
  text-align: left;
  font-size: 12px;
}

.total-harga{
  padding: 30px;
}
</style>
