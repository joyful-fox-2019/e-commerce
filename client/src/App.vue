<template>
  <v-app class="bg-standard">
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Alert></Alert>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Alert from './components/Alert'

export default {
  name: 'App',
  components: {
    Navbar,
    Alert
  }
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
