<template>
  <div class="home-page">
    <section class="PageHome_ImageTextSection PageHome_NewCollection">
      <div class="PageHomeTitleContainer text">
        <h4 class="text title t-title t-titile--big Appear AppearText words splitting Appear-appeared" style="--word-total:3; padding-right: 150px;">
          <p><strong>
              a<br>
              fine play<br>
              of the clay <br>
              soft and sift moistened<br>
              turns malleable gathered<br>
              comes out a beautiful craft
          </strong></p>
        </h4>
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

.PageHome_ImageTextSection {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  margin-right: 490px;
}

.PageHomeTitleContainer{
  display: flex;
  background-repeat: no-repeat;
  background-image: url('../assets/homepage.jpg');
  background-size: contain;
  height:800px;
  width: 1200px;
  justify-content: flex-end;
  align-items: flex-end;
}

p {
  font-family: 'Zilla Slab Highlight', cursive;
  font-size: 30px;
  text-align: right;
  /* letter-spacing: 7px; */
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
