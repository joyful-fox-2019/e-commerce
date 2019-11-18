<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="11" md="12">
        <b-card-group class="mt-4" columns>

          <b-card v-for="(game,index) in gameList" :key="index" style="border: none" bg-variant="dark" :img-src="game.imgUrl" img-alt="Image" img-top>
            <p style="font-size: 25px" class="m-0 text-white"><b>{{ game.name }}</b></p>
            <small class="text-white">Quantity : {{ game.qty }} left</small>
            <template v-slot:footer>
              <div class="d-flex justify-content-right">
                <b-button disabled class="btn-sm mr-2">${{ game.price }}</b-button>
                <b-button @click="cartProcess(game._id)" class="btn-sm mr-2"><font-awesome-icon class="mr-2" icon="shopping-cart"></font-awesome-icon>Add to cart</b-button>
              </div>
            </template>
          </b-card>

        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '../config/getdata'

export default {
  name: 'home',
  components: {},
  data () {
    return {

    }
  },
  methods: {
    cartProcess (id) {
      if (this.loginStatus) {
        axios({
          url: `/carts/addToCart/${id}`,
          method: 'patch',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            this.successToast(data.message)
          })
          .catch(err => {
            console.log(err.response.data)
            this.next(err.response.data)
          })
      } else {
        this.next({ message: 'You must login to continue!' })
        this.$router.push({ path: '/login' })
      }
    },
    fetchData () {
      this.$store.dispatch('fetchGameData')
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.login
    },
    gameList () {
      return this.$store.state.gameList
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
