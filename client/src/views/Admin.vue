<template>
  <div>
    <b-container class="my-4">
      <b-row>
        <!-- Place for nested vue route -->
        <b-col cols="12" md="3">
          <Menu style="cursor:pointer;"></Menu>
        </b-col>
        <b-col cols="12" md="9">
          <!-- Place for router view -->
          <router-view>
          </router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Menu from '../components/Menu'

export default {
  data () {
    return {

    }
  },
  components: {
    Menu
  }
}
</script>
