<template>
  <q-layout view="hHh LpR fFf">

    <q-drawer show-if-above side="left" elevated>
      <!-- drawer content -->
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <div>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" width="100px" height="100px">
                </div>
                <q-item-label>{{ username }}</q-item-label>
                <p> Money: {{ user.money }}</p>
                <q-btn :ripple="false" color="primary" @click="prompt = true" :no-caps="true">Top up</q-btn>
              </q-item-section>

            </q-item>

            <q-item clickable to="/profile/transactions">
              <q-item-section>
                <q-item-label>Transactions</q-item-label>
                <q-item-label caption>Pending transactions: {{ userPending }}</q-item-label>
                <q-item-label caption>Done transactions: {{ userDone }} </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to="/profile/cart">
              <q-item-section>
                <q-item-label>Cart</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label>Wishlist</q-item-label>
              </q-item-section>
            </q-item>
            <q-item  clickable to='/'>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label @click="logout">Logout</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>       
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

     <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Input Top Up</div>
        </q-card-section>

        <q-card-section>
          <q-input 
          dense 
          v-model="topup" 
          autofocus 
          @keyup.enter="prompt = false" 
           :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Top Up!" v-close-popup @click="setTopUp" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-layout>
</template>

<script>
import { mapState } from 'vuex'



export default {
  name: 'profile',
  data () {
    return {
      topup : '',
      prompt : false
    }
  },
  methods : {
    logout(){
      localStorage.clear()
      this.$router.push({path: '/'})
      this.$store.commit('LOGIN',false)
      this.$store.commit('SET_ADMIN',false)
      this.$store.commit('USERNAME','')
      this.$store.commit('SET_ID','')
      this.$store.commit('users/EMPTY_USER')
    },
    setTopUp(){
      this.$store.dispatch('users/topup',Number(this.topup))
        .then(()=>{
          this.$store.dispatch('users/getProfile')
        })
        .catch((err) => {
          console.log(err)
        })
    }, getUserTransactions(){
      this.$store.dispatch('transactions/userTransactions')
        .then(() => {
          console.log(this.userTransactions)
        })
    }
  },
  computed : {
    ...mapState('users',[
      'user'
    ]),
    ...mapState([
      'username'
    ]),
    ...mapState('transactions',[
      'userTransactions',
      'userPending',
      'userDone'
    ])
  },
  created(){
    this.getUserTransactions()
    // this.$store.dispatch('users/getProfile')
  }
}
</script>

<style scoped>
#avatar{
  width: 100px
}
</style>