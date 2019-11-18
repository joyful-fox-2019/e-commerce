<template>
  <b-navbar fixed-top type="is-light">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p>
          <i class="fas fa-store"></i>&nbsp; <strong>Computer Store</strong>
        </p>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item v-if="isAdmin" tag="router-link" to="/product-manager">
        Product Manager
      </b-navbar-item>
      <b-navbar-dropdown v-if="!isAdmin" hoverable label="Category">
        <b-navbar-item tag="router-link" to="/about">
          About
        </b-navbar-item>
        <b-navbar-item>
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item v-if="!isAdmin" tag="div" style="width: 60vw;">
        <b-field position="is-centered" style="width: 100%;">
          <b-input placeholder="Enter your keyword..." type="search" expanded>
          </b-input>
          <p class="control">
            <button class="button is-info"><i class="fas fa-search"></i></button>
          </p>
      </b-field>
      </b-navbar-item>
    </template>
    <template v-if="!isLogin" slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-dropdown ref="registerdropdown" position="is-bottom-left" aria-role="menu" trap-focus>
            <b-button
              slot="trigger"
              type="is-info"
              >
              <strong>Register</strong>
            </b-button>

            <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              paddingless>
              <form @submit.prevent="submitRegister">
                <div class="modal-card" style="width:300px;">
                  <section class="modal-card-body">
                    <b-field label="Name">
                      <b-input
                        type="text"
                        v-model="name"
                        placeholder="Your name"
                        required>
                      </b-input>
                    </b-field>
                    <b-field label="Email">
                      <b-input
                        type="email"
                        v-model="email"
                        placeholder="Your email"
                        required>
                      </b-input>
                    </b-field>

                    <b-field label="Password">
                      <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Your password"
                        required>
                      </b-input>
                    </b-field>

                  </section>
                  <footer class="modal-card-foot">
                    <button class="button is-info">Register</button>
                  </footer>
                </div>
              </form>
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown ref="logindropdown" position="is-bottom-left" aria-role="menu" trap-focus>
            <b-button
              slot="trigger"
              type="is-info"
              outlined>
              <strong>Login</strong>
            </b-button>

            <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              paddingless>
              <form @submit.prevent="submitLogin">
                <div class="modal-card" style="width:300px;">
                  <section class="modal-card-body">
                    <b-field label="Email">
                      <b-input
                        type="email"
                        v-model="email"
                        placeholder="Your email"
                        required>
                      </b-input>
                    </b-field>

                    <b-field label="Password">
                      <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Your password"
                        required>
                      </b-input>
                    </b-field>

                  </section>
                  <footer class="modal-card-foot">
                    <button class="button is-info">Login</button>
                  </footer>
                </div>
              </form>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-navbar-item>
    </template>
    <template v-if="isLogin" slot="end">
      <b-navbar-item v-if="!isAdmin" tag="div">
        <b-button
          type="is-info"
          icon-left="cart"
          outlined>
          Cart
        </b-button>
      </b-navbar-item>
      <b-navbar-item v-if="isAdmin" tag="div">
        <b-button
          type="is-info"
          @click="addProductBtn"
          outlined>
          <i class="far fa-edit"></i>&nbsp; Add Product
        </b-button>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-dropdown aria-role="list" class="is-right">
          <!-- <p class="tag is-success" slot="trigger" role="button"> -->
          <div slot="trigger" role="button" style="font-size: 20px; margin-right: 15px;">
            <i class="fas fa-user-circle"></i>
          </div>
          <!-- </p> -->
          <b-dropdown-item custom aria-role="menuitem">
            Logged as
            <b>{{getName}}</b>
          </b-dropdown-item>
          <hr class="dropdown-divider" aria-role="menuitem" />
          <b-dropdown-item value="settings">
            <b-icon icon="account"></b-icon>&nbsp;&nbsp;Profile
          </b-dropdown-item>
          <b-dropdown-item value="logout" aria-role="menuitem" @click="logout">
            <b-icon icon="logout"></b-icon>&nbsp;&nbsp;Logout
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
    getName () {
      return this.$store.state.user.name
    },
    isLogin () {
      return this.$store.state.loginStatus
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    addProductBtn () {
      this.$router.push({ name: 'form-product' })
    },
    submitRegister () {
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(data => {
          this.$refs.registerdropdown.toggle()
          this.$refs.logindropdown.toggle()
          this.$store.state.Toast.fire({
            icon: 'success',
            title: 'Register success, you need to login...'
          })
          this.name = ''
          this.email = ''
          this.password = ''
        })
        .catch(({ data }) => {
          data.message.forEach(errMsg => {
            this.$store.state.Toast.fire({
              icon: 'error',
              title: errMsg
            })
          })
        })
    },
    submitLogin () {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.$store.commit('SET_USER')
          this.$store.commit('CHANGE_LOGIN', true)
          this.$refs.logindropdown.toggle()
          this.$store.state.Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          if (data.isAdmin) {
            this.$store.commit('SET_ADMIN', true)
            this.$router.push('product-manager')
          }
          this.email = ''
          this.password = ''
        })
        .catch(({ data }) => {
          data.message.forEach(errMsg => {
            this.$store.state.Toast.fire({
              icon: 'error',
              title: errMsg
            })
          })
        })
    },
    logout () {
      this.$store.state.Toast.fire({
        icon: 'success',
        title: 'Logout success'
      })
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      this.$store.commit('SET_USER')
      this.$store.commit('SET_ADMIN', false)
      this.$store.commit('CHANGE_LOGIN', false)
      this.$router.push('/')
    }
  },
  created () {
    this.$store.commit('SET_USER')
  }
}
</script>

<style>

</style>
