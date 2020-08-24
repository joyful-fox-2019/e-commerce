<template>
  <div class="home-page">
    <section class="home-section">
      <div class="front">
        <!-- <div class="pict"> -->
          <figure class="image is-rounded">
          <img src="../assets/homepage.jpg" alt="tembikar" weight="1000" height="1000">
          </figure>
        <!-- </div> -->
        <div class="text">
          <h1 class="title"> HAND-CRAFTED &nbsp; <br /> STONEWARES</h1>
          <p>
            an inorganic compound, non-metalic, <br>
            solid material comprising metal, non-metal or <br>
            metalloid atoms primarily
          </p>
        </div>
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
@import url("https://fonts.googleapis.com/css?family=Zilla+Slab+Highlight&display=swap");
@import url("https://fonts.googleapis.com/css?family=Playfair+Display&display=swap");
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Alice|Calistoga|Cormorant|Cormorant+Garamond|Playfair+Display+SC|Prata&display=swap');

.front {
  display: flex;
  flex-direction: row;
  margin-left: 15vw;
  margin-top: 50px;
}
.text {
  margin-left: 7vw;
  margin-top: 230px;
}
h1 {
  font-family: "Playfair Display", serif;
  font-weight: 500;
  letter-spacing: 12px;
  font-size: 50px;
}
p {
  font-family: "Playfair Display", serif;
  font-size: 17px;
  text-align: center;
  letter-spacing: 3px;
  display: flex;
  justify-content: center;
  font-weight: 20;
}

@media only screen and (max-width: 1216px) {
  .front {
    flex-direction: column;
    margin-right: 150px;
  }
}

@media only screen and (max-width: 1408px) {
  .front {
    margin-right: 150px;
  }
}

/* font-family: 'Abril Fatface', cursive;
font-family: 'Calistoga', cursive;
font-family: 'Prata', serif;
font-family: 'Alice', serif;
font-family: 'Playfair Display SC', serif;
font-family: 'Cormorant', serif;
font-family: 'Cormorant Garamond', serif; */
</style>
