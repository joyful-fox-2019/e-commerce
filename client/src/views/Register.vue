<template>
<div class="container">
    <form @submit.prevent="register">
        <h2 style="float:center;">Register</h2>
        <div class="field">
        <label class="label" style="float: left;">Username</label>
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Username" v-model="username">
            <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
            </span>
        </div> 
        </div>

        <div class="field">
        <label class="label" style="float: left;">Email</label>
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="email" placeholder="Email" v-model="email">
            <span class="icon is-small is-left">
            <i class="fas fa-envelope-open-text"></i>
            </span>
        </div> 
        </div>

        <div class="field">
            <label class="label" style="float:left;">Password</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Password" v-model="password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </div>
        </div>
        <br>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" type="submit" style="background-color:grey;">Sign Up</button>
            </div>
        </div>
    </form>
    <div class="registerShow">
        <center>
            <a href="#" @click="loginShow">Already have account? Click here..</a>
        </center>
    </div>
</div>
</template>

<script scoped>
import axios from 'axios'
import store from '../store/index'

export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: '',
            isLogin: false,
            email: ''
        }
    },
    created() {
       
    },
    methods: {
        register () {
            let username = this.username
            let email = this.email
            let password = this.password
            this.$store.commit('RegisterState', { username, email,password })
            this.$store.dispatch('Register')
        },
        loginShow() {
            this.$router.push({path:'/login'})
        }
    }
}
</script>

<style scoped> 

/* body {
    background-color: rgb(157, 194, 226);
} */

.container {
    width: 450px;
    margin-top: 130px;
    background-color: rgb(240, 180, 102);
    height: 500px;
    border-radius: 30px;
}

.label {
    float: left;
}

form {
    padding: 30px;
    /* margin-top: 200px; */
}





</style>