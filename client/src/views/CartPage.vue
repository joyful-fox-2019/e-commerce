<template>
  <div class="container cartPage border">
    <div class="cartPage">
      <div class="col-9 border">
        
        <div class="title">
          <b-alert variant="success" show>check your groceries</b-alert>
        </div>

        <div class='loppCart' v-for='(cart, i) in carts' :key='i'>
          <CartComponent :get-cart='cart' :status='status' @change='okchange'></CartComponent>
        </div>



      </div>
      <div class="col-3 border">
        <div class="container2">
          <div class="row valign-wrapper">
            <div class="col s6 offset-s3 valign">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <div class="cardTitle" style='padding: 2px'>
                    <h3><span class="card-title" style='padding: 10px'>Shopping Summary</span></h3>
                    <hr>
                    <div class="card-action rightC">
                      <div>Total: </div>
                      <div>{{ totalPrice }}</div>
                    </div>
                    <div class="btn btnCart">
                      <b-button id="show-btn" class='btnprocess' style='background-color: #FA591D' @click="goTransaction">Process Now</b-button>
                    </div>



    <b-modal ref="my-modal" hide-footer title="Transaction Success">
      <div class="d-block text-center" v-if='getTransaction'>
        <h3>Your transaction ID : {{getTransaction._id}} </h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>  
    </b-modal>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CartComponent from '@/components/CartComponent/CartComponent.vue'

export default {
  data () {
    return { 
      getTransaction: null,
      status: 0
    }
  },
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    goTransaction () {
      
      this.$awn.asyncBlock(
        this.$store.dispatch('createTransaction'),
        null,
        null,
        'Creating Transaction'
      )
        .then(transaction => {
          this.getTransaction = transaction;
          setTimeout(() => {
            this.showModal()
          }, 1000);
        })
        .catch(err => {
          this.$awn.warning(err)
        })
    },
    okchange (status, name) {
      if(status) {
        this.status += Number(name)
      } else {
        this.status -= Number(name)
      }
    }
  },
  components: {
    CartComponent
  },
  computed: {
    ...mapState(['userCart']),

    carts () {
      return this.userCart.product
    },


   totalPrice() {
     const number_string = this.status.toString();
     const remainder = number_string.length % 3;
     let money = number_string.substr(0, remainder);
     const thousand = number_string.substr(remainder).match(/\d{3}/g);
     if (thousand) {
       const separator = remainder ? "." : "";
       money += separator + thousand.join(".");
     }
     return `Rp. ${money}`;
   }
  },
  watch: {
    status: {
      handler (val) {
        if(val) {
          this.status = val;
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.btnCart2 {
  display: flex;
  justify-content: center;
  width: 100% !important;
  background-color: #FA591D;
  border-radius: 20px
}
.rightC {
  display: flex;
  flex-direction: row;
  justify-content: space-around
}
.textCart {
  display: flex;
  flex-direction: column
}
.container {
  min-width: 1600px
}
.cartPage {
  display: flex;
  width: 100%;
  margin-top: 20px
}
.card-content {
  width: 350px !important
}
.container2  {
  margin-top: 20px;
  display: flex;
  position: absolute;
  border-radius: 20px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.container2 .row {
  margin: 0 auto;
}

.mdl-card + .mdl-card {
  margin-top: 40px;
}

// Card styles

.mdl-card--horizontal {
  flex-direction: column;
  height: 1vh; /* 1 */
  padding-left: 150px;
  width: 100%;
  
  .mdl-card__media {
    left: 0;
    position: absolute;
    width: 150px;
  }
  
  .mdl-card__supporting-text {
    flex: 1 1 auto;
    width: auto;
  }
}

.mdl-card--horizontal-2 {
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 0px;
  
  .mdl-card__title {
    align-items: flex-start;
    flex-direction: column;
    flex: 1 auto;
    float: left;
  }
  .mdl-card__title-text {
    align-self: flex-start;
  }
  .mdl-card__media {
    flex: 0 auto; 
    float: right;
    height: 112px;
    margin: 16px 16px 0 0;
    width: 112px;
  }
  .mdl-card__actions {
    clear: both;
    flex: 1 auto; 
  }
}
</style>