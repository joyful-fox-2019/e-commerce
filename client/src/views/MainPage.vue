<template>
  <div id='product'>
    <div class="headProduct border">
        <textra :data='words' :timer="3.1" :infinite='true' filter="scale"/>
    </div>
    <div class='card mt-3'>
      <div class='textCategory'>
        <h4>Preferred category</h4>
        <div class="badgeCategory">
          <div v-for='(category, i) in categories' :key='i' class='ml-1' pill>
            <b-badge pill variant="light" @click='findCategory(category)' class='badgec'>{{ category }}</b-badge>
          </div>
        </div>
      </div>
    </div>
      <div class="card border mt-3" id='nestedMainPage'>
        <router-view />
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: ['Welcome to Dc Emporium', 'Get benefit, family price', 'Take your profit, create your store now', 'by @dreamcarr_'],
    }
  },
  methods: {
    findCategory(name) {
      this.$router.push(`/home/${name}`)
    }
  },
  computed: {
    categories () {
      return this.$store.state.allCategory
    },
    rows () {
      return this.categories.length
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Yeon+Sung&display=swap');

#product {
  padding: 5px;
}
.headProduct {
  text-align: center;
  font-size: 30px;
  font-family: 'Yeon Sung', cursive;
}
.textCategory {
  padding: 10px;
}
.badgeCategory {
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
}
.badgec {
  font-size: 20px;
  color: #41B549 !important;
}
.badgec:hover {
  color: #FF6E44 !important;
}
#nestedMainPage {
  height: 75vh;
  overflow: auto;
}
</style>