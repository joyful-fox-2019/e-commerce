<template>
  <div id="app">
    <div id="nav">
      <router-link to="/order/topay">To Pay</router-link> |
      <router-link to="/order/tosend">To Send</router-link> |
      <router-link to="/order/sent">Sent</router-link> |
      <router-link to="/order/delivered">Delivered</router-link>
    </div>
    <router-view/>
  </div>
</template>
<style lang="css" scoped>
    #app{
        width:100%
    }
</style>
