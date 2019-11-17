<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-blue-grey-14 text-white">
        <div class="text-h6">Pending Transactions</div>
      </q-card-section>

      <q-separator /> 
      <div v-if="dataPending.length != 0">
        <ListPending v-for="pending in dataPending" :key=pending._id :pending=pending />
      </div>
      <div v-else >
        <img alt="Quasar logo" class="center" src="../assets/logo.png" >
      </div>
      
    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListPending from "../components/ListPending.vue";
import Swal from "sweetalert2";
export default {
  name:'Pending',
  computed: {
    ...mapState({
      dataPending: state => state.dataPending
      }
    ),
  },
  methods:{
    
  },
  components: {
    ListPending
  },
  mounted () {
    this.$store.dispatch('pending')
  }
}
</script>

<style lang="stylus" scoped>
  
.card-cart{
  width: 100%;
  max-width: 500px;
  border: solid 2px black;
}

</style>