<template>
  <q-list bordered class="rounded-borders" style="max-width: 100%">
    <q-item>
      <q-item-section top thumbnail class="q-ml-none">
        <img :src="transactions.products[0].img">
      </q-item-section>

      <q-item-section class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">{{transactions.products[0].name}}</q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-medium">
         
            </span>
            <span class="text-grey-8"> Status {{transactions.status}}</span>
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-medium">Owner: </span>
          <span class="text-weight-medium"> {{transactions.owner.username}} </span>
        </q-item-label>
      </q-item-section>
      

      <q-item-section side v-if="transactions.status == 'approved'">
        <div class="text-grey-8 q-gutter-xs">
          <q-btn @click.prevent="delivered(transactions._id)" class="gt-xs" size="12px" flat dense round icon="check" >
            <q-tooltip>Delivered Item Transactions</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>
    <q-separator spaced />
  </q-list>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name:'ListTransactions',
  props: [ 'transactions' ],
  methods: {
    delivered(id){
      this.$store.dispatch('deliveredTransactions', id)
      .then(data => {
        Swal.fire({
          title: 'Success',
          text: `Success Update Status`,
          icon: 'success'
          })
        this.$store.dispatch('transactions')
      })
      .catch( err => {
        this.next(err)
      })
    }
    // del(id){
    //   this.$store.dispatch('deleteCart', id)
    //   .then(data => {
    //     Swal.fire({
    //         title: 'Success',
    //         text: `Success Delete Cart`,
    //         icon: 'success'
    //       })
    //     this.$store.dispatch('cart')
    //   })
    //   .catch( err => {
    //     this.next(err)
    //   })
    // }
  }
}
</script>

<style>

</style>