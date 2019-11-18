<template>
  <div>
    <ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Transaction Id</h6>
        </div>
        <span class="text-success">{{sold.TransactionId}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Total Profit</h6>
        </div>
        <span class="text-success">{{totalProfit}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div class="w-100">
          <h6 class="my-0">Item Sold</h6>
          <div class="d-flex justify-content-between" v-for="item in sold.sold" :key="item._id">
            <small class="text-muted p-1">product : {{item.name}}</small>
            <small class="text-muted p-1">profit : {{item.cost}}</small>
          </div>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Buyer </h6>
        </div>
        <span class="text">{{sold.UserId.username}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Date Sold</h6>
        </div>
        <span class="text-success">{{date}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Status</span>
        <strong class="text-success" v-if="sold.status">Delivered</strong>
        <div v-else>
          <strong class="text-warning px-2" >Not yet delivered</strong>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['sold'],
  computed: {
    date () {
      Date.prototype.toISODate = function () {
        return this.getFullYear() + '-' +
                 ('0' + (this.getMonth() + 1)).slice(-2) + '-' +
                 ('0' + this.getDate()).slice(-2)
      }
      return new Date(this.sold.date).toISODate()
    },
    totalProfit () {
      let sum = 0
      this.sold.sold.forEach(element => {
        sum += element.cost
      })
      return sum
    }
  }
}
</script>

<style>

</style>
