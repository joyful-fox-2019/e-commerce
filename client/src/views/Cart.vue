<template>
  <b-container>
    <h2 class="text-white ml-3 ml-md-0 my-3"> <b>Your Cart</b> </h2>
    <b-row class="justify-content-center">
      <b-col cols="11" md="8">

          <b-card bg-variant="dark" class="text-white mb-3">
            <b-row>
              <b-col cols="12" md="6">
                <p class="mb-0 mt-1"> 
                  <b>Death Stranding</b>
                  <small class="ml-2">price: $20</small>
                </p>
              </b-col>
              <b-col cols="12" md="6">
                <b-input-group size="sm" class="mt-md-0 mt-2">
                  <b-input-group-prepend>
                    <b-button variant="outline-light"> <font-awesome-icon icon="minus"></font-awesome-icon> </b-button>
                  </b-input-group-prepend>
                  <b-form-input type="number" min="0.00"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-light"> <font-awesome-icon icon="plus"></font-awesome-icon> </b-button>
                    <b-button variant="outline-light"> <font-awesome-icon icon="trash"></font-awesome-icon> </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
          </b-card>

          <b-card bg-variant="dark" class="text-white">
            <b-row>
              <b-col cols="12" md="6">
                <p class="mb-0 mt-1"> 
                  <b>Death Stranding</b>
                  <small class="ml-2">price: $20</small>
                </p>
              </b-col>
              <b-col cols="12" md="6">
                <b-input-group size="sm" class="mt-md-0 mt-2">
                  <b-input-group-prepend>
                    <b-button variant="outline-light"> <font-awesome-icon icon="minus"></font-awesome-icon> </b-button>
                  </b-input-group-prepend>
                  <b-form-input type="number" min="0.00"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-light"> <font-awesome-icon icon="plus"></font-awesome-icon> </b-button>
                    <b-button variant="outline-light"> <font-awesome-icon icon="trash"></font-awesome-icon> </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
          </b-card>

      </b-col>
      <b-col cols="11" md="4">
        <b-card bg-variant="dark" class="text-white text-center mt-3 mt-md-0">
          <p><b>Total Price:</b></p>
          <h1><b>$40</b></h1>
          <b-button class="mt-2" variant="danger"><font-awesome-icon icon="money-check-alt" class="mr-2"></font-awesome-icon>Checkout</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {

}
</script>

<style>

</style>