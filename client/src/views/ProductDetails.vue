<template>
  <div id="product-details">
    <Navbar />
    <img id="product-details-header" src="https://i.imgur.com/W2f5MHP.png" alt="">
    <center>
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div id="product-card" class="card mb-3">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img :src="detailsProduct.img" class="card-img" alt="...">
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <h3 class="card-title">Information</h3> <hr>
                    <div id="card-information">
                      <h4 class="card-title">{{cardInfo.name}}</h4>
                      <p class="card-text details-text"><span id="type-badge" class="badge">Type: {{cardInfo.type}}</span></p>
                      <p class="card-text details-text">{{cardInfo.text}}</p>
                      <div id="atk-def" class="details-text">
                        <p class="card-text"><span style="margin-bottom: 5px;" class="badge atkdef-badge badge-info">ATK: {{cardInfo.atk}}</span><span class="badge atkdef-badge badge-info">DEF: {{cardInfo.def}}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div id="product-btns" class="card w-70">
              <div class="card-body">
                <h3 class="card-title">{{detailsProduct.name}}</h3>
                  <p class="card-text"><span class="badge badge-dark">Condition: {{detailsProduct.description}}</span></p>
                  <p class="card-text"><span class="badge badge-info">Stock: <strong>{{detailsProduct.stock}}</strong></span></p>
                  <p class="card-text"><span class="badge badge-warning">Price: <strong>${{detailsProduct.price}}</strong></span></p>
                  <p class="card-text">Quantity:</p>
                  <div class="col-sm-3">
                    <input v-model="detailsProduct.qty" class="form-control" type="number" value="0" id="input-stock">
                  </div><br>
                  <p class="card-text"><span id="badge-total" class="badge">Total: ${{totalTimeQty}}</span></p>
                  <button @click="addToCart(detailsProduct.id, detailsProduct.name, detailsProduct.img, detailsProduct.description, detailsProduct.price, detailsProduct.stock)" type="button" class="btn admin-btns"><i class="fas fa-shopping-cart"></i> &nbsp; Add To Cart</button> &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import axios from 'axios'
import { config } from '../config'
import Swal from 'sweetalert2'

export default {
  name: 'productdetails',
  components: {
    Navbar
  },
  data() {
    return {
      cardInfo: ''
    }
  },
  computed: {
    detailsProduct() {
      return this.$store.state.detailsProduct
    },
    totalTimeQty() {
      return this.detailsProduct.qty*this.detailsProduct.price
    }
  },
  methods: {
    getCardInfo() {
      axios({
        method: 'get',
        url: `${config.host}/products/${this.detailsProduct.name}`
      })
        .then(({data}) => {
          this.cardInfo = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart(id, name, img, description, price, stock, a) {
      const token = localStorage.getItem('token')
      if (token && this.detailsProduct.qty > 0 && this.detailsProduct.qty <= this.detailsProduct.stock) {
        axios({
          method: 'patch',
          url: `${config.host}/carts/add`,
          headers: {token},
          data: {
            product: {
              id, name, img, description, stock,
              qty: this.detailsProduct.qty,
              price: this.totalTimeQty
            }
          }
        })
          .then(({data}) => {
            Swal.fire(
              'Added to the cart',
              `Success`,
              'success'
            )
            this.$router.push('/')
          })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please input the right amount of quantity'
        })
      }
    },
  },
  created() {
    this.getCardInfo()
  }
}
</script>

<style scoped>
.badge-dark, .badge-warning, .badge-info {
  font-weight: bold;
  font-size: 15px;
}

#type-badge {
  background-color: #227093;
  color: white;
  font-weight: bold;
  font-size: 15px;
}

.atkdef-badge {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: #227093;
}

.details-text {
  border: 1px solid rgb(224, 217, 217);
  padding: 5px;
  border-radius: 3px;
}

#badge-total {
  width: 120px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #218c74;
  color: white;
}

#product-details-header {
  width: 400px;
  height: 180px;
}

#atk-def {
  display: flex;
  justify-content: center;
  align-items: center;
}

#card-information {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.container {
  padding: 20px;
  min-width: 1500px;
}

img {
  width: 100%;
}

.admin-btns {
  background-color: #AB235A;
  color: white;
  font-weight: bold;
}
</style>