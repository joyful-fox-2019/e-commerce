<template>
  <div>
    <div class="profile">
      <div class="topProfile border">
        <div class="imgProfile">
          <img :src='image'>
        </div>
        <div class="nameProfile ml-3">
          <h3 class='textProfile' @click='profilePage'>{{ name }}</h3>
        </div>
      </div>
      <div class="footProfile mt-4 border">
        <div class="nostore" v-if='!store'>
          <small>You don't have a store yet</small>
          <router-link to='/store/create'><button class="btn btn-success btnStore btn-sm">Open Shop</button></router-link>
          <small><v-icon name='bar-chart' class='vicon'></v-icon>Make a store for free</small>
        </div>
      </div>
      <div class='storeProfile border' v-if='store'>
        <div class="topProfile">
          <div class="nostore">
            <div class="imgProfile">
              <img :src='store.store_image'>
            </div>
          </div>
          <div class="nameProfileStore ml-3">
            <router-link to='/store'><h3 class='textProfile'><v-icon name='star' class='vicon'></v-icon>{{ store.name }}</h3></router-link>
          </div>
      </div>
        <div class='location'>
          <small>Location: </small>{{store.location}}
        </div>
      </div>
      <div class="border mt-3">
        <h5>My Profile </h5>
        <div class='mt-2 ml-3'>
          <b-button class='link' @click='seeWishList'>
            Wish List
            <b-badge variant="light">{{ userr.WishList.length }}</b-badge>
          </b-button>
        </div>
        <div class='mt-2 ml-3'>
          Admin Page
        </div>
      </div>
      <div class="border mt-3" v-if='store'>
        <h5>My Store</h5>
        <div class='mt-2 ml-3'>
          <router-link to='/product/create' class='link'><v-icon name='plus' class='vicon'></v-icon>Create Product</router-link>
        </div>
        <div class='mt-2 ml-3'>
          Admin Page
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    profilePage () {
      this.$router.push({ name: 'profile' })
    },
    seeWishList () {
      this.$router.push('/profile/wishlist')
    }
  },
  computed: {
    image () {
      return this.$store.state.userSignin.profile_image
    },
    name () {
      console.log(this.$store.state.userSignin)
      return this.$store.state.userSignin.username
    },
    store () {
      return this.$store.state.userStore
    },
    userr () {
      return this.$store.state.userSignin
    }
  },
  watch: {
    image: {
      handler (val) {
        if(val) {
          this.image = val;
        }
      }
    },
    name : {
      handler (val) {
        if(val) {
          this.name = val;
        }
      }
    },
    store : {
      handler (val) {
        if(val) {
          this.store = val
        }
      }
    },
    userr: {
      handler (val) {
        console.log(val)
        if(val) {
          this.userr = val
        }
      }
    }
  },
  created () {
    console.log(this.$store.state.userSignin)
  }
}
</script>

<style>
.location {
  font-size: 20px;
  margin-top: -15px
}
.storeProfile {
  display: flex;
  flex-direction: column;
}
.nostore {
  display: flex;
  flex-direction: column;
}
.profile {
  display: flex;
  flex-direction: column;
  height: 50vh
}
.topProfile {
  height: 4vw;
  display: flex;
  align-items: center
}
.imgProfile img {
  width: 3vw
}
.textProfile {
  font-size: 1vw;
  color: #41B549;
}
.textProfile:hover {
  color: #FF6E44;
  cursor: pointer;
}
.link {
  color:#41B549 
}
.link:hover {
  color: #FF6E44;
}
.vicon {
  width: 15px
}
.btnStore {
  color: black !important;
  width: 100% !important
}
.btnStore:hover {
  color: #FF6E44 !important;
  background-color: white !important
}
</style>