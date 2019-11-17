<template>
  <div>
    <h3><v-icon name='user' class='vicon'></v-icon> &nbsp; Profile</h3>
    <div class="card">
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Biodata" active>
              <b-card-text class='cardProfile'>
                <div class="card profile">
                  <CardProfile />
                </div>
                <div class="biodata">
                  <v-icon name='user' class='vicon'></v-icon> &nbsp; &nbsp;<strong>Biodata</strong>
                  <div class="d-flex flex-column">
                      <div class='nameBiodata'>
                        <div class='d-flex'>
                          <div class='mr-3'>
                            Username :
                          </div>
                          <div class='ml-3'>
                            {{ user.username }}
                          </div>
                        </div>
                        <div class="d-flex">
                          <div class='mr-3'>
                            Address :
                          </div>
                          <div class='ml-3'>
                            <ul>
                              <li style='display: block' v-for='(address, i) in address' :key='i'>{{i+1}} &nbsp;{{ address }}</li>
                            </ul>
                            
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="biodata">
                      <v-icon name='contact' class='vicon'></v-icon> &nbsp; &nbsp;<strong>Contact</strong>
                      <div class='nameBiodata'>
                        <div class='d-flex'>
                          <div class='mr-3'>
                            Email :
                          </div>
                          <div class='ml-3'>
                            {{ user.email }}
                          </div>
                          <div class="verification ml-2">
                            <b-badge disabled variant="warning" v-if='!verification && !load && !inputCode'>Unverification</b-badge>
                            <b-badge disabled variant="success" v-else-if='verification && !load'>Verification</b-badge>
                            <form v-if='inputCode' @submit='confirmVerify'>
                              <input type='text' v-model='secret' placeholder="secret code">
                            </form>
                          </div>
                          <div>
                            <b-button variant="success" v-if='!verification' @click="sendMail" :disabled='btnVerify' :class="classVerification">
                              <a v-if='!load'>Verify Now</a>
                              <a v-else>
                                <b-spinner type="grow" label="Loading..."></b-spinner>
                              </a>
                            </b-button>
                          </div>
                        </div>
                        <div class="d-flex">
                          <div class='mr-3'>
                            Address :
                          </div>
                            <button class="btn-outline-success btn btn-sm ml-4" v-if='!isAddress' @click='isAdress'>Change</button>
                            <div v-if='isAddress'>
                              <input type="text" placeholder="Add Address" v-model='newAddress'>
                            <button class="btn-outline-success btn btn-sm ml-4" v-if='isAddress' @click='saveAddress'>Save</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Tab 2">
              <b-card-text>Coming Soon</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import CardProfile from '@/components/ProfileComponent/CardProfile.vue'
import axios from '@/apis/server.js'

export default {
  data () {
    return {
      classVerification: 'mb-2 ml-3 btn-sm',
      load: false,
      textBtn: 'Verify Now',
      inputCode: false,
      secret: '',
      btnVerify: false,
      newAddress: '',
      isAddress: false
    }
  },
  methods: {
    saveAddress () {
      const address = this.newAddress;
      axios({
        method: 'patch',
        url: '/users',
        data: {
          address
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          return this.$store.dispatch('checkSignIn')
        })
        .then(() => {
          this.$awn.success('success update address')
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    isAdress () {
      this.isAddress = true
    },
    makeToast(variant = null, data) {
      this.$bvToast.toast(data.msg, {
        title: data.title,
        variant: variant,
        solid: true
      })
    },
    sendMail () {
      this.load = true;
      this.btnVerify = true;
      axios({
        method: 'post',
        url: '/users/sendcode',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.load = false
          this.makeToast('success', {msg: data.msg, title: 'Success Sent Email'})
          this.inputCode = true;
          setTimeout(() => {
            this.btnVerify = false;
          }, 5000);
          setTimeout(() => {
            this.inputCode = false
          }, 120000);
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    confirmVerify () {
      axios({
        method: 'patch',
        url: '/users/verify',
        data: {
          code: this.secret
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$router.push('/home')
          this.$awn.success(data.msg)
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  components: {
    CardProfile
  },
  computed: {
    user () {
      return this.$store.state.userSignin
    },
    address () {
      // if(this.$store.state.userSignin.address.length == 0) {
      //   return 
      // } else {
        return this.$store.state.userSignin.address
      // }
    },
    verification () {
      return this.$store.state.userSignin.verification
    }
  },
  watch: {
    secret: {
      handler (val) {
        if(val) {
          setTimeout(() => {
            console.log('masuk ', val)
            this.confirmVerify()
          }, 5000);
        }
      }
    },
    verification: {
      handler (val) {
        if (val) {
          this.verification = val
        }
      }
    }
  },
  created () {
    console.log('lelel')
  }
}
</script>

<style scoped>
.address {
  display: flex;
}
.biodata {
  padding: 15px;
  color: black;
}
.nameBiodata {
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
strong {
  font-size: 25px;
}
.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #E6E6E6;
}
.profile {
  margin-left: 15px;
  margin-top: 15px;
  background-color: #B9BBB7;
  width: 30%;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius:24px;
  border:none;
  box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.2);
  transition:all .3s;
}
.cardProfile {
  display: flex;
}
</style>