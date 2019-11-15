<template>
<div>
  <div v-if='confirm'>
    <div v-for='(history) in confirm' :key='history._id' class='mt-2'>
      <div class='toptrans'>
        <div>
          <h3>Transaction ID : {{ history._id }}</h3>
        </div>
        <div>
          <b-badge pill :variant="history.confirm ? 'success' : 'warning' " class='badgec3'> {{ history.confirm ? 'Process' : 'Pending' }} </b-badge>
          <button class="btn-sm btn-outline-success btn ml-3" v-if='history.confirm && !history.status'>Received</button>
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
    <img src='https://images-na.ssl-images-amazon.com/images/I/61BgBdxg9DL._SY355_.png'>
  </div>
</div>
</template>

<script>
import HistoryComponent from '@/components/HistoryComponent/HistoryComponent.vue'


export default {
  name: 'confirm',
  data () {
    return {
      confirm: []
    }
  },
  components: {
    HistoryComponent
  },
  methods: {
    fetchConfirm () {
      this.history.forEach((el, i) => {
        if(!el.confirm) {
          this.confirm.push(el)
        }
      })
    }
  },
  computed: {
    history () {
      return this.$store.state.userSignin.History
    }
  },
  created () {
    this.fetchConfirm()
  }
}
</script>

<style>

</style>