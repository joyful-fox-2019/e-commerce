<template>
  <div class="mb-4">
    <div class="border p-3" style="width: 100%">
      <h4>Product Id: </h4>
      <div class="container">
        <hr>

        <div>
          <div class="d-flex">
            <div style="width: 80px">
              <img src="" alt="" style="width: 100%; object-fit: cover;">
            </div>
            <div class="ml-3 d-flex flex-column">
              <div>
                Title
              </div>
              <small>
                Amount: 
              </small>
            </div>
            <div class="ml-auto">
              Total: Rp. 50000
            </div>
          </div>
          <hr>
        </div>

        <div class="d-flex justify-content-between">
          <div>
            Status: <span style="color: green" v-if="transaction.status">Delivered</span> <span style="color: red" v-else>On process</span>
          </div>
          <div>
            Rp. 500000
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>