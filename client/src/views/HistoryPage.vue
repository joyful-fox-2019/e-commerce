<template>
  <div>
    <div class="headStatus border mt-2 ml-2">
      <div class="filter">
        <button class="btn-outline-primary btn-md btn" @click='stayTransaction'>All</button>
        <button class="btn-outline-primary btn-md btn ml-4" @click='sendNestedTransaction("confirm")'>Wait Confirm</button>
        <button class="btn-outline-primary btn-md btn ml-4" @click='sendNestedTransaction("process")'>Process</button>
        <button class="btn-outline-primary btn-md btn ml-4" @click='sendNestedTransaction("sent")'>Received</button>
      </div>
    </div>
    <div class="bodyHistory mt-3 ml-2 border">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {
    sendNestedTransaction (name) {
      this.$router.push(`/history/list/${name}`)
    },
    stayTransaction () {
      this.$router.push('/history/list')
    }
  }
}
</script>

<style>
.headStatus {
  height: 2vw;
  width: 98%
}
.filter {
  display: flex;
  justify-content: center;
}
.bodyHistory {
  height: 36vw;
  width: 98%;
  overflow: auto
}
</style>