<template>
  <div>
    <div class="flex">
      <!-- Normal Demo-->
      <div class="column col-3" v-for='product in products' :key="product._id">
          <!-- Post-->
          <div class="post-module">
              <!-- Thumbnail-->
              <div class="thumbnail">
                  <div class="date">
                      <div class="month">stock</div>
                      <div class="day">{{ product.stock }}</div>
                  </div>
                  <img :src="product.image[0]" v-if="product.image" />
                </div>
              <!-- Post Content-->
              <div class="post-content">
                  <div class="category" v-if="role === 'customer'" @click="addcart(product._id)"><i class="fas fa-cart-plus"></i> Add to cart</div>
                  <div class="category" v-if="role === 'admin'">
                    <div @click="deleteProduct(product._id)">
                      <i class="fas fa-trash-alt"></i> Delete
                    </div>
                    <hr>
                    <div>
                      <router-link :to="'/update/'+product._id"><i class="far fa-edit"></i> Update</router-link>
                    </div>
                  </div>
                  <h1 class="title">{{ product.name }}</h1>
                  <h2 class="sub_title">{{ product.name }}</h2>
                  <p class="description">{{ product.description }}</p>
                  <b-badge pill variant="success" class="tags" v-for="tag in product.tags" :key="tag" @click="fetchtag(tag)">{{ tag }}</b-badge>
                  <!-- <div class="post-meta"><span class="timestamp"><i class="fa fa-clock-">o</i> 6 mins ago</span><span class="comments"><i class="fa fa-comments"></i><a href="#"> 39 comments</a></span></div> -->
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'products',
  computed: {
    ...mapState([
      'isLogin',
      'role',
      'products'
    ])
  },
  methods: {
    fetchtag (tag) {
      this.$store.dispatch('fetchProduct', {
        title: '',
        tag
      })
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', {
        id
      })
    },
    addcart (id) {
      this.$store.dispatch('addcart', {
        id
      })
    }
  },
  created () {
    this.$store.dispatch('fetchProduct', {
      title: '',
      tag: ''
    })
  },
  mounted () {
    $('.post-module').hover(function () {
      $(this).find('.description').stop().animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 300)
    })
  }
}

</script>

<style>
.category {
  cursor: pointer;
}
.tags {
  margin-right: 5px;
  cursor: pointer;
}
body {
  background: #f2f2f2;
  font-family: 'proxima-nova-soft', sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.post-module {
  position: relative;
  z-index: 1;
  display: block;
  background: #ffffff;
  min-width: 270px;
  height: 390px;
  -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s linear 0s;
  -moz-transition: all 0.3s linear 0s;
  -ms-transition: all 0.3s linear 0s;
  -o-transition: all 0.3s linear 0s;
  transition: all 0.3s linear 0s;
}
.post-module:hover,
.hover {
  -webkit-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
}
.post-module:hover .thumbnail img,
.hover .thumbnail img {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  transform: scale(1.1);
  opacity: .6;
}
.post-module .thumbnail {
  background: #000000;
  height: 390px;
  overflow: hidden;
}
.post-module .thumbnail .date {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  background: rgb(21, 172, 114);
  width: 55px;
  height: 60px;
  padding: 12.5px 0;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  -webkti-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.post-module .thumbnail .date .day {
  font-size: 18px;
}
.post-module .thumbnail .date .month {
  font-size: 8px;
  text-transform: uppercase;
}
.post-module .thumbnail img {
  display: block;
  width: 120%;
  -webkit-transition: all 0.3s linear 0s;
  -moz-transition: all 0.3s linear 0s;
  -ms-transition: all 0.3s linear 0s;
  -o-transition: all 0.3s linear 0s;
  transition: all 0.3s linear 0s;
}
.post-module .post-content {
  position: absolute;
  bottom: 0;
  background: #ffffff;
  width: 100%;
  padding: 30px;
  -webkti-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
  -moz-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
  -ms-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
  -o-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
  transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
}
.post-module .post-content .category {
  position: absolute;
  top: -34px;
  left: 0;
  background: rgb(21, 172, 114);
  padding: 10px 15px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}
.post-module .post-content .title {
  margin: 0;
  padding: 0 0 10px;
  color: #333333;
  font-size: 26px;
  font-weight: 700;
}
.post-module .post-content .sub_title {
  margin: 0;
  padding: 0 0 20px;
  color: rgb(21, 172, 114);
  font-size: 20px;
  font-weight: 400;
}
.post-module .post-content .description {
  display: none;
  color: #666666;
  font-size: 14px;
  line-height: 1.8em;
}

.post-module .post-content .post-meta {
  margin: 30px 0 0;
  color: #999999;
}
.post-module .post-content .post-meta .timestamp {
  margin: 0 16px 0 0;
}
.post-module .post-content .post-meta a {
  color: #999999;
  text-decoration: none;
}
.hover .post-content .description {
  display: block !important;
  height: auto !important;
  opacity: 1 !important;
}

.flex {
  display: flex;
  justify-content: space-aro;
  align-content: space-aro;
  align-items: space-aro;
  margin: 20px;
  flex-wrap: wrap;
}
.column{
  margin-bottom: 20px;
}
</style>
