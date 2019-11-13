<template>
  <div>
    <v-toolbar class="bg-surface">
      <v-container>
        <v-row no-gutters>
          <v-col>
              <SignInButton></SignInButton>
          </v-col>
          <v-col class="text-center">
            OMNIVERSE
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-toolbar-items>
        <v-btn class="bg-surface" text>Link 1</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-title class="bg-primary logo">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template> -->
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

<style scoped>
.logo {
  height: 100% !important;
}
</style>
