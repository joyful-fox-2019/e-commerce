<template>
  <div class="home-page">
    <section class="PageHome_ImageTextSection PageHome_NewCollection">
      <div class="PageHomeTitleContainer text">
        <h4 class="text title t-title t-titile--big Appear AppearText words splitting Appear-appeared" style="--word-total:3; padding-right: 150px;">
        </h4>
      <!-- <p><strong>
              a fine play of the clay soft and sift moistened<br>
              turns malleable gathered comes out a beautiful craft
          </strong></p> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Zilla+Slab+Highlight&display=swap');
@import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');

.PageHome_ImageTextSection {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  margin-right: 490px;
  text-align: center;
}

.PageHomeTitleContainer{
  display: flex;
  background-repeat: no-repeat;
  background-image: url('../assets/homepage.jpg');
  background-size: contain;
  height:800px;
  width: 1200px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

p {
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  text-align: center;
  letter-spacing: 3px;
  display: flex;
  justify-content: center;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
