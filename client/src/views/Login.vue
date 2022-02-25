<template>
  <b-container style="height:90vh !important;">
    <b-row class="justify-content-center align-items-center h-100">
      <b-col cols="11" md="6">

        <!-- Register -->
        <div v-if="!login">
          <h2 class="text-white mb-4"> <b>Register</b> </h2>
          <b-form @submit.prevent="onRegister" @reset="onReset" v-if="show" class="text-white">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"

            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Your name:"
              label-for="input-1"

            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                required
                placeholder="Enter name"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="password"
                v-model="form.password"
                required
                placeholder="Enter password"
              ></b-form-input>
              <p class="mt-2"><small>Have account? <span @click="changePage()">Login here</span>.</small></p>
            </b-form-group>

            <b-button type="submit" class="mr-2" variant="dark"><font-awesome-icon icon="user-plus" class="mr-1"></font-awesome-icon>Register</b-button>
            <b-button type="reset" class="mr-2" variant="secondary">Reset</b-button>
          </b-form>

        </div>

        <!--  Login  -->
        <div v-if="login">
          <h2 class="text-white mb-4"> <b>Login</b> </h2>
          <b-form @submit.prevent="onLogin" @reset="onReset" v-if="show" class="text-white">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                required
                type="password"
                placeholder="Enter password"
              ></b-form-input>

              <p class="mt-2"><small>Don't Have account? <span @click="changePage()">Register here</span>.</small></p>
            </b-form-group>

            <b-button type="submit" class="mr-2" variant="dark"><font-awesome-icon icon="sign-in-alt" class="mr-1"></font-awesome-icon> Login</b-button>
            <b-button type="reset" class="mr-2" variant="secondary">Reset</b-button>
          </b-form>

        </div>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      login: true,
      form: {
        email: '',
        name: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onLogin (evt) {
      this.$store.dispatch('thisLogin', { email: this.form.email, password: this.form.password })
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
    },
    onRegister (evt) {
      this.$store.dispatch('thisRegister', { email: this.form.email, password: this.form.password, name: this.form.name })
        .then(({ data }) => {
          this.successToast('Register Successfuly!')
          this.changePage()
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data.errors)
        })
      // this.form.email = ''
      // this.form.name = ''
      // this.form.password = ''
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    changePage () {
      console.log('masuk')
      this.login = !this.login
    }
  }
}
</script>
