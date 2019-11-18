<template>
  <div>
    <form @submit.prevent="update">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
        </div>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="name">
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Description</span>
        </div>
        <textarea class="form-control" aria-label="With textarea" v-model="description"></textarea>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">(Price) Rp.</span>
        </div>
        <input type="number" class="form-control number" aria-label="Amount (to the nearest dollar)" v-model="price">
        <div class="input-group-append">
          <span class="input-group-text">.00</span>
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">(Stock)</span>
        </div>
        <input type="number" class="form-control number" aria-label="Amount (to the nearest dollar)" v-model="stock">
        <div class="input-group-append">
          <span class="input-group-text">.pcs</span>
        </div>
      </div>
      <div v-for="(img, index) in oldImg" :key=index>
        <img :src="img" alt="image" style="width: 100px;">
        <button class="btn btn-danger" @click="remove(img)">Delete</button>
      </div>
      <b-form-file v-model="file" multiple :file-name-formatter="formatNames" placeholder="Upload Image Here"></b-form-file>
      <div class="tag-container">
        <input
          class="input-form"
          type="text"
          placeholder="Add tags"
          v-model="input_value"
          @keyup.188  ="add_tag"
        >
        <span class="chip"
              v-for="(tag, index) in tags"
              :key="index"
        >{{ tag }}
        <a   class="btn btn-clear" aria-label="Close" role="button"
          @click="delete_tag(index)"><i class="far fa-window-close"></i>
        </a>
        </span>
      </div>
      <button type="submit" class="btn btn-success">Update Item</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'create',
  data () {
    return {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      file: [],
      tags: [],
      input_value: '',
      oldImg: [],
      removed: []
    }
  },
  methods: {
    formatNames(files) {
      if (files.length === 1) {
        return files[0].name
      } else {
        return `${files.length} files selected`
      }
    },
    add_tag: function() {
      if (this.input_value !== '' && !this.tags.includes(this.input_value)) {
        this.tags.push(this.input_value.slice(0, this.input_value.length-1));
        this.input_value = '';    
      }
    },
    delete_tag: function(i) {
      this.tags.splice(i, 1);
    },
    delete_selected: function(i) {
      this.delete_tag(i);
    },
    update () {
      this.$store.dispatch('update', {
        id: this.$route.params.id,
        name: this.name,
        description: this.description,
        price: this.price,
        stock: this.stock,
        tags: this.tags,
        imgUrl: this.file,
        remove: this.removed
      })
        .then((data) => {
          this.$router.push({ path: '/' })
        })
    },
    remove(img){ 
      this.removed.push(this.oldImg.splice(this.oldImg.indexOf(img), 1))
    }
  },
  mounted () {
    this.$store.dispatch('findProduct', {
      id: this.$route.params.id
    })
      .then((data) => {
        this.name = data.name
        this.description = data.description
        this.price = data.price
        this.stock = data.stock
        this.tags = data.tags
        this.oldImg = data.image
      })
  }
}
</script>

<style>
.tag-container {
  /* border-bottom: solid 1px; */
  padding: 10px;
}

.tag-container .input-form {
  border: none;
}

.chip {
  border: 2px solid white;
  border-radius: 20px;
  padding-left: 10px;
  color: aliceblue;
  background-color: rgb(21, 172, 114);
}
</style>
