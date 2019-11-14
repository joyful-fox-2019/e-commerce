<template>
  <div>ini form register
    <button @click="toLogin">To Login</button>
  </div>
</template>

<script>
export default {
  methods: {
    toLogin () {
      this.$emit('to-login', 'login')
    }
  }
}
</script>

<style>

</style>
