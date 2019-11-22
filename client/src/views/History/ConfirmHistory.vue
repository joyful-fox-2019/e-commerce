<template>
<div>
  <div v-if='confirm.length !== 0'>
    <div v-for='(history) in confirm' :key='history._id' class='mt-2'>
      <div class='toptrans'>
        <div>
          <h3>Transaction ID : {{ history._id }}</h3>
        </div>
        <div>
          <b-badge pill :variant="history.confirm ? 'success' : 'warning' " class='badgec3'> {{ history.confirm ? 'Process' : 'Pending' }} </b-badge>
          <button class="btn-sm btn-outline-success btn ml-3" v-if='history.confirm && !history.status' @click='receivedProduct(history._id)'>Received</button>
        </div>
        <div>
          <h3>Total : {{ history.payment }}</h3>
        </div>
      </div>
      <div v-for='(product,i) in history.ProductId' :key='i'>
        <HistoryComponent :get-product='product'></HistoryComponent>
      </div>
    </div>
  </div>
  <div v-else>
    <ZonkComponent :action='nameAction' />
  </div>
</div>
</template>

<script>
import HistoryComponent from '@/components/HistoryComponent/HistoryComponent.vue'
import ZonkComponent from '@/components/HistoryComponent/ZonkComponent.vue'
import axios from '@/apis/server.js'


export default {
  name: 'confirm',
  data () {
    return {
      confirm: []
    }
  },
  components: {
    HistoryComponent,
    ZonkComponent
  },
  methods: {
    receivedProduct (id) {
      axios({
        method: 'patch',
        url: `/transactions/received/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$store.dispatch('checkSignin')
          this.$awn.success('Thanks for Trusting DC-Emporium')
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchConfirm () {
      this.price.forEach((el, i) => {
        if(!el.confirm) {
          this.confirm.push(el)
        }
      })
    }
  },
  computed: {
    history () {
      return this.$store.state.userSignin.History
    },
    nameAction () {
      return this.$route.name
    },
    price() {
      this.history.forEach((el, i) => {
        setTimeout(() => {
          const number_string = el.payment.toString();
          const remainder = number_string.length % 3;
          let money = number_string.substr(0, remainder);
          const thousand = number_string.substr(remainder).match(/\d{3}/g);
          if (thousand) {
            const separator = remainder ? "." : "";
            money += separator + thousand.join(".");
          }
          el.payment =  `Rp. ${money}`;
        }, 500);
      })
      return this.history
    }
  },
  created () {
    this.fetchConfirm()
  }
}
</script>

<style>

</style>