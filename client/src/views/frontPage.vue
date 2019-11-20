<template>
  <div id="front-page" v-if='!loginStatus'>
      <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <div class="sticky-top">
                <nav class=" navbar navbar-expand-md navbar-dark bg-dark d-flex justify-content-between h1 p-0">
                    <div class="nav navbar d-flex justify-content-start">
                        <div class="">
                            <router-link class="navbar-text text-white" to="/">Buka Toko</router-link>
                        </div>
                    </div>
                    <ul class="nav justify-content-end navbar-nav">
                        <li class="nav-item pr-3">
                            <router-link to="/login"><i class="fa fa-sign-in"></i></router-link>
                        </li>
                        <li class="nav-item pr-3">
                            <router-link to="/register"><i class="fa fa-user-plus"></router-link>
                        </li>
                    </ul>
                </nav>
        </div>
        
    <!-- front-page end -->
</template>

<script>
export default {

}
</script>

<style>

</style>
