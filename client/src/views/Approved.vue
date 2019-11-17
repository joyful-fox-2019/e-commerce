<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-blue-grey-14 text-white">
        <div class="text-h6">Approved Transactions</div>
      </q-card-section>

      <q-separator /> 
      <div v-if="dataApproved.length != 0">
        <ListApproved v-for="approved in dataApproved" :key=approved._id :approved=approved />
      </div>
      <div v-else >
        <img alt="Quasar logo" class="center" src="../assets/logo.png" >
      </div>
      

    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListApproved from "../components/ListApproved.vue";
import Swal from "sweetalert2";
export default {
  name:'Approved',
  computed: {
    ...mapState({
      dataApproved: state => state.dataApproved
      }
    ),
  },
  methods:{
    
  },
  components: {
    ListApproved
  },
  mounted () {
    this.$store.dispatch('approved')
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