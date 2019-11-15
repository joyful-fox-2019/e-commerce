<template>
<div>
  <b-alert show variant="warning" v-if='!isSignin'>Who are you? let's go signin / signup to shop. open your own shop and get more from DC Emporium</b-alert>

  <b-alert show variant="info" v-else>if you enter a larger amount than the stock, it will automatically be entered as much as the stock amount</b-alert>
  <div id="body">
    <div class="card">
      <nav>
        <svg class="arrow" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " stroke="#727272"/></svg>
        <a class='aclassback' @click='backProduct'>Back to all Product</a>
        <svg @click='addWishList(product._id)' class="heart" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" stroke="#727272" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" stroke="#727272"/></svg>
      </nav>
      <div class="insideCard">
        <div class="photo">
          <img :src="product.product_image">
        </div>
        <div class="description">
          <h2>{{ product.name }}</h2>
          <h4>{{ product.StoreId.name }} Store</h4>
          <h4>Store Site {{ product.StoreId.link }}</h4>
          <h3>Stock {{ product.stock }}</h3>
          <h1>IDR {{ price }}</h1>
          <p>{{product.description}}</p>
          <p><input type='number' :placeholder="message" v-model='count'></p>
          <button @click='addToCart' v-if='!isAdmin'>Add to Cart</button>
          <button @click='addWishList(product._id)' v-if='!isAdmin'>Wishlist</button>
          <button v-if='isAdmin'>Manage</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  data () {
    return {
      product: null,
      count: null
    }
  },
  methods: {
    backProduct () {
      this.$router.push('/home')
    },
    addToCart () {
      axios({
        method: 'post',
        url: '/carts',
        data: {
          product_image: this.product.product_image,
          description: this.product.description,
          name: this.product.name,
          price: this.product.price,
          id: this.product._id,
          count: this.count,
          storeName: this.product.StoreId.name,
          stock: this.product.stock
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$router.push('/home')
          this.$store.dispatch('getUserCart')
          this.$awn.success('Add to cart')
        })
        .catch(err => {
          if(err.response.data.msg == 'Authentication Error') {
            this.$awn.warning('Please Signin First')
          } else {
            this.$awn.warning(err.response.data.msg)
          }
        })
    },
    addWishList (id) {
      axios({
        method: 'patch',
        url: `/products/wish/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$store.dispatch('checkSignIn')
          this.$awn.success(data.msg)
        })
        .catch(err => {
          if(err.response.data.msg == 'Authentication Error') {
            this.$awn.warning('SignIn first if u want add this product to WishList')
          } else {
            this.$awn.warning(err.response.data.msg)
          }
        })
    },
    fetchProductById () {
      const id = this.$route.params.id
      axios({
        method: 'get',
        url: `/products/${id}`
      })
        .then(({data}) => {
          this.product = data.product
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchProductById()
  },
  computed: {
    isAdmin () {
      if(this.product.StoreId.Owner == this.$store.state.userSignin._id) {
        return true
      }
    },
    message () {
      return `count .. max ${this.product.stock}`
    },
    isSignin () {
      return this.$store.state.isSignin
    },
    price() {
      const number_string = this.product.price.toString();
      const remainder = number_string.length % 3;
      let money = number_string.substr(0, remainder);
      const thousand = number_string.substr(remainder).match(/\d{3}/g);
      if (thousand) {
        const separator = remainder ? "." : "";
        money += separator + thousand.join(".");
      }
      return `Rp. ${money}`;
    }
  }
}
</script>

<style lang='scss' scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,300,500,700);

.insideCard {
  display:flex;
  flex-direction: row;
}
#body {
  
  background: #aedaa6;
  font-family: "Raleway";
  
  .card {
    width: 800px;
    // height: 375px;
    position: absolute;
    background: white;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    transition: all 0.3s;
    
    &:hover {
      
      box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    
    }
    
    nav {
      
      width: 100%;
      color: #727272;
      text-transform: uppercase;
      padding: 20px;
      border-bottom: 2px solid #efefef;
      font-size: 12px;
      
      svg.heart {
        
        height: 24px;
        width: 24px;
        float: right;
        margin-top: -3px;
        transition: all 0.3s ease;
        cursor: pointer;
        
        &:hover {
          
          fill: red;
          
        }
        
      }
      svg.arrow {
        
        float: left;
        height: 15px;
        width: 15px;
        margin-right: 10px;
        
      }
      
    }
    
    .photo {
      
      padding: 30px;
      width: 45%;
      text-align: center;
      float: left;
      
      img { 
        max-height: 240px; 
        max-width: 320px
      }
      
    }
    
    .description {
      
       padding: 30px;
       float: left;
       width: 55%;
       border-left: 2px solid #efefef;
       
       h1 {
         color: #515151;
         font-weight: 300;
         padding-top: 15px;
         margin: 0;
         font-size: 30px;
         font-weight: 300;
       }
     
       h2 {
        color: #515151;
        margin: 0;
        text-transform: uppercase;
        font-weight: 500;
       }
      
       h4 { 
         margin: 0;
         color: #727272;
         text-transform: uppercase;
         font-weight: 500;
         font-size: 12px
       }
      
       p { 
         font-size: 12px; 
         line-height: 20px;
         color: #727272;
         padding: 20px 0;
         margin: 0;
      }
      
       button {

         outline: 0;
         border: 0;
         background: none;
         border: 1px solid #d9d9d9;
         padding: 8px 0px;
         margin-bottom: 30px;
         color: #515151;
         text-transform: uppercase;
         width: 125px;
         font-family: inherit;
         margin-right: 5px;
         transition: all 0.3s ease;
         font-weight: 500;
         
         &:hover {
           
           // background: darken(white, 2%);
           border: 1px solid #aedaa6;
           color: #aedaa6;
           cursor: pointer;
           
         }

       }
      
    }
    
  }
  
}
.aclassback {
  color: #41B549 !important;
  cursor: pointer !important;
}
.aclassback:hover {
  color: #FF6E44 !important;
}
</style>