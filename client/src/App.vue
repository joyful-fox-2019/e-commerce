<template>
  <v-app class="bg-standard">
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
      <template>
  <div>
    <div class="text-center mb-4">
      <v-btn
        color="primary"
        @click="alert = !alert"
      >
        Toggle
      </v-btn>
      </div>
      <div class="alert">
      <v-alert
        :value="alert"
        icon="mdi-alert"
        border="left"
        prominent
        class="bg-primary"
      >
        Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur at lacus ac velit ornare lobortis.
      </v-alert>

      </div>
    </div>
</template>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    alert: true
  })
}
</script>

<style>
:root {
  --background-color: #FFFFFF;
  --surface-color: #202020;
  --primary-color: #E6252A;
  --secondary-color: #0282F9;
  --on-background-color: #202020;
  --on-surface-color: #FFFFFF;
  --on-primary-color: #FFFFFF;
  --on-secondary-color: #FEFEFE;
}
.bg-standard {
  background: var(--background-color) !important;
  color: var(--on-background-color) !important;
}
.bg-surface {
  background: var(--surface-color) !important;
  color: var(--on-surface-color) !important;
}
.bg-primary {
  background: var(--primary-color) !important;
  color: var(--on-primary-color) !important;
}
.bg-secondary {
  background: var(--secondary-color) !important;
  color: var(--on-secondary-color) !important;
}
.clickable {
  cursor: pointer;
}
.full-width {
  width: 100% !important;
}
hr {
  border-top: 1px solid #E0E0E0;
  width: 80%;
  margin: auto;
}
.alert {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  margin-right: 10%;
}
</style>
