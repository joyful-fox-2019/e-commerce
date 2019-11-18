<template>
<div class="container">
    <form @submit.prevent="login">
        <h2 style="float:center;">Login</h2>
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
                <button class="button is-link" type="submit" style="background-color:grey;">Sign In</button>
            </div>
        </div>
    </form>
    <div class="registerShow">
        <center>
            <a href="#" @click="registerShow">Don't Have Account?</a>
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
            baseUrl: this.$store.state.baseUrl
        }
    },
    created() {
       
    },
    methods: {
        login () {
            let username = this.username
            let password = this.password
            this.$store.commit('LoginState', { username, password })
            this.$store.dispatch('Login')
        },
        registerShow() {
            this.$router.push({path:'/register'})
        }
    }
}
</script>

<style scoped> 

/* body {
    background-image: url('../../public/market.jpg')
} */

.container {
    width: 450px;
    margin-top: 130px;
    background-color: rgb(240, 180, 102);
    height: 400px;
    border-radius: 30px;
}

.label {
    float: left;
}

form {
    padding: 30px;
    margin-top: 100px;
}





</style>