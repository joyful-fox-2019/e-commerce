<template>
    <div>
        <div class="wrapper">

            <Sidebar></Sidebar>
            <div id="content">
            <UserNavbar></UserNavbar>
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import UserNavbar from '@/components/UserNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'User',
  components: {
    UserNavbar, Sidebar
  },
  mounted () {
    $(document).ready(function () {
      $('.sidebar').mCustomScrollbar({
        theme: 'minimal'
      })

      $('.dismiss, .overlay').on('click', function () {
        $('.sidebar').removeClass('active')
        $('.overlay').fadeOut()
      })

      $('.sidebarCollapse').on('click', function () {
        $('.sidebar').addClass('active')
        $('.overlay').fadeIn()
        $('.collapse.in').toggleClass('in')
        $('a[aria-expanded=true]').attr('aria-expanded', 'false')
      })
    })
  }
}
</script>

<style>

</style>
