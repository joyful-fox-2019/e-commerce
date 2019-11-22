<template>
<div>
  <div v-if='sent.length !== 0'>
    <div v-for='(history) in sent' :key='history._id' class='mt-2'>
      <div class='toptrans'>
        <div>
          <h3>Transaction ID : {{ history._id }}</h3>
        </div>
        <div>
          <b-badge pill variant="success" class='badgec3'> Delivered </b-badge>
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
    <ZonkComponent :action='nameAction'/>
  </div>
</div>
</template>

<script>
import HistoryComponent from '@/components/HistoryComponent/HistoryComponent.vue'
import ZonkComponent from '@/components/HistoryComponent/ZonkComponent.vue'


export default {
  components: {
    HistoryComponent,
    ZonkComponent
  },
  data () {
    return {
      sent: []
    }
  },
  methods: {
    fetchRecieved () {
      this.history.forEach((el, i) => {
        if(el.status) {
          this.sent.push(el)
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
    }
  },
  created () {
    this.fetchRecieved()
  }
}
</script>

<style>

</style>