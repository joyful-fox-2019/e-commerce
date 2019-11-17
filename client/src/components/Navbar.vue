<template>
    <div class="navbar-suctom">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                  <button type="button" class="btn navbar-btn sidebarCollapse">
                    <i class="fas fa-bars" style="font-size:25px;"></i>
                    <img class="ml-2" src="../../public/logo-text.png" alt="logo" style="width:130px;">
                  </button>
                </div>
                <div style="width:83%;">
                  <form>
                      <div style="display:flex;">
                          <div class="search-icon">
                              <i class="fas fa-search" style="font-size:20px; margin-top:8px;"></i>
                          </div>
                          <div style="width:100%;">
                              <input class="form-control search" type="text" placeholder="cari sayuran dan buah segar disini">
                          </div>
                      </div>
                  </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.search {
  background-color: #f5f5f5;
  border: none;
  border-radius: 0 8px 8px 0;
}
.search-icon {
  background-color: #f5f5f5;
  /* height: 100%; */
  padding: 0 10px;
  border-radius: 8px 0 0 8px;
}
</style>
