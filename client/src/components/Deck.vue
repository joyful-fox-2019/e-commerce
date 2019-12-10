<template>
  <div class="d-flex flex-wrap justify-content-around">
    <div v-for="game in games" :key="game._id">
      <b-card no-body class="mb-2">
        <a href="" @click.prevent="onDetail(game._id)">
          <b-card-img :src="game.image" :alt="game.title" style="width:305px"></b-card-img>
        </a>
        <b-card-text>{{game.price}}</b-card-text>
      </b-card>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Deck',
  computed: {
    games () {
      return this.$store.state.games
    }
  },
  methods: {
    onDetail (gameId) {
      this.$router.push(`/detail/${gameId}`)
    }
  },
  created () {
    this.$store.commit('getAllGame')
  }
}
</script>

<style>
</style>
