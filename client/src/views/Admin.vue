<template>
    <div>
        <div class="wrapper">

            <AdminSidebar></AdminSidebar>
            <div id="content">
            <AdminNavbar></AdminNavbar>
                <router-view/>
            <Category></Category>
            <AdminProduct></AdminProduct>
            </div>
        </div>
    </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import AdminProduct from '@/components/AdminProduct.vue'
import Category from '@/components/Category'
import { mapActions } from 'vuex'

export default {
  name: 'Admin',
  components: {
    AdminNavbar, AdminSidebar, AdminProduct, Category
  },
  methods: {
    ...mapActions([
      'getFruits', 'getVegetables', 'getProteins', 'getGrains'
    ])
  },
  created () {
    this.getVegetables()
    this.getFruits()
    this.getProteins()
    this.getGrains()
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
