<template>
  <div class="home" v-if="!this.$store.state.showCart">
    <Navbar />
    <LandingPage />
    <Introduction />
    <Product v-if="!this.$store.state.showDesc" />
    <Description v-if="this.$store.state.showDesc" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import LandingPage from "@/components/LandingPage.vue";
import Introduction from "@/components/IntroductionCard.vue";
import Product from "@/components/ProductCard.vue";
import Footer from "@/components/FooterContent.vue";
import Description from "@/components/DescriptionCard.vue";

export default {
  name: "home",
  components: {
    Navbar,
    LandingPage,
    Introduction,
    Product,
    Footer,
    Description
  }
};
</script>
