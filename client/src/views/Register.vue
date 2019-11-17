<template>
<div>
  <Navbar />
  <section class="container" style="margin: 50px 10%; min-height:82vh; max-height:100vh">
    <form @submit.prevent="register">
      <b-field label="Username">
        <b-input type="text" v-model="username"></b-input>
      </b-field>

      <b-field label="Email" type="is-danger" message="This email is invalid">
        <b-input type="email" v-model="email" ></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>
      <b-field label="Address">
        <b-input maxlength="200" type="textarea" v-model="address"></b-input>
      </b-field>
      <button @click.prevent="register" class="button is-danger">register</button>
    </form>
  </section>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Register',
  components: {
    Navbar
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      address: '',
      isFullPage: true
    }
  },
  methods: {
    register () {
      let data = {
        username: this.username,
        email: this.email,
        address: this.address,
        password: this.password
      }
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      this.$store.dispatch('register', data)
        .then(({ data }) => {
          this.$store.dispatch('auth')
          this.$store.dispatch('getUsername')
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Register success`,
              type: 'is-success'
            })
          }, 1200)
          this.$router.push('/')
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          this.$buefy.toast.open({
            message: `${err}`,
            type: 'is-danger'
          })
          this.username = ''
          this.email = ''
          this.password = ''
        })
    }
  }
}
</script>
