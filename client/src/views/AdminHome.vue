<template>
  <div class="home">
    <AdminNavbar/>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div id="sidebar">
              <h4 id="menu">Categories</h4> <br>
              <button v-for="(category, index) in categoriesData" :key="index" @click="getProductsByCategory(category.name)" type="button" class="btn category-btn"><p style="margin-left: 10px; margin-bottom: 0">{{category.name}}</p></button>
            </div>
        </div>

        <div style="padding-top: 20px;" class="col-9">
          <carousel :per-page="1">
            <slide>
              <img style="border-radius: 10px; width: 100%; height: 100%" src="https://i.imgur.com/mh3B9NG.png" alt="">
            </slide>
            <slide>
              <img style="border-radius: 10px; width: 100%; height: 100%" src="https://i.imgur.com/Qd7CZbC.png" alt="">
            </slide>
            <slide>
              <img style="border-radius: 10px; width: 100%; height: 100%" src="https://i.imgur.com/TQtsL21.png" alt="">
            </slide>
          </carousel> <br><br>
        <button type="button" @click="displayAddProduct()" class="btn admin-btns"><i class="fas fa-plus" style="margin-right:10px;"></i>Add New Product</button>
         <div id="products">
            <div class="card feature-cards" v-for="(data, index) in fetchedData" :key="index" style="width: 18rem;">
            <img :src="data.img" class="card-img-top card-imgs" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{data.name}}</h5>
              <p class="card-text">{{data.description}}</p>
              <span class="badge badge-dark">Stock {{data.stock}}</span><br>
              <span class="badge badge-warning">Price: ${{data.price}}</span><br><br>
              <button type="button" @click="displayEditProduct(data)" class="btn admin-btns"><i class="far fa-edit"></i> &nbsp; Edit</button> &nbsp;
              <button type="button" @click="deleteProduct(data._id)" class="btn admin-btns"><i class="far fa-trash-alt"></i> &nbsp; Delete</button>
            </div><br><br>
          </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '../config'
import { Carousel, Slide } from 'vue-carousel';
import AdminNavbar from '../components/AdminNavbar'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    Carousel,
    Slide,
    AdminNavbar
  },
  data() {
    return {
      autoplayboolean: true,
      fetchedData: [],
      categoriesData: []
    }
  },
  methods: {
    displayAddProduct() {
      this.$router.push('/addproduct')
    },
    displayEditProduct(data) {
      this.$store.commit('SETEDITEDPRODUCT', data)
      this.$router.push('/editproduct')
    },
    getProducts() {
      axios({
        method: 'get',
        url: `${config.host}/products`
      })
        .then(({data}) => {
          this.fetchedData = data.reverse()
        })
    },
    getProductsByCategory(name) {
      axios({
        method: 'get',
        url: `${config.host}/categories/${name}`
      })
        .then(({data}) => {
          this.fetchedData = data.reverse()
        })
    },
    getCategories() {
      axios({
        method: 'get',
        url: `${config.host}/categories`
      })
        .then(({data}) => {
          this.categoriesData = data
        })
    },
    deleteProduct(id) {
      const token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `${config.host}/products/${id}`,
        headers: {token}
      })
        .then(({data}) => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              this.getProducts()
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        })
    },
  },
  created() {
    this.getProducts()
    this.getCategories()
  }
}
</script>

<style scoped>
.card-text {
  font-weight: bold;
}
.admin-btns {
  background-color: #AB235A;
  color: white;
  font-weight: bold;
}
.card-imgs{
  width: 100%;
  height: 100%;
}

.feature-cards {
  margin: 40px;
  width: 250px !important;
  align-items: center;
}

#products {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.VueCarousel-slide {
  height: 300px;
  width: 500px;
}

.category-btn {
  background-color: #222F3E;
  border: 2px solid white;
  color: white;
  font-weight: bold;
  width: 150px;
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center
}

.category-btn:hover {
  background-color: white;
  color: black;
  border: 2px solid black;
}

.container {
  padding-top: 20px;
  padding-left: 100px;
  margin: 0px;
  min-width: 1500px;
}

#sidebar {
	height: 1200px;
	width: 300px;
	font-weight: bold;
	background-color: #222F3E;
	padding: 30px;
	color: white;
	border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

#menu {
  margin-bottom: 35px;
}

#sidebar button {
  transition: all 0.5s ease-in-out;
}

#sidebar button:hover {
  margin-left: 50px;
  background-color: #fec210;
}

.card-title {
  height: 48px;
}
</style>
