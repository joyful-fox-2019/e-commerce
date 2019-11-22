<template>
  <q-list bordered class="rounded-borders" style="max-width: 100%">
    <q-item>
      <q-item-section top thumbnail class="q-ml-none">
        <img :src="cart.product.img">
      </q-item-section>

      <q-item-section class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">{{cart.product.name}}</q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-medium">
             <q-icon color="black" name="add_shopping_cart" /> 
            </span>
            <span class="text-grey-8"> - {{cart.quantity}} packs</span>
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-medium">Price: </span>
          <span class="text-grey-8"> {{cart.product.price}} IDR </span>
        </q-item-label>
      </q-item-section>
      
      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-medium">Total Price: </span>
          <span class="text-grey-8"> {{cart.quantity * cart.product.price}} IDR  </span>
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn @click.prevent="del(cart._id)" class="gt-xs" size="12px" flat dense round icon="delete" >
            <q-tooltip>Delete Item Cart</q-tooltip>
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
  name:'ListCart',
  props: [ 'cart' ],
  methods: {
    del(id){
      this.$store.dispatch('deleteCart', id)
      .then(data => {
        Swal.fire({
            title: 'Success',
            text: `Success Delete Cart`,
            icon: 'success'
          })
        this.$store.dispatch('cart')
      })
      .catch( err => {
        this.next(err)
      })
    }
  }
}
</script>

<style>

</style>