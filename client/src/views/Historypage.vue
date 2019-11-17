<template>
  <b-container>
    <h2 class="text-white ml-3 ml-md-0 my-3 text-md-center"> <b>Your Game</b> </h2>
    <b-row class="justify-content-center">

      

      <b-col cols="11" md="3">
        <b-card style="border: none" bg-variant="dark" img-src="https://66.media.tumblr.com/a065703190ad984d19db0b695de70085/b5c7edb4358aa7e7-13/s540x810/decb5e16ae095f7b853b2c26e37197cb1731c3f7.jpg" img-alt="Image" img-top>
          <p style="font-size: 25px" class="m-0 text-white"><b>Death Stranding</b></p>
          <small class="text-white">Purchased : January 20, 2019</small>
          <template v-slot:footer>
            <div class="d-flex justify-content-right">
              <b-button v-if="true" class="btn-sm mr-2"><font-awesome-icon class="mr-2" icon="user-clock"></font-awesome-icon>Confirmation</b-button>
              <b-button v-if="true" class="btn-sm mr-2" variant="success"><font-awesome-icon class="mr-2" icon="check"></font-awesome-icon>Delivered</b-button>                
            </div>
          </template>
        </b-card>
      </b-col>

      <b-col cols="11" md="3">
        <b-card style="border: none" bg-variant="dark" img-src="https://66.media.tumblr.com/a065703190ad984d19db0b695de70085/b5c7edb4358aa7e7-13/s540x810/decb5e16ae095f7b853b2c26e37197cb1731c3f7.jpg" img-alt="Image" img-top>
          <p style="font-size: 25px" class="m-0 text-white"><b>Death Stranding</b></p>
          <small class="text-white">Purchased : January 20, 2019</small>
          <template v-slot:footer>
            <div class="d-flex justify-content-right">
              <b-button v-if="true" class="btn-sm mr-2"><font-awesome-icon class="mr-2" icon="user-clock"></font-awesome-icon>Confirmation</b-button>
              <b-button v-if="true" class="btn-sm mr-2" variant="success"><font-awesome-icon class="mr-2" icon="check"></font-awesome-icon>Delivered</b-button>                
            </div>
          </template>
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