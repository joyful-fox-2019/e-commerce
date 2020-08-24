<template>
  <div class="about">
    <!-- <h1>ACCOUNT</h1> -->
    <router-view @alert="alert" @setIsLogin="setIsLogin"></router-view>
  </div>
</template>

<script>
export default {
  name: 'VAccount',
  methods: {
    alert (err) {
      this.$emit('alert', err)
    },
    setIsLogin (status) {
      this.$emit('setIsLogin', status)
    }
  }
}
</script>

<style>

</style>
