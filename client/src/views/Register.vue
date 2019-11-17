<template>
  <div class="container" style="background: url('./assets/coba.jpg'); padding:30px;">
    <div class="row">
      <div class="col"></div>
      <div class="col-6">
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="registerUsername">Username</label>
            <input
              v-model="registerUsername"
              type="text"
              class="form-control"
              id="registerUsername"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
            >
          </div>
          <div class="form-group">
            <label for="registerEmail">Email address</label>
            <input
              v-model="registerEmail"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            >
          </div>
          <div class="form-group">
            <label for="registerPassword">Password</label>
            <input
              v-model="registerPassword"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            >
          </div> 
          <button type="submit" class="mt-4 btn btn-light">Submit</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {
name : 'Register',
  data() {
    return {
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerProfpic: "",
    };
  }
};
</script>

<style>
</style>
