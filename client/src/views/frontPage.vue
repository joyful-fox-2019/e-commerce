<template>
  <div id="front-page" v-if='!loginStatus'>
      <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <div class="sticky-top">
            <!-- gunakan sticky-top untuk navbar -->
                <nav class=" navbar navbar-expand-md navbar-dark bg-dark d-flex justify-content-between h1 p-0">
                    <div class="nav navbar d-flex justify-content-start">
                        <div class="">
                            <!-- <img style="cursor: pointer; width : 40px" src="./img/logo.png" alt="">                     -->
                            <!-- <span class="navbar-text text-white">Buka Toko</span> -->
                            <router-link class="navbar-text text-white" to="/">Buka Toko</router-link>
                        </div>
                    <!-- Ul itu tempat untuk taruh tulisan list -->
                        <!-- <img class="cursor: pointer ml-4" style="cursor: pointer; width : 50px" src="./img/new.png" alt="">           -->
                    </div>
                    <ul class="nav justify-content-end navbar-nav">
                        <li class="nav-item pr-3">
                            <router-link to="/login"><i class="fa fa-sign-in"></i></router-link>
                        </li>
                        <li class="nav-item pr-3">
                            <router-link to="/register"><i class="fa fa-user-plus"></router-link>
                        </li>
                    </ul>
                </nav>
        </div>
        <div style="width: 90%; margin:10px auto;" id="frontpage">
            <div style="width: 40%; margin: 10px auto;" >
                <h4 class="display-4 text-center" style="padding-bottom: 10px;" >Get Start For Free</h4>
                <form id="register" v-if='toRegister' @submit.prevent='register' class="border p-3 bg-white">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input v-model="email_register" id="email" type="email" class="form-control" required  placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="username_register" id="username" type="text" class="form-control" required placeholder="Enter username">
                    </div>
                    <div class="form-group">
                        <label for="password_register">Password</label>
                        <input v-model="password_register" id="password" type="password" class="form-control" required placeholder="Password">
                    </div>
                    <div class="form-inline" style="margin: 5px auto;">
                        <button type="submit" class="btn btn-secondary btn-sm btn-block mt-2">Register</button>
                    </div>
                </form>

                <form id="login" v-if='toLogin' class="border p-3">
                    <div class="form-group">
                        <label for="email_login" >Email address</label>
                        <input id="email_login" v-model='email_login' type="email" class="form-control" required  placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1" >Password</label>
                        <input id="password_login" v-model='password_login' type="password" class="form-control" required placeholder="Password">
                    </div>
                    <div class="form-inline" style="margin: 5px auto;">
                        <button  type="submit" class="btn btn-secondary btn-sm btn-block mt-1" @click.prevent='login' >Sign In</button>
                        <!-- ini login google -->
                        <div id="google" class="g-signin2 pl-3 mr-3" data-onsuccess="onSignIn"></div>
                        <!-- ini login facebook -->
                        <div  data-scope="email, public_profile"
                            onlogin="checkLoginState();"  class="fb-login-button" data-size="medium" data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false">
                        </div>
                        <div id="status"></div>
                    </div>
                </form>
            </div>

        </div>
    </div>
    <!-- front-page end -->
</template>

<script>
export default {

}
</script>

<style>

</style>
