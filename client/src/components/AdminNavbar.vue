<template>
    <div class="navbar-suctom">
        <nav class="navbar navbar-default" style="background-color:#28a745;">
            <div class="container-fluid">
                <div style="display:flex; width:100%;">
                <!-- <div class="navbar-header"> -->
                  <div>
                        <button type="button" class="btn navbar-btn sidebarCollapse">
                            <i class="fas fa-bars" style="font-size:25px; color:white;"></i>
                        </button>
                  </div>
                <!-- </div> -->
                <!-- <div style="width:95%;"> -->
                    <div style="width:90%; display:flex; justify-content:center;">
                        <div>
                            <img class="ml-2" src="../../public/logo-admin.png" alt="logo" style="width:130px;">
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
  name: 'AdminNavbar'
}
</script>
