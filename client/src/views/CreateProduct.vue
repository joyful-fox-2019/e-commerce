<template>
<div class="container">
  <div class='createProduct'>
    <h1>Create Product</h1>
    <div class="card cardProduct">
      <div class='centerProduct'>
        <div>
          <h3>Upload Product</h3>
        </div>
        <div>
          <b-badge pill variant="secondary" class='badgec2 ml-3 mt-2'> Required </b-badge>
        </div>
      </div>
      <b-form-file
        ref="file"
        type="file"
        name='file'
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>

    </div>
    <div class="card information mt-3">
      <div class='centerProduct'>
        <div>
          <h3>Information Product</h3>
        </div>
        <div>
          <b-badge pill variant="secondary" class='badgec2 ml-3 mt-2'> Required </b-badge>
        </div>
      </div>

      <div class="nameProduct mt-2">
          <div class='label col-3'>
            <div>
              <h4>Product Name </h4>
            </div>
            <div style='margin-top: -10px'>
              <small>Write the product name according to the type, brand, product details</small>
            </div>
          </div>
          <div class="textProduct col-9">
            <input type="text" style='width:100%' v-model='productName' placeholder="example: iphone(XI PRO)...">
          </div>
      </div>
      <div class="nameProduct mt-4">
          <div class='label col-3'>
            <div>
              <h4>Category</h4>
            </div>
          </div>
          <div class="textProduct col-9">
            <input-tag v-model="tags" style='font-size: 20px;'></input-tag>
          </div>
      </div>

    </div>
    <div class="card description mt-3">
      <div class='centerProduct'>
        <div>
          <h3>Description Product</h3>
        </div>
        <div>
          <b-badge pill variant="secondary" class='badgec2 ml-3 mt-2'> Required </b-badge>
        </div>
      </div>

      <div class="textDescription mt-2">
          <div class='label col-3' style='display: flex; flex-direction: row;'>
            <div>
              <h4>Condition </h4>
            </div>
          </div>
          <div class="col-9">
            <select v-model='checkk'>
              <option value='new'>New</option>
              <option value="second">Second</option>
            </select>
          </div>
      </div>

      <div class="textDescription mt-2">
          <div class='label col-3'>
            <div>
              <h4>Description </h4>
            </div>
            <div style='margin-top: -10px'>
              <small>Describe the product completely and clearly and can eliminate the need for chat & discussion.</small>
            </div>
          </div>
          <div class="textProduct col-9">
            <textarea name="" id="" cols="98" v-model='description' rows="10" placeholder="Full Description"></textarea>
          </div>
      </div>
      

    </div>
    <div class="card price mt-3">
      <div class='centerProduct'>
        <div>
          <h3>Price Product</h3>
        </div>
        <div>
          <b-badge pill variant="secondary" class='badgec2 ml-3 mt-2'> Required </b-badge>
        </div>
      </div>

      <div class="nameProduct mt-2">
          <div class='label col-3'>
            <div>
              <h4>Unit Price </h4>
            </div>
          </div>
          <div class="textProduct col-9">
            <input type="number" style='width:100%' v-model='price' placeholder="00000">
          </div>
      </div>
      <div class="nameProduct mt-2">
          <div class='label col-3'>
            <div>
              <h4>Stock Product </h4>
            </div>
          </div>
          <div class="textProduct col-9">
            <input type="number" style='width:100%' v-model='stock' placeholder="10">
          </div>
      </div>
    </div>
  </div>
  <div class="btnFoot mt-3 mr-2">
        <form @submit.prevent='publishProduct' enctype="multipart/form-data">
          <input type="submit" value='Publish' class="btn btn-outline-dark btn-lg site-btns btnPub">
        </form>
        <div class='mr-4'>
          <button class="btn btn-outline-danger btn-lg">Cancel</button>
        </div>
  </div>
</div>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  data() {
    return {
      productName: null,
      file: '',
      tags: [],
      checkk: null,
      description: null,
      price: null,
      stock: null
    }
  },
  methods: {
    publishProduct () {
      const formData = new FormData()
      formData.append('image', this.file);
      formData.append('description', this.description);
      formData.append('category', this.tags);
      formData.append('stock', this.stock);
      formData.append('condition', this.checkk);
      formData.append('price', this.price);
      formData.append('name', this.productName);
      this.$awn.asyncBlock(
        this.$store.dispatch('createProduct', formData),
        null,
        null,
        'Loading Create'
      )
        .then(msg => {
          this.$router.push('/home')
          this.$awn.success(msg)
        })
        .catch(err => {
          this.awn.warning(err)
        })
        
      setTimeout(() => {
        this.$store.dispatch('checkSignIn')
      }, 2000);
    }
  }

}
</script>

<style scoped>
.btnFoot {
  display: flex;
  flex-direction: row-reverse
}
.container {
  min-width: 1340px;
  font-size: 20px;
}
.centerProduct {
  display: flex;
}
.label {
  color:#757575
}
.createProduct {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.information {
  padding: 10px;
  height: 18vh;
  display: flex;
  width: 100%;
}
.description {
  padding: 10px;
  height: 35vh;
  display: flex;
  width: 100%;
}
.price {
  padding: 10px;
  height: 15vh;
  display: flex;
  width: 100%;
}
.cardProduct {
  padding: 10px;
  height: 10vh;
  display: flex;
  width: 100%;
}
.nameProduct {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.textDescription {
  display: flex;
  flex-direction: row;
}
.label {
  display: flex;
  flex-direction: column;
}
</style>