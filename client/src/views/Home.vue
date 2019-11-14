<template>
  <div class="home">
    <div class="container border">
      <div class="mainPage">
        <div class="col-2 border side" v-if='signin'>
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
      bar: 'col-10 border'
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
        console.log(val)
        if(val) {
          this.bar = 'col-10 border';
        } else {
          this.bar = 'col-12 border'
        }
      }
    }
  },
  created () {
    console.log(this.bar)
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
  height: 90vh
}
</style>