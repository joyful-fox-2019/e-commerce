<template>
  <q-layout view="hHh LpR fFf">

    <q-drawer show-if-above side="left" elevated>
      <!-- drawer content -->
          <q-list bordered separator>
            <q-item clickable to="/admin" @click="home = true">
              <q-item-section>
                <div>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" width="100px" height="100px">
                </div>
                <q-item-label>Admin</q-item-label>
                <p> Revenue: {{ user.money }}</p>
              </q-item-section>

            </q-item>

            <q-item clickable to="/admin/transactions" @click="home = false">
            <q-item-section avatar>
                <q-avatar rounded color="green" text-color="white" icon="history" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Transactions</q-item-label>
                <q-item-label caption>Total transactions: {{ allTransactions.length }}</q-item-label>
                <q-item-label caption>Pending transactions: {{ allPending }}</q-item-label>
                <q-item-label caption>Done transactions: {{ allDone }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-avatar rounded color="green" text-color="white" icon="storefront" />
              </q-item-section>
              <q-item-section >
                <q-item-label>Products</q-item-label>
                <q-item clickable to="/admin/addproduct" :dense="true" @click="home = false">Add new product</q-item>
                <q-item clickable to="/admin/updateproduct" :dense="true" @click="home = false">Update a product</q-item>
              </q-item-section>
            </q-item>

            <q-item  clickable to='/#'>
            <q-item-section avatar>
                <q-avatar rounded color="green" text-color="white" icon="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar rounded color="green" text-color="white" icon="logout"/>
              </q-item-section>
              <q-item-section>
                <q-item-label  @click="logout">Logout</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>       
    </q-drawer>

    <q-page-container>
      <div v-if="home">
        <q-card flat bordered class="my-cardssssss" style="width: 60%; margin: 30px auto">
          <q-card-section>
            <div class="text-h6">Welcome to admin page</div>
          </q-card-section>

          <q-card-section>
            Choose what you need on the sidebar
          </q-card-section>
        </q-card>
      </div>
      <router-view @bukanhome="sethome" />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'adminPage',
  data () {
    return {
      home: true
    }
  },
  methods:{
    getAllTransactions(){
      this.$q.loading.show()
      this.$store.dispatch('transactions/allTransactions')
        .then(() => {
          this.$q.loading.hide()
          console.log(this.allTransactions)
        })
    },
      logout(){
      localStorage.clear()
      this.$router.push({path: '/'})
      this.$store.commit('LOGIN',false)
      this.$store.commit('SET_ADMIN',false)
      this.$store.commit('USERNAME','')
      this.$store.commit('SET_ID','')
      this.$store.commit('users/EMPTY_USER')
    },
    sethome(val){
      this.home = val
    }
  },
  computed: {
    ...mapState('users',[
      'user'
    ]),
    ...mapState('transactions',[
      'allTransactions',
      'allPending',
      'allDone'
    ])
  },
  created(){
    this.getAllTransactions()
    this.$store.dispatch('users/getProfile')
  }
}
</script>

<style scoped>
#avatar{
  width: 100px
}
</style>