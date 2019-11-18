<template>
  <div class="m-3">
     <div class="logo">
          <img @click="changePage('/')" style="cursor: pointer;" src="../assets/logo.png" alt="">
     </div>
     <div class="d-flex justify-content-center m-5">
         <div class="svg">
             <img src="https://ecs7.tokopedia.net/img/content/register_new.png" alt="">
             <h4>Jual Beli Mudah Hanya di Tokopedia</h4>
             <p>Gabung dan rasakan kemudahan bertransaksi di Tokopedia</p>
         </div>
         <div class="from">
             <h4>Daftar Sekarang</h4>
             <form @submit.prevent="register" action="">
             <input v-model="email" class="input" type="text" placeholder="Enter email">
             <input v-model="password" class="input" type="password" placeholder="Enter password">
             <textarea v-model="address" name="" id="" cols="30" rows="3" placeholder="Enter address"></textarea>
             <input type="submit" class="btn btn-success w-75" value="Daftar">
             </form>
         </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'register-page',
  data () {
    return {
      email: '',
      password: '',
      address: ''
    }
  },
  methods: {
    register () {
      let email = this.email
      let password = this.password
      let address = this.address
      this.$store.dispatch('REGISTER', { email, password, address })
        .then(() => {
          this.email = ''
          this.password = ''
          this.address = ''
          if (localStorage.getItem('token')) {
            this.$router.push('/')
          }
        })
    },
    changePage (link) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.logo img{
    width: 300px;
    height: auto;
}

.svg{
    margin-right: 100px;
}

.svg img{
    width: 350px;
    height: auto;
}

.from{
    width: 450px;
    height: 400px;
    border-radius: 10px;
    padding: 25px;
    box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.14);
}

.input, textarea{
    width: 80%;
    margin: 10px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid gray;
}

</style>
