<template>
  <div id="nav">
    <div class="spacearound">
      <div id="sidebarCollapse" class="hamburger">
        <i class="fas fa-bars"></i>
      </div>
      <div class="ml-3">
        <h1 id="logo">FreshMeal</h1>
      </div>
    </div>
    <div class="spacearound">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Product Name"></b-form-input>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Tag"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></b-button>
      </b-nav-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {

  },
  mounted () {
    
  }
}
</script>

<style>
#nav {
  padding: 30px;
  /* background-color: #2c3e50; */
  background-color: rgb(21, 172, 114);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10px;
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 2;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: aliceblue;
}

/* #nav a.router-link-exact-active {
  color: #2c3e50;
} */

#logo {
  font-family: Pacifico;
  color: aliceblue;
  font-size: 30px;
  cursor: pointer;
}
.spacearound {
  display: flex;
  justify-content: space-around;
}
.hamburger{
  font-size: 28px;
  color: antiquewhite;
  cursor: pointer;
}
</style>
