<template>
    <div class="navbar-suctom">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div style="display:flex; width:100%;">
                <!-- <div class="navbar-header"> -->
                  <div>
                        <router-link v-if="!isAdmin" to="/" class="btn navbar-btn"><i class="fas fa-arrow-left" style="color:#606060; font-size:25px;"></i></router-link>
                        <router-link v-if="isAdmin" to="/admin" class="btn navbar-btn"><i class="fas fa-arrow-left" style="color:#606060; font-size:25px;"></i></router-link>
                  </div>
                <!-- </div> -->
                <!-- <div style="width:95%;"> -->
                    <div style="width:90%; display:flex; justify-content:center;">
                        <div>
                            <img class="ml-2" src="../../public/logo-text.png" alt="logo" style="width:130px;">
                        </div>
                    </div>
                <!-- </div> -->
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'DetailNavbar',
  data () {
    return {
      isAdmin: false
    }
  },
  created () {
    if (localStorage.getItem('setting') === 'true') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
  }
}
</script>

<style scoped>

</style>
