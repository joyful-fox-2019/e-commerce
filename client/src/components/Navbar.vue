<template>
<div>
    <nav class="navbar navbar-expand-md">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 flex-row-reverse">
            <ul class="navbar-nav">
                <li class="nav-item mx-3">
                    <a class="nav-link"><router-link to="/macarons">Macarons</router-link></a>
                </li>
                <li class="nav-item mx-3 pr-5">
                    <a class="nav-link"><router-link to="/cakes">Cakes</router-link></a>
                </li>
            </ul>
        </div>
        <div class="mx-auto order-0">
            <a class="navbar-brand mx-auto brandname"><router-link to="/">Panthere Pink's</router-link></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav">
                <li class="nav-item mx-3 pl-5">
                    <a class="nav-link" v-if="!isLoggedIn"><router-link to="/auth">Register</router-link></a>
                    <a class="nav-link" v-else><router-link to="/profile">Profile</router-link></a>
                </li>
                <li class="nav-item mx-3">
                    <a class="nav-link"><router-link to="/cart">Cart</router-link></a>
                </li>
            </ul>
        </div>
    </nav>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style scoped>
.brandname {
    font-size: 2.5rem;
}
a {
    color: #fc7978;
}

a:hover {
    color: #5eb7b7;
    text-decoration: none;
}
</style>
