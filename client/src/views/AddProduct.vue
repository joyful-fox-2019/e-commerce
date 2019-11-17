<template>
  <div id="add-product">
    <AdminNavbar />

    <div id="form-add-product">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div id="ap-header">
              <h4>Add New Product</h4><br>
              <center>
                <div id="ap-requirement-alert" class="alert alert-success" role="alert">
                  Before add a new product, make sure to fill all required informations.
                </div>
              </center>
            </div>
            <div id="ap-body">
              <div id="ap-product-information">
                <h4 style="margin: 30px; font-weight: bold;">Product Information</h4>
                <div id="ap-information-box">
                  <form @submit.prevent="addProduct()">
                    <div class="form-group row">
                      <label for="inputname" class="col-sm-2 col-form-label">Name</label>
                      <div class="col-sm-10">
                        <input type="name" v-model="newProduct.name" class="form-control" id="inputname" placeholder="Example: Dark Magician">
                      </div>
                      <label for="inputcategory" class="col-sm-2 col-form-label">Category</label>
                      <div class="col-sm-10">
                        <select v-model="newProduct.category" class="form-control">
                          <option v-for="(category, index) in categoriesData" :key="index">{{category.name}}</option>
                        </select>
                      </div>
                      <label for="description" class="col-sm-2 col-form-label">Description</label>
                      <div class="col-sm-10">
                        <textarea v-model="newProduct.description" class="form-control" id="description" rows="3" placeholder="Example: Near Mint 1st Edition"></textarea>
                      </div>
                      <label for="inputprice" class="col-sm-2 col-form-label">Price</label>
                      <div class="col-sm-10">
                        <input v-model="newProduct.price" class="form-control" type="number" value="0" id="input-price">
                      </div>
                      <label for="inputstock" class="col-sm-2 col-form-label">Stock</label>
                      <div class="col-sm-10">
                        <input v-model="newProduct.stock" class="form-control" type="number" value="0" id="input-stock">
                      </div>
                      <label for="inputstock" class="col-sm-2 col-form-label">Upload Image</label>
                      <div class="col-sm-10">
                        <div class="custom-file mb-3">
                          <input v-on:change="getImageForProduct($event)" class="custom-file-input" type="file"> 
                          <label class="custom-file-label text-left">{{newProduct.img.name}}</label>
                        </div> <br><br><br><br>
                      </div>
                      <div id="ap-btns" class="col-sm-12">
                        <button type="button" @click="displayHome()" style="margin-right: 20px; background-color:#6c6c6c; color: white;" class="btn ap-btn">Cancel</button> 
                        <button @click="addProduct()" type="button" class="btn ap-btn">Submit</button>
                      </div>
                    </div>
                  </form>
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
import Swal from 'sweetalert2'
import AdminNavbar from '../components/AdminNavbar'
import axios from 'axios'
import { config } from '../config'

export default {
  name: 'addproduct',
  components: {
    AdminNavbar
  },
  data () {
    return {
      newProduct: {
        name: '',
        category: '',
        description: '',
        stock: 0,
        price: 0,
        img: '',
      },
      image: '',
      categoriesData: []
    }
  },
  methods: {
    displayHome() {
       this.$router.push('/admin')
    },
    addProduct() {
       Swal.fire({
        title: 'Uploading ...',
        onBeforeOpen: () => {
        Swal.showLoading()
        }
      })
      const token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image', this.newProduct.img)

      axios.post(`${config.host}/img/upload`, formData, {})
        .then(image => {
          axios({
            method: 'post',
            url: `${config.host}/products`,
            data: {
              name: this.newProduct.name,
              description: this.newProduct.description,
              img: image.data.link,
              stock: this.newProduct.stock,
              price: this.newProduct.price,
              category: this.newProduct.category
            },
            headers: {token}
          })
            .then(({data}) => {
              Swal.fire(
                'New Product Added!',
                `Success`,
                'success'
              )
              this.displayHome()
              this.newProduct.name = ''
              this.newProduct.description = ''
              this.newProduct.img = ''
              this.newProduct.stock = ''
              this.newProduct.price = ''
              this.newProduct.category = ''
               
            })
        })
    },
    getImageForProduct(link){
      this.newProduct.img = link.target.files[0];
      this.image = link.target.files[0];
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
    checktoken() {
      this.$store.dispatch('checktoken')
    }
  },
  created() {
    this.getCategories()
    this.checktoken()
  }
}
</script>

<style scoped>
#ap-btns {
  display: flex;
  justify-content: center;
  align-items: center;  
}

.ap-btn {
  background-color: #AB235A;
  color: white;
  font-weight: bold;
  height: 50px;
  width: 150px;
}

.form-control {
  margin-bottom: 55px;
}

#ap-information-box {
  padding: 40px;
}

#ap-body {
  display: flex;
  width: 1250px;
  justify-content: flex-start;
  text-align: left;
}

#ap-product-information {
  height: 1000px;
  width: 1250px;
  border: 1px solid rgb(240, 233, 233);
  border-radius: 3px;
  box-shadow: 5px 8px 8px rgb(179, 169, 169);
}

#ap-requirement-alert {
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#form-add-product {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  padding: 50px;
  min-width: 1250px;
  align-self: center;
}

</style>