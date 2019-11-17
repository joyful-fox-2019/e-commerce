<template>
    <q-list bordered dense>
      <q-item clickable @click="detail">
        <q-item-section>
          <q-item-label>Transaction id: {{transaction._id}}</q-item-label>
          <q-item-label caption lines="2">Created at: {{transaction.createdAt.slice(0,10)}} </q-item-label>
          <q-item-label caption lines="2">Status: {{transaction.status}} </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ momentTrans }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
import moment from 'moment'

export default {
  name: 'UserTransList',
  props: ['transaction'],
  methods: {
    detail(){
      this.$emit('trans',this.transaction)
    }
  },
  computed: {
    momentTrans(){
      return moment(this.transaction.createdAt).from(new Date())
    }
  }
}
</script>

<style>

</style>