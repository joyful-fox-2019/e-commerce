<template>
    <nav id="sidebar">
        <div id="dismiss">
            <i class="fas fa-chevron-left"></i>
        </div>

        <div class="sidebar-header">
            <img src="../../public/logo.png" alt="logo" style="width:150px;">
        </div>

        <ul class="list-unstyled components">
            <img src="../../public/logo-text2.png" alt="logo" style="width:180px;">
            <li class="active">
                <a href="">Home</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>

        <ul class="list-unstyled CTAs">
            <li>
                <a href="" class="register">Register</a>
            </li>
            <li>
                <a href="" class="login">Login</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
a {
    color: white;
}
</style>
