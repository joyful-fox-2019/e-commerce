<template>
  <div>
    <b-container class="py-5 my-5">
      <b-row class="justify-content-end">
        <b-col cols="2"></b-col>
        <b-col cols="4" class="text-left">
          <b-row>
            <b-col>
              <h3>Log In</h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-2">
              <input required type="email" v-model="email" class="form-control" placeholder="Email" />
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <input
                required
                @keydown.enter="loginUser"
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Password"
              />
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <button class="btn btn-dark" @click.prevent="loginUser" type="button">Submit</button>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginUser() {
      let payload = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("loginUser", payload)
        .then(response => {
          if (response) {
            this.$router.push("/");
            this.email = "";
            this.password = "";
          }
        })
    }
  }
};
</script>

<style>
</style>
