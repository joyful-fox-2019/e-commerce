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
      <b-navbar-dropdown hoverable label="Category">
        <b-navbar-item tag="router-link" to="/about">
          About
        </b-navbar-item>
        <b-navbar-item>
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item tag="div" style="width: 60vw;">
        <b-field position="is-centered" style="width: 100%;">
          <b-input placeholder="Enter your keyword..." type="search" expanded>
          </b-input>
          <p class="control">
            <button class="button is-info"><i class="fas fa-search"></i></button>
          </p>
      </b-field>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
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
              <form>
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
          <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
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
              <form>
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
  methods: {
    submitLogin () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    },
    submitRegister () {

    }
  }
}
</script>

<style>

</style>
