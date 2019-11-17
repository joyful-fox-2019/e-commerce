<template>
  <div>
    <div class="my-0 mx-auto flex justify-center">
      <div class="m-4 flex justify-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$router.push('/admin/transaction')
  }
}
</script>

<style scoped>
  .admin-page {
    margin: 0 auto;
  }
</style>
