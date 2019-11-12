<template>
  <div>
    <h3><v-icon name='user' class='vicon'></v-icon> &nbsp; {{ name }}</h3>
    <div class="card profile">
      <CardProfile />
    </div>
  </div>
</template>

<script>
import CardProfile from '@/components/ProfileComponent/CardProfile.vue'

export default {
  components: {
    CardProfile
  },
  computed: {
    name () {
      return this.$store.state.userSignin.username
    }
  }
}
</script>

<style scoped>

.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #E6E6E6;
}
.profile {
  margin-left: 15px;
  margin-top: 15px;
  background-color: #B9BBB7;
  width: 30%;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius:24px;
  border:none;
  box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.2);
  transition:all .3s;
}

</style>