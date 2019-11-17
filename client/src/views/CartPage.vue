<template>
  <div class="pb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
          <!-- Shopping cart table -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 bg-light">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <CartItem v-for="item in this.$store.state.cart" :key="item.id" :ItemInCart="item"></CartItem>
            </table>
          </div>
          <!-- End -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
  name: 'CartPage',
  props: ['ItemInCart'],
  components: {
    CartItem
  },
  created () {
    this.$store.dispatch('viewCart')
  }
}
</script>

<style>
</style>
