<template>
  <v-app class="bg-standard">
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
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
    //
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
.clickable {
  cursor: pointer;
}
</style>
