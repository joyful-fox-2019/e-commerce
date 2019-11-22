<template>
  <div class="home">
    <div class="container">
      <div class="mainPage">
        <div class="col-2 side" v-if='signin'>
          <SideProfile />
        </div>
        <div :class='bar' class='rightside'>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideProfile from '@/components/SideProfile.vue'

export default {
  name: 'home',
  components: {
    SideProfile
  },
  data () {
    return {
      bar: null
    }
  },
  computed: {
    signin: {
      get () {
        return this.$store.state.isSignin
      }
    }
  },
  watch: {
    signin: {
      handler (val) {
        if(!val) {
          this.bar = 'col-12';
        } else {
          this.bar = 'col-10'
        }
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
.container {
  min-width: 75vw
}
.mainPage {
  margin-top: 10px;
  display: flex;
}
.side {
  background-color: white;
}
.rightside {
  height: 90vh;
  width: 100%
}
</style>