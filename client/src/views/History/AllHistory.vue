<template>
  <div>
    <div v-for='(history) in history' :key='history._id' class='mt-2'>
      <div class='toptrans'>
        <div>
          <h3>Transaction ID : {{ history._id }}</h3>
        </div>
        <div>
          <b-badge pill :variant="history.confirm ? 'success' : 'warning' " class='badgec3' v-if='!history.status'> {{ history.confirm ? 'Process' : 'Pending' }} </b-badge>
          <b-badge pill variant="success" class='badgec3' v-if='history.status'> Delivered </b-badge>
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
</template>

<script>
import HistoryComponent from '@/components/HistoryComponent/HistoryComponent.vue'

export default {
  components: {
    HistoryComponent
  },
  computed: {
    history () {
      return this.$store.state.userSignin.History
    }
  }
}
</script>

<style>
.toptrans {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.badgec3 {
  font-size: 20px
}
</style>