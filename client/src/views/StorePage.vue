<template>
<div>
    <img :src="storeP.background_image" alt="" class='imageA'>
  <div class='container contentContainer border'>
    <div class='mt-3' v-if='!status'>
      <b-alert show variant="danger">
        <h4 class="alert-heading">Your store has not been verified</h4>
        <p>
          Oops, you haven't been verified. Verify your account now then add the first product and it's time to reach potential buyers and get profits
        </p>
        <hr>
        <p class="mb-0">
          <router-link to='/profile'>Click here</router-link> to verify
        </p>
      </b-alert>
    </div>
    <div class='mt-3' v-if='status'>
      <b-alert show variant="success">
        <h4 class="alert-heading">Your account has been verified</h4>
        <p>
          let's share products and get more benefits with DC Emporium
        </p>
      </b-alert>
    </div>

    <div class="card border cardStore mt-5">
      <div class='col-2'>
        <img :src="storeP.store_image" alt="">
      </div>
      <div class='justyStore col-5'>
        <div class='mt-3'>
          <h2>{{ storeP.name }}</h2>
          <span>{{ storeP.ProductId.length }} Product | <v-icon name='map-pin' class='vicon'></v-icon>&nbsp; {{ storeP.location }}</span>
        </div>
        <div>
          <button class="btn btn-md btn-outline-success">Change Image</button>
        </div>
      </div>
      <div class="col-5">
        fdsafas
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    status () {
      return this.$store.state.userSignin.verification
    },
    storeP () {
      return this.$store.state.userStore
    }
  }
}
</script>

<style>
.justyStore {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.contentContainer {
  min-width: 1520px !important;
}
.cardStore {
  border-radius: 20px;
  height: 8vw;
  display: flex;
  flex-direction: row;
}
.cardStore img {
  width: 6vw;
  background-color: white;
  border-radius: 100px;
  position: absolute;
  margin: -30px 24px
}
.imageA {
  position: fixed;
  background-position: left;
  width: 100%
}
</style>