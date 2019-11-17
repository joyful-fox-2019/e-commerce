<template>
    <div>
        <form action="">
            <div class="modal-card" style="width:300px;">
                <section class="modal-card-body">

                    <b-field label="Username / Email">
                        <b-input v-model="identity"
                            type="text"
                            placeholder="Your username / email"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input v-model="password"
                            type="password"
                            password-reveal
                            placeholder="Your password"
                            required>
                        </b-input>
                    </b-field>
                </section>
                    <button @click.prevent="login" class="button">Login</button><br>
                    <a @click.prevent="register" style="text-align:center">Register?</a>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
// const host = `https://e-commerce-api.sigitariprasetyo.xyz`
const host = `http://localhost:3000`

export default {
  name: 'FormLogin',
  data () {
    return {
      identity: '',
      password: '',
      isFullPage: true
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    login () {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      axios({
        method: 'post',
        url: `${host}/users/login`,
        data: {
          identity: this.identity,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('role', data.role)
          this.$store.dispatch('auth')
          this.$store.dispatch('getUsername')
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Login success`,
              type: 'is-success'
            })
          }, 1200)
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: 'is-danger'
          })
          this.identity = ''
          this.password = ''
        })
    }
  },
  computed: {
    isAdmin: {
      get () {
        return this.$store.state.isAdmin
      },
      set (value) {
        this.isAdmin = value
      }
    },
    isLogin: {
      get () {
        return this.$store.state.isLogin
      },
      set (value) {
        this.isAdmin = value
      }
    }
  },
  watch: {
    isAdmin () {},
    isLogin () {}
  }
}
</script>
<style scoped>
  .button {
    background-color: #d71149;
    width: 87%;
    align-self: center;
    border-radius: 10px;
    color: white;
  }
</style>
