<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="light" class='d-flex justify-content-space-between'>
    <b-navbar-brand href="#">
      <h2 @click='goMain' id='dcShop'>DC Emporium</h2>
    </b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div>
          <b-button @click='toCartPage' class='btnL btnregister mr-4 btn-outline-success' style='background-color: white; color: black' v-if='isSignin'>
            <v-icon name='shopping-cart' class='vicon'></v-icon> &nbsp; <b-badge variant="light"> {{ userCart }} </b-badge>
          </b-button>
          <b-button class='btnL mr-4 btn-outliner-warning' v-if='isSignin' @click='signout'><v-icon name='power' class='vicon'></v-icon></b-button>
          <b-button v-b-modal.modal-prevent-closing class='btnL mr-4' style='background-color: white; color: black' v-if='!isSignin'><v-icon name='log-in' class='vicon'></v-icon></b-button>
          <b-button v-b-modal.modal-prevent-closing2 class='btnL btnregister mr-4 btn-outline-success' style='background-color: white; color: black' v-if='!isSignin'><v-icon name='user-plus' class='vicon'></v-icon></b-button>
          

<!-- Login Modal -->
<b-modal
  id="modal-prevent-closing"
  ref="modal"
  title="Sign In"
  @ok='signin'
>
  <form ref="form">
    <b-form-group
      label="Username / Email"
      label-for="name-input"
      invalid-feedback="Name is required"
    >
      <b-form-input
        id="name-input"
        v-model="request"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Password"
      label-for="name-input"
      invalid-feedback="Name is required"
    >
      <b-form-input
        id="name-input"
        v-model="password"
        type='password'
        required
      ></b-form-input>
    </b-form-group>
  </form>
</b-modal>

<!-- Register Modal -->
<b-modal
  id="modal-prevent-closing2"
  ref="modal"
  title="Register"
  @ok='signup'
>
  <form ref="form">
    <b-form-group
      label="Username"
      label-for="name-input"
      invalid-feedback="Name is required"
    >
      <b-form-input
        id="name-input"
        v-model="username"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Email"
      label-for="name-input"
      type='email'
      invalid-feedback="Email is required"
    >
      <b-form-input
        id="name-input"
        v-model="email"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="password"
      label-for="name-input"
      invalid-feedback="Password is required"
    >
      <b-form-input
        id="name-input"
        v-model="passwordSignup"
        type='password'
        required
      ></b-form-input>
    </b-form-group>
  </form>
</b-modal>

        </div>
      </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  data() {
    return {
      username: null,
      email: null,
      passwordSignup: null,
      request: null,
      password: null,
      isSignin: false,
    }
  },
  methods: {
    toCartPage () {
      this.$router.push({ name: 'cart' });
    },
    goMain () {
      this.$router.push('/home');
    },
    signout () {
      localStorage.removeItem('token')
      this.goMain();
      this.$awn.success(`See you again ${this.$store.state.userSignin.username}`)
      setTimeout(() => {
        this.$store.commit('SIGN_OUT')
        this.isSignin = false
      }, 1000);
    },
    signin () {
      this.$awn.asyncBlock(
        this.signinAction(),
        null
      )
        .then(msg => {
          setTimeout(() => {
            this.$awn.success(msg)
            this.isSignin = true;
          }, 2000);
        })
        .catch(err => {
          this.$awn.warning(err)
        })
    },
    signup () {
      this.$awn.asyncBlock(
        this.signupAction(),
        null
      )
        .then(msg => {
          setTimeout(() => {
            this.$awn.success(msg)
          }, 1000);
        })
        .catch(err => {
          this.$awn.warning(err)
        })
    },
    signinAction () {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: '/users/signin',
          data: {
            request: this.request,
            password: this.password
          }
        })
          .then(({data}) => {
            localStorage.setItem('token', data.token)
            setTimeout(() => {
              this.$store.dispatch('checkSignIn')
              this.request = '';
              this.password = ''
            }, 1000);
            resolve(data.msg)
          })
          .catch(err => {
            this.$awn.warning(err.response.data.msg)
            reject(err.response.data.msg)
          })
      })
    },
    signupAction () {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: '/users/signup',
          data: {
            username: this.username,
            email: this.email,
            password: this.passwordSignup
          }
        })
          .then(({data}) => {
            localStorage.setItem('token', data.token)
            setTimeout(() => {
              this.$store.dispatch('checkSignin')
              this.username = '';
              this.email = '';
              this.passwordSignup = '';
            }, 1000);
            resolve(data.msg)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    }
  },
  computed: {
    userCart () {
      if(this.$store.state.userCart.product) {
        return this.$store.state.userCart.product.length
      }
    }
  },
  watch: {
    isSignin: {
      handler (val) {
        this.isSignin = val
      }
    },
    userCart: {
      handler (val) {
        if(val) {
          this.userCart = val;
        }
      }
    }
  },
  created () {
    setTimeout(() => {
      this.isSignin = this.$store.state.isSignin
    }, 3000);
    console.log(this.$store.state.userCart.product.length)
  }
}
</script>

<style scoped>
#dcShop{
  color:#41B549;
  font-family: 'Indie Flower', cursive;
  font-size: 40px
}
#dcShop:hover {
  color:#FF6E44;
}
.btnL {
  height: 45px;
  font-size: 15px
}
.btnL:hover {
  color: black;
  border-radius: 20px
}
</style>