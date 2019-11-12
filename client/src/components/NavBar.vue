<template>
    <div id="navbar">
        <nav id="nav-container" class="navbar navbar-expand-lg navbar-primary">
            <div class="container">
                <Slide width="250">
                    <div id="slider-menus">
                        <button type="button" class="btn slide-btns">Profile</button>
                        <button type="button" class="btn slide-btns">Cart</button>
                        <button type="button" class="btn slide-btns">Wishlist</button>
                        <button type="button" class="btn slide-btns">Logout</button>
                    </div>
                </Slide>
                <ShonenPlays />
                <RegisterButton />
                <LoginButton />
            </div>
        </nav>
    </div>
  
</template>

<script>
import { Slide } from 'vue-burger-menu'
import RegisterButton from './Register-btn'
import LoginButton from './Login-btn'
import ShonenPlays from './ShonenPlays'

export default {
    name: 'navbar',
    components: {
        Slide,
        RegisterButton,
        LoginButton,
        ShonenPlays
    }

}
</script>

<style>
#slider-menus {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.slide-btns {
    background-color: #0d3966;
    border: 2px solid white;
    color: white;
    font-weight: bold;
    width: 150px;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center
}

.slide-btns:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
}
.container {
    margin: 0
}
#nav-container {
    padding: 0;
    height: 85px;
    background-color:#222f3e;
    align-items: center;
    justify-content: flex-start
}

.bm-burger-button {
    position: fixed;
    width: 30px;
    height: 25px;
    left: 30px;
    top: 26px;
    cursor: pointer;
    background-color: rgba(109, 102, 102, 0.486)
}

.bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #0d3966;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-burger-bars {
    background-color: white
}

</style>