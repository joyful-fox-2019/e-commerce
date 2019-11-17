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
              label="Email address:"
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
    data() {
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
      onRegister(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onLogin(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      changePage(){
        this.login = !this.login
      }
    }
  }
</script>