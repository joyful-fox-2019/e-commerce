<template>
  <div>
    <h2 class="mt-5 mt-md-2 mb-4 text-white">
      Game Stock List
    </h2>
    <div>

      <!-- Data Header -->
      <b-row no-gutters>
        <b-col>
          <b-card class="mb-2 border-dark bg-dark" style="font-size:17px;">
            <b-row class="text-dark align-items-center">
              <b-col class="border-right text-center" cols="2">
                <b class="text-light">No.</b>
              </b-col>
              <b-col class="border-right" cols="6">
                <b class="text-light">Game Title</b>
              </b-col>
              <b-col class="border-right text-center" cols="2">
                <b class="text-light" style="font-size:13px;">Price</b>
              </b-col>
              <b-col class="text-center" cols="2">
                <b class="text-light">Qty.</b>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- Article List -->
      <Gamelistbar
        style="cursor:pointer;"
        v-for="(data,index) in gameList"
        :key='index'
        :title="data.name"
        :stock="data.qty"
        :price="data.price"
        :gameId="data._id"
        :no="index+1"
      ></Gamelistbar>

    </div>
  </div>
</template>

<script>
import Gamelistbar from '../components/Gamelistbar'

export default {
  name: 'Gamelist',
  components: {
    Gamelistbar
  },
  data () {
    return {}
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchGameData')
    }
  },
  computed: {
    gameList () {
      return this.$store.state.gameList
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
