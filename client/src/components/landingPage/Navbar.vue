<template>
    <div class="navbar">
        <header>
            <img class="logo" src="../../assets/images/logoHome.png" alt="logoHome">
            <nav class="navbod">
                <ul class="nav_links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Forum</a></li>
                </ul>
            </nav>
            <a href="" class="cta"><button>Log Out</button></a>
        </header>
    </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500&display=swap');
  .navbar {
    font-family: 'Montserrat', sans-serif;
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
    background-image: url('../../assets/images/navtop.png');
    clear: both;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    position: fixed;
  }
  .navbod {
      padding-top: 10px;
  }
  li, a, button {
    font-weight: 500;
    font-size: 16px;
    color: #edf0f1;
    text-decoration: none;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10%;
    top: 0;
    width: 100%;
  }
  .logo {
    cursor: pointer;
    width: 70px;
    height: 50px;
    background: rgba(0, 0, 0, 0);
  }
  .nav_links {
    list-style: none;
  }
  .nav_links li {
    display: inline-block;
    padding: 0px 20px;
    top: 10px;
  }
  .nav_links li a {
    transition: all 0.3s ease 0s;
  }
  .nav_links li a:hover {
    color: #0088a9;
    text-decoration: none;
  }
  button {
    margin: 2px 0px;
    padding: 9px 25px;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
  button:hover {
    color: red;
  }
</style>
