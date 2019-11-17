<template>
  <q-layout view="hHh LpR fFf">

    <q-drawer show-if-above side="left" elevated>
      <!-- drawer content -->
          <q-list bordered separator>
            <q-item clickable>
              <q-item-section>
                <div>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" width="100px" height="100px">
                </div>
                <q-item-label>Admin</q-item-label>
                <p> Revenue: ini total pendapatan</p>
              </q-item-section>

            </q-item>

            <q-item clickable to="/admin/transactions">
              <q-item-section>
                <q-item-label>Transactions</q-item-label>
                <q-item-label caption>Total transactions: 10</q-item-label>
                <q-item-label caption>Pending transactions: 6</q-item-label>
                <q-item-label caption>Done transactions: 4</q-item-label>
              </q-item-section>
            </q-item>
                <q-separator />

            <q-item >
              <q-item-section >
                <q-item-label>Products</q-item-label>
                <q-item clickable to="/admin/addproduct" style="border-bottom: 1px solid grey">Add new product</q-item>
                <q-item clickable to="/admin/updateproduct">Update a product</q-item>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item clickable to='/'>Home</q-item>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>       
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'adminPage',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#avatar{
  width: 100px
}
</style>