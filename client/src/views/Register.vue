<template>
  <div>
    <q-page class="row justify-center items-center" >
    <q-card square class="shadow-24" style="width:700px; height:450px;">
      <q-card-section class="bg-blue-grey-5">
        <img alt="Quasar logo" src="../assets/logo.png" style="width:100px; height:80px;">
        <div class="text-h4 absolute-right" style="margin-top:40px; margin-right:10px;">Register</div>
        <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
          <q-btn fab icon="close" color="blue-grey-7" to="/login" exact />
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm q-pt-xl">
          <q-input square clearable v-model="username" type="username" label="Username">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input square clearable v-model="email" type="email" label="Email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input square clearable v-model="password" type="password" label="Password">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-lg">
        <q-btn @click.prevent="klikregister" unelevated size="lg" color="blue-grey-14" class="full-width text-white" label="Register" />
      </q-card-actions>
    </q-card>
  </q-page>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "RegisterHome",
  data () {
  return {
    email: '',
    username: '',
    password: ''
  }
  },
  methods:{
    klikregister(){
      let payload = {
        email: this.email,
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('register', payload)
        .then(data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('role', data.role)
          this.$store.dispatch('auth')
          Swal.fire({
            title: 'Success',
            text: `Success Register ${data.username}`,
            icon: 'success'
          }),
          this.$router.push('/')
        })
        .catch( (err) => {
          this.next(err.data)
        })
    }
  }
}
</script>

<style>

</style>