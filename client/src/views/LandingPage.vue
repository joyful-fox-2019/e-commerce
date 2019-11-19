<template>
  <div id="landingPage">
    <div class="page-container">
      <LoginForm v-if="mode === 'login'" @to-register="changeMode"></LoginForm>
      <RegisterForm v-if="mode === 'register'" @to-login="changeMode"></RegisterForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      mode: 'login'
    }
  },
  methods: {
    changeMode (val) {
      this.mode = val
    }
  }
}
</script>

<style scoped>
#landingPage {
  background-image: url('http://static1.squarespace.com/static/57027bf6f850820e70b867c9/57e0201b9de4bb934fe050da/5a157ec071c10b644b0322ca/1546876531838/The+Col+Collective_TDF+2018+Recon_1.jpg?format=1500w');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 92vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
.page-container {
  margin: 0 auto;
  padding: 100px;
}
</style>
