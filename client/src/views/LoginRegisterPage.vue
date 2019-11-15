<template>
  <div class="loginForm">
      <LoginRegisterForm></LoginRegisterForm>
  </div>
</template>

<script>
import LoginRegisterForm from '../components/LoginRegisterForm'

export default {
  name: 'LoginRegisterPage',
  components: {
    LoginRegisterForm
  }
}
</script>

<style scoped>
.loginForm {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}
</style>
