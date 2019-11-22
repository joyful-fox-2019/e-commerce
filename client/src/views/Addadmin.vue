<template>
  <div>
    <q-page class="row justify-center items-center" >
    <q-card square class="shadow-24" style="width:700px; height:450px;">
      <q-card-section class="bg-blue-grey-5">
        <img alt="Quasar logo" src="../assets/logo.png" style="width:100px; height:80px;">
        <div class="text-h4 absolute-right" style="margin-top:40px; margin-right:10px;">Add Admin</div>
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
        <q-btn @click.prevent="registerAdmin" unelevated size="lg" color="blue-grey-14" class="full-width text-white" label="Register Admin" />
      </q-card-actions>
    </q-card>
  </q-page>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name:'Addadmin',
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods:{
    registerAdmin(){
      let payload = {
        email: this.email,
        username: this.username,
        password: this.password,
        role: 'admin'
      }
      console.log(payload)
      this.$store.dispatch('registerAdmin', payload)
        .then(data => {
          Swal.fire({
            title: 'Success',
            text: `Success Register Admin ${data.username}`,
            icon: 'success'
          }),
          this.$router.push('/')
        })
        .catch( (err) => {
          this.next(err)
        })
    }
  }
}
</script>

<style>

</style>