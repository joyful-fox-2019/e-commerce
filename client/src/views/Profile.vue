<template>
  <div class="container">
      <button class="custom-btn p-2" @click="signOut">Sign Out</button>
  </div>
</template>

<script>
export default {
  name: 'profile',
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
      this.$router.push('/auth')
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
.custom-btn {
  background-color: white;
  border: 2px solid black;
}
</style>
