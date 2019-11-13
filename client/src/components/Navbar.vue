<template>
  <div>
    <v-toolbar class="bg-surface">
      <v-container>
        <v-row no-gutters
          align="center"
          justify="center"
        >
          <v-col>
            <SignInButton></SignInButton>
          </v-col>
          <v-col class="text-center">
            <div class="logo">
              OMNIVERSE
            </div>
          </v-col>
          <v-col>
            <div class="hidden-sm-and-down text-center">
              <v-btn v-if="$store.state.user._id && !$store.state.user.isAdmin" class="bg-surface nav-button"><v-icon>mdi-cart</v-icon></v-btn>
              <v-btn v-if="$store.state.user._id && !$store.state.user.isAdmin" class="bg-surface nav-button"><v-icon>mdi-account</v-icon></v-btn>
              <v-btn v-if="$store.state.user._id && $store.state.user.isAdmin" class="bg-primary nav-button"><v-icon>mdi-plus</v-icon>Add Product</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </div>
</template>

<script>
import SignInButton from './SignInButton'

export default {
  name: 'Navbar',
  components: {
    SignInButton
  }
}
</script>

<style>
</style>
