<template>
  <div>
    <h1>Riwayat Transaksi</h1>
    <div class="row border mx-3 p-2">
      <div class="col-3">
        <h5>Barang Terbeli</h5>
      </div>
      <div class="col-2">
        <h5>Jumlah Barang</h5>
      </div>
      <div class="col-3">
        <h5>Status Pengiriman</h5>
      </div>
      <div class="col-3">
        <h5>Konfirmasi Penerimaan</h5>
      </div>
    </div>
    <div v-for="item in arrTransaction" :key='item._id'>
      <div class="row border mx-3 p-2">
        <div class="col-3 ">
          <div class="row ml-4 justify-content-center">
            <div v-for="(product,index) in item.product" :key="index">
              <p>{{product.product}} &nbsp;</p>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="row justify-content-center">
            <div v-for="(count,index) in item.count" :key="index">
              <p>{{ count }} &nbsp; </p>
            </div>
          </div>
        </div>
        <div class="col-3 justify-content-center">
          <div v-if="!item.status">
            <h5>Sedang dilakukan Pengiriman</h5>
          </div>
          <div v-else>
            <h5>Barang telah diterima</h5>
          </div>
        </div>
        <div class="col-3">
          <a @click='updateStatus(item._id)' v-if="!item.status" style="background-color:#aeddb198; color:#f6f6f6; cursor:pointer;" class="btn">Konfirmasi Penerimaan</a>
          <h5 v-else>Barang Telah Diterima</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Transaction',
  computed: {
    ...mapState(['arrTransaction'])
  },
  created () {
    this.$store.dispatch('setTransaction')
  },
  methods: {
    updateStatus (input) {
      this.$store.dispatch('updateStatus', input)
    }
  }
}
</script>

<style>

</style>
