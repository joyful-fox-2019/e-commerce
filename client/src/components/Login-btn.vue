<template>
  <div id="login">
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="column" id="main">
                        <h1 style="font-weight: bold;">Login: </h1> 
                        <hr>
                        <form @submit.prevent="login()">
                            <div class="form-group">
                            <label for="exampleInputEmail1">E-mail </label>
                            <input v-model="loginData.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail">
                            </div>
                            <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input v-model="loginData.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <button type="submit" @click="login()" data-dismiss="modal" class="btn btns">Login</button>
                        </form>
                    </div>
                    <div class="column" id="secondary">
                        <div class="sec-content">
                            <img id="sp-img" src="https://i.imgur.com/MTK7Egb.png" alt="">
                            <h2>Don't have an account? <p style="margin-top: 8px;font-weight: bold; font-size: 25px;"> Register here:</p></h2>
                            <button type="button" class="btn btns" data-dismiss="modal" data-toggle="modal" data-target="#registerModal">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  </div>
</template>

<script>
import { config } from '../config'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'login-btn',
  data () {
    return {
      loginData: {
          email: '',
          password: ''
      }
    }
  },
  methods: {
    login() {
      axios({
        method: 'post',
        data: {
            email: this.loginData.email,
            password: this.loginData.password
        },
        url: `${config.host}/login`
      })
        .then(({data}) => {
          Swal.fire(
            'Login Success!',
            `Welcome!`,
            'success'
          )
          if (data.power == 'admin') {
            localStorage.setItem('token', data.token)
            localStorage.setItem('power', data.power)
            this.loginData.email = ''
            this.loginData.password = ''
            this.$router.push('/admin')
            this.$store.dispatch('checkToken')
          } else {
            localStorage.setItem('token', data.token)
            this.loginData.email = ''
            this.loginData.password = ''
            this.$store.dispatch('checkToken')
          }
          
      })
      .catch(console.log)
    }
  }
}
</script>

<style scoped>
#sp-img {
  width: 140px;
  height: 140px;
  margin-bottom: 50px;
}

#login {
  margin-left: 20px;
}

.btns {
  background-color: #222F3E;
  border: 2px solid white;
  color: white;
  font-weight: bold;
}
.modal-body {
  display: flex;
  padding: 0;
  border-radius: 4rem;
}

.modal-content {
  border-radius: 4rem;
  width: 140%;
  -webkit-box-shadow: -1px -2px 42px -19px rgba(0,0,0,0.74);
  -moz-box-shadow: -1px -2px 42px -19px rgba(0,0,0,0.74);
  box-shadow: -1px -2px 42px -19px rgba(0,0,0,0.74);
}

.modal-content h1, .modal-content h2, .modal-content h3 {
  text-align: center;
}

.modal-content h1 {
  font-size: 1.3em;
  text-transform: uppercase;
}

.modal-content h2 {
  font-size: 1.1em;
}

.modal-content h3 {
  font-size: .8em;
  letter-spacing: 2px;
}

form {
  font-size: .8em;
}

.column {
  flex: 50%;
  padding: 10px;
}

.column#main {
  flex: 75%;
  padding: 50px;
  margin-top: 30px;
  margin-left: 15px;
}

#secondary {
  background-color: #0d3966;
  border-radius: 0 4rem 4rem 0;
  text-align: center;
}

#main .form-control {
  border-radius: 0;
  font-size: .9em;
}

.btn {
  text-transform: uppercase;
  border-radius: .15rem;
  width: 150px;
  height: 40px;
  padding: .150rem .75rem;
  margin: 30px auto;
  letter-spacing: 2px;
}

.btns:hover {
  background-color: white;
  color: black;
  border: 2px solid black;
}

#main .btn-primary {
  width: 100%;
}

#secondary .btn-primary {
  background: #f8f9fa4f;
  color: #000;
}

.modal-body label {
  margin-bottom: 0;
}

.sec-content {
  margin-top: 30%;
  color: white;
}
</style>